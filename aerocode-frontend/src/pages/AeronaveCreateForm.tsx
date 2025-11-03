import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/forms/Input'
import Select from '../components/forms/Select'
import Button from '../components/forms/Button'
import { FaPlane, FaCode, FaRulerCombined, FaUsers, FaArrowRight, FaSave, FaHashtag } from 'react-icons/fa'
import { TIPO_AERONAVE_OPCOES, useAeronaves } from '../context/AeronaveContext'
import type { Aeronave, StatusProducao, TipoAeronave } from '../components/types/TipoAeronave'

interface AeronaveFormData {
    codigo: string
    modelo: string
    tipo: TipoAeronave | ''
    capacidade: number | ''
    alcance: number | ''
    status: StatusProducao
    
}

const INITIAL_FORM_DATA: AeronaveFormData = {
    codigo: '',
    modelo: '',
    tipo: '',
    capacidade: '',
    alcance: '',
    status: 'Em Produção'
    
}

const AeronaveCreateForm: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<AeronaveFormData>(INITIAL_FORM_DATA)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { createAeronave } = useAeronaves()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: (name === 'capacidade' || name === 'alcance') ? (value === '' ? '' : parseInt(value, 10)) : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (isSaving) return
        if (!formData.codigo || !formData.modelo || !formData.tipo) {
            setError("Os campos Código, Modelo e Tipo são obrigatórios.")
            return
        }
        
        try {
            createAeronave(formData as Aeronave)

            setIsSaving(false)
            alert(`Aeronave '${formData.codigo}' criada com sucesso!`)
            navigate('/aeronaves') 
        } catch (err: any) {
            setIsSaving(false)
            setError(err.message || "Erro ao criar aeronave.")
        }
    }
    return (
        <div className="bg-white mt-20 p-6 w-full">

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Cadastrar Aeronave</h2>
            {error && <p className="text-sm text-red-600 mb-4 p-3 bg-red-50 rounded">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2 mb-4 text-blue-700">1. Identificação e Características</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Input label="Código (Ex: E-175)" name="codigo" type="text" value={formData.codigo} onChange={handleChange} Icon={FaHashtag} required />
                        <Input label="Modelo" name="modelo" type="text" value={formData.modelo} onChange={handleChange} Icon={FaPlane} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <Input label="Capacidade (Pax)" name="capacidade" type="number" value={formData.capacidade || ''} onChange={handleChange} Icon={FaUsers} min={1} />

                        <Input label="Alcance (km)" name="alcance" type="number" value={formData.alcance || ''} onChange={handleChange} Icon={FaRulerCombined} min={0} />

                        <Select
                            label="Tipo de Aeronave"
                            name="tipo"
                            options={TIPO_AERONAVE_OPCOES}
                            value={formData.tipo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="md:col-span-2 space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2 text-blue-700">2. Detalhes Estruturais</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Comprimento" placeholder="72.5 m" type="text" />
                            <Input label="Envergadura" placeholder="64.8 m" type="text" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium border-b pb-2 text-blue-700">3. Status Inicial</h3>
                        <Select label="Status Inicial" options={[{ label: 'Em Projeto', value: 'projeto' }]} />
                    </div>
                </div>


                <div className="flex justify-start gap-4 pt-4 border-t mt-8">
                    <Button type="submit" loading={isSaving} variant="primary">
                        <FaSave className="mr-2" />
                        Salvar Aeronave
                    </Button>

                    <Button type="button" variant="secondary" onClick={() => navigate('/aeronaves')}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AeronaveCreateForm