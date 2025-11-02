import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Input from '../components/forms/Input'
import Select from '../components/forms/Select'
import Button from '../components/forms/Button'
import { FaSave, FaTimes, FaVial, FaPlane, FaCalendarAlt, FaUserAlt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

type ResultadoTeste = 'PENDENTE' | 'APROVADO' | 'REPROVADO'
type TipoTeste = 'ELÉTRICO' | 'HIDRÁULICO' | 'ESTRUTURAL' | 'DE VOO' | 'SOFTWARE'

interface TesteDetails {
    id: number
    aeronaveCodigo: string
    tipo: TipoTeste
    dataProgramada: string
    responsavelNome: string
    statusAtual: ResultadoTeste 
}

interface TesteRecordFormData {
    id: number 
    dataRealizacao: string
    resultado: 'APROVADO' | 'REPROVADO' | '' 
    observacoes: string
}

const RESULTADO_REGISTRO_OPCOES = [
    { value: '', label: 'Selecione o Resultado' },
    { value: 'APROVADO', label: 'APROVADO' },
    { value: 'REPROVADO', label: 'REPROVADO' },
]

const mockFetchTestDetails = (id: number): TesteDetails | null => {
    const mockDB: TesteDetails[] = [
        { id: 1, aeronaveCodigo: 'E-175', tipo: 'ELÉTRICO', dataProgramada: '2025-05-20', responsavelNome: 'Carlos Souza', statusAtual: 'APROVADO' },
        { id: 2, aeronaveCodigo: 'E-175', tipo: 'HIDRÁULICO', dataProgramada: '2025-05-30', responsavelNome: 'Carlos Souza', statusAtual: 'REPROVADO' },
        { id: 3, aeronaveCodigo: 'A-350', tipo: 'ESTRUTURAL', dataProgramada: '2025-07-10', responsavelNome: 'Ana Lima', statusAtual: 'PENDENTE' },
        { id: 4, aeronaveCodigo: 'F-35', tipo: 'DE VOO', dataProgramada: '2025-09-01', responsavelNome: 'João Ribeiro', statusAtual: 'PENDENTE' },
    ]
    return mockDB.find(t => t.id === id) || null
}

const TestRecordForm: React.FC = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const params = useParams()
    const testeIdParam = params.id 
    const testeId = testeIdParam ? parseInt(testeIdParam, 10) : null
    const [testDetails, setTestDetails] = useState<TesteDetails | null>(null)
    const [formData, setFormData] = useState<TesteRecordFormData>({
        id: testeId || 0,
        dataRealizacao: new Date().toISOString().split('T')[0],
        resultado: '',
        observacoes: '',
    })
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!testeId) {
            setLoading(false)
            setError("ID de teste inválido na URL.")
            return
        }

        setLoading(true)
        setError(null)
        
        const fetchedDetails = mockFetchTestDetails(testeId)
        
        if (fetchedDetails) {
            if (fetchedDetails.statusAtual !== 'PENDENTE') {
                setError(`Este teste já foi ${fetchedDetails.statusAtual}. Não é possível registrar novamente.`)
            }
            setTestDetails(fetchedDetails)
            setFormData(prev => ({ ...prev, id: fetchedDetails.id }))
        } else {
            setError(`Teste com ID ${testeId} não encontrado.`)
        }
        setLoading(false)
    }, [testeId])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (isSaving || loading || error || !testDetails) return

        
        if (!formData.resultado || !formData.dataRealizacao) {
            setError("O resultado e a data de realização são obrigatórios.")
            return
        }

        setIsSaving(true)
        setError(null)
        
        
        console.log("Registrando resultado do teste:", {
            ...formData,
            responsavelRegistro: user?.nome || 'Usuário Desconhecido'
        })
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        setIsSaving(false)
        alert(`Resultado do teste ${testDetails.id} (${testDetails.tipo}) registrado com sucesso como ${formData.resultado}!`)
        
        
        navigate('/testes') 
    }

    if (loading) {
        return <div className="text-center p-10 text-gray-500">Carregando detalhes do teste...</div>
    }

    if (error || !testDetails) {
        return <div className="text-center p-10 text-red-600 font-semibold">{error || "Teste não encontrado ou inválido."}</div>
    }

    return (
        <div className="bg-white p-6 mt-20 max-w-4xl mx-auto">
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Registrar Resultado de Teste: {testDetails.tipo}
            </h2>
            <p className="text-md text-gray-600 mb-4">Aeronave: <span className="font-semibold">{testDetails.aeronaveCodigo}</span> - Programado para: <span className="font-semibold">{testDetails.dataProgramada}</span></p>
            
            
            {error && <p className="text-sm text-red-600 mb-4 p-3 bg-red-50 rounded">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 mb-4">
                    <Input label="Tipo de Teste" value={testDetails.tipo} Icon={FaVial} disabled />
                    <Input label="Aeronave" value={testDetails.aeronaveCodigo} Icon={FaPlane} disabled />
                    <Input label="Programado para" value={testDetails.dataProgramada} Icon={FaCalendarAlt} disabled />
                    <Input label="Responsável Original" value={testDetails.responsavelNome} Icon={FaUserAlt} disabled />
                </div>


                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                        label="Data de Realização" 
                        name="dataRealizacao" 
                        type="date" 
                        value={formData.dataRealizacao} 
                        onChange={handleChange} 
                        required 
                    />
                    <Select
                        label="Resultado do Teste"
                        name="resultado"
                        options={RESULTADO_REGISTRO_OPCOES}
                        value={formData.resultado}
                        onChange={handleChange}
                        required
                    />
                    
                    <div className="md:col-span-2">
                        <Input 
                            label="Observações Adicionais" 
                            name="observacoes" 
                            type="textarea" 
                            value={formData.observacoes} 
                            onChange={handleChange} 
                            placeholder="Detalhes sobre a execução e resultados..."
                            rows={4} 
                        />
                    </div>
                </div>

                
                <div className="flex justify-end gap-4 pt-4 mt-8">
                    <Button type="button" variant="secondary" onClick={() => navigate('/testes')}>
                        <FaTimes className="mr-2" /> Cancelar
                    </Button>
                    <Button type="submit" loading={isSaving} variant="primary">
                        <FaSave className="mr-2" /> Registrar Resultado
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default TestRecordForm