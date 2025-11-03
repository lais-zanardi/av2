import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Input from '../components/forms/Input'
import Select from '../components/forms/Select'
import Button from '../components/forms/Button'
import { FaPlane, FaCode, FaRulerCombined, FaUsers, FaArrowRight, FaSave, FaHashtag } from 'react-icons/fa'
import type { TipoAeronave, StatusProducao, Aeronave } from '../components/types/TipoAeronave'
import { useAeronaves, TIPO_AERONAVE_OPCOES, STATUS_AERONAVE_OPCOES } from '../context/AeronaveContext'

interface AeronaveData {
    codigo: string
    modelo: string
    tipo: TipoAeronave
    capacidade: number
    alcance: number
    status: StatusProducao
}

const AeronaveUpdateForm: React.FC = () => {
    const navigate = useNavigate()
    const params = useParams()
    const codigoAeronave = params.codigo 
    const [originalData, setOriginalData] = useState<AeronaveData | null>(null)
    const [formData, setFormData] = useState<Partial<AeronaveData>>({})
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
        const { getAeronaveByCodigo, updateAeronave } = useAeronaves()
    

    useEffect(() => {
        if (!codigoAeronave) {
            setLoading(false)
            setError("Código de aeronave inválido na URL.")
            return
        }

        setLoading(true)
        setError(null)
        
        const fetchedData = getAeronaveByCodigo(codigoAeronave)
        
        if (fetchedData) {
            setOriginalData(fetchedData)
            setFormData(fetchedData) 
        } else {
            setError(`Aeronave com código ${codigoAeronave} não encontrada.`)
        }

        setLoading(false)
    }, [codigoAeronave, getAeronaveByCodigo]) 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: (name === 'capacidade' || name === 'alcance') ? (value === '' ? '' : parseInt(value, 10)) : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!originalData || isSaving) return

        setIsSaving(true)
        setError(null)
        
      try {
            updateAeronave(originalData.codigo, formData as Aeronave) 

            setIsSaving(false)
            alert(`Aeronave ${originalData.codigo} atualizada com sucesso!`)
            navigate('/aeronaves') 

        } catch (err: any) {
            setIsSaving(false)
            setError(err.message || "Erro ao atualizar aeronave.")
        }
    }

    if (loading) {
        return <div className="text-center p-10 text-gray-500">Carregando dados da aeronave...</div>
    }

    if (error || !originalData) {
        return <div className="text-center p-10 text-red-600 font-semibold">{error || "Erro: Aeronave não encontrada."}</div>
    }

    const { codigo, modelo, tipo, capacidade, alcance, status } = formData

    return (
        <div className="bg-white mt-20 p-6 w-full">
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Editar Aeronave: {originalData.codigo}</h2>
            {error && <p className="text-sm text-red-600 mb-4 p-3 bg-red-50 rounded">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2 mb-4 text-blue-700">1. Identificação e Características</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Input label="Código" name="codigo" type="text" value={codigo || ''} Icon={FaHashtag} disabled={true} />
                        <Input label="Modelo" name="modelo" type="text" value={modelo || ''} onChange={handleChange} Icon={FaPlane} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <Input label="Capacidade (Pax)" name="capacidade" type="number" value={capacidade || ''} onChange={handleChange} Icon={FaUsers} min={1} />
                        
                        <Input label="Alcance (km)" name="alcance" type="number" value={alcance || ''} onChange={handleChange} Icon={FaRulerCombined} min={0} />
                        
                        <Select
                            label="Tipo de Aeronave"
                            name="tipo"
                            options={TIPO_AERONAVE_OPCOES}
                            value={tipo || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2 mb-4 text-blue-700">2. Status Atual de Produção</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select 
                            label="Status" 
                            name="status"
                            options={STATUS_AERONAVE_OPCOES} 
                            value={status || ''} 
                            onChange={handleChange}
                            className="md:col-span-2"
                        />
                    </div>
                </div>

                <div className="flex justify-start gap-4 pt-4 border-t mt-8">
                    <Button type="submit" loading={isSaving} variant="primary">
                        <FaSave className="mr-2" />
                        Salvar Alterações
                    </Button>
                    
                    <Button type="button" variant="secondary" onClick={() => navigate('/aeronaves')}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AeronaveUpdateForm