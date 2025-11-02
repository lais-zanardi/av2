// src/pages/Logistics/PecaCreateForm.tsx

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Input from '../components/forms/Input'
import Select from '../components/forms/Select'
import Button from '../components/forms/Button'
import { FaSave, FaTimes, FaTag, FaIndustry, FaBox, FaPlane } from 'react-icons/fa'
import { FaHashtag } from 'react-icons/fa'

type StatusPeca = 'EM ESTOQUE' | 'EM USO' | 'EM MANUTENÇÃO' | 'DESCARTADA'
type TipoPeca = 'MOTOR' | 'ASA' | 'AVIONICA' | 'FUSELAGEM' | 'OUTROS'

interface PecaFormData {
    codigoInterno: string
    nome: string
    tipo: TipoPeca | ''
    fornecedor: string
    status: StatusPeca | ''
    aeronaveAssociada?: string 
}

const INITIAL_FORM_DATA: PecaFormData = {
    codigoInterno: '',
    nome: '',
    tipo: '',
    fornecedor: '',
    status: 'EM ESTOQUE',
    aeronaveAssociada: '',
}

const STATUS_OPCOES = [
    { value: 'EM ESTOQUE', label: 'Em Estoque' },
    { value: 'EM USO', label: 'Em Uso' },
    { value: 'EM MANUTENÇÃO', label: 'Em Manutenção' },
    { value: 'DESCARTADA', label: 'Descartada' },
]

const TIPO_OPCOES = [
    { value: 'MOTOR', label: 'Motor' },
    { value: 'ASA', label: 'Asa' },
    { value: 'AVIONICA', label: 'Aviônica' },
    { value: 'FUSELAGEM', label: 'Fuselagem' },
    { value: 'OUTROS', label: 'Outros' },
]


const mockFetchPeca = (id: number): PecaFormData | null => {
    const mockDB: PecaFormData[] = [
        { id: 101, codigoInterno: 'ENG-RR-001', nome: 'Motor Esquerdo', tipo: 'MOTOR', fornecedor: 'Rolls Royce', status: 'EM ESTOQUE', aeronaveAssociada: '' },
        { id: 102, codigoInterno: 'WING-L-A350', nome: 'Asa Esquerda', tipo: 'ASA', fornecedor: 'Airbus Aero', status: 'EM USO', aeronaveAssociada: 'A-350' },
        // ... outras peças
    ] as PecaFormData[] // Casting para PecaFormData
    
    
    const peca = mockDB.find(p => (p as any).id === id) 
    if (peca && peca.aeronaveAssociada === undefined) {
        peca.aeronaveAssociada = ''
    }
    return peca || null
}

const PecaCreateForm: React.FC = () => {
    const navigate = useNavigate()
    const params = useParams()
    const pecaId = params.id ? parseInt(params.id, 10) : null 

    const isEditing = !!pecaId 
    
    const [formData, setFormData] = useState<PecaFormData>(INITIAL_FORM_DATA)
    const [loading, setLoading] = useState(isEditing) 
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (isEditing && pecaId) {
            setLoading(true)
            setError(null)
            const fetchedData = mockFetchPeca(pecaId)
            
            if (fetchedData) {
                setFormData(fetchedData)
            } else {
                setError(`Peça com ID ${pecaId} não encontrada.`)
            }
            setLoading(false)
        }
    }, [isEditing, pecaId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (isSaving || loading) return

        if (!formData.codigoInterno || !formData.nome || !formData.tipo || !formData.fornecedor || !formData.status) {
            setError("Todos os campos obrigatórios devem ser preenchidos.")
            return
        }

        setIsSaving(true)
        setError(null)
        
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        setIsSaving(false)
        alert(`Peça ${formData.codigoInterno} ${isEditing ? 'atualizada' : 'cadastrada'} com sucesso!`)
        
        navigate('/pecas') 
    }


    if (loading) {
        return <div className="text-center p-10 text-gray-500">Carregando dados da peça...</div>
    }

    if (error && isEditing) { 
        return <div className="text-center p-10 text-red-600 font-semibold">{error}</div>
    }

    return (
        <div className="bg-white p-6 mt-20 max-w-4xl mx-auto">
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {isEditing ? `Editar Peça: ${formData.nome}` : 'Cadastrar Nova Peça'}
            </h2>
            {error && <p className="text-sm text-red-600 mb-4 p-3 bg-red-50 rounded">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    
                    
                    <Input 
                        label="Código Interno" 
                        name="codigoInterno" 
                        type="text" 
                        value={formData.codigoInterno} 
                        onChange={handleChange} 
                        Icon={FaHashtag} 
                        required 
                        disabled={isEditing} 
                    />
                    <Input 
                        label="Nome da Peça" 
                        name="nome" 
                        type="text" 
                        value={formData.nome} 
                        onChange={handleChange} 
                        Icon={FaTag} 
                        required 
                    />
                    <Select
                        label="Tipo de Peça"
                        name="tipo"
                        options={TIPO_OPCOES}
                        value={formData.tipo}
                        onChange={handleChange}
                        required
                    />

                    
                    <Input 
                        label="Fornecedor" 
                        name="fornecedor" 
                        type="text" 
                        value={formData.fornecedor} 
                        onChange={handleChange} 
                        Icon={FaIndustry} 
                        required 
                    />
                    <Select
                        label="Status da Peça"
                        name="status"
                        options={STATUS_OPCOES}
                        value={formData.status}
                        onChange={handleChange}
                        required
                    />
                    
                    <Input 
                        label="Aeronave Associada (Opcional)" 
                        name="aeronaveAssociada" 
                        type="text" 
                        value={formData.aeronaveAssociada || ''} 
                        onChange={handleChange} 
                        Icon={FaPlane} 
                        placeholder="Código da Aeronave"
                    />

                    
                    <Input label="Número de Série" placeholder="" type="text" />
                    
                </div>


                
                <div className="flex justify-end gap-4 pt-4 mt-8">
                    <Button type="button" variant="secondary" onClick={() => navigate('/pecas')}>
                        <FaTimes className="mr-2" /> Cancelar
                    </Button>
                    <Button type="submit" loading={isSaving} variant="primary">
                        <FaSave className="mr-2" /> 
                        {isEditing ? 'Salvar Alterações' : 'Cadastrar Peça'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PecaCreateForm