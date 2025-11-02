import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import GenericTable, { type TableColumn } from '../components/ui/GenericTable'
import Button from '../components/forms/Button'
import Modal from '../components/ui/Modal'
import { AssociateEmployeeModal } from '../components/modals/StageModals'
import { useAuth } from '../context/AuthContext' 
import { FaPlay, FaCheck, FaUsers, FaHourglassHalf, FaTimes, FaUserAlt } from 'react-icons/fa'

type StatusEtapa = 'PENDENTE' | 'EM ANDAMENTO' | 'CONCLUÍDA'
interface FuncionarioAlocado { id: number; nome: string; nivel: string }

interface DetalhesEtapa {
    id: number
    nome: string
    prazo: string
    status: StatusEtapa
    aeronaveCodigo: string
    funcionarios: FuncionarioAlocado[]
    etapaAnteriorStatus: StatusEtapa | 'N/A' 
}

const mockFetchEtapaDetails = (id: number): DetalhesEtapa | null => {
    if (id === 3) {
        return {
            id: 3,
            nome: 'Instalação Elétrica',
            prazo: '2025-05-20',
            status: 'EM ANDAMENTO',
            aeronaveCodigo: 'E-175',
            funcionarios: [
                { id: 201, nome: 'Maria Alves', nivel: 'OPERADOR' },
                { id: 202, nome: 'Carlos Souza', nivel: 'ENGENHEIRO' },
            ],
            etapaAnteriorStatus: 'CONCLUÍDA',
        }
    }
    return null
}

const EtapaDetails: React.FC = () => {
    const { user } = useAuth()
    const params = useParams()
    const etapaIdParam = params.etapaId 
    const etapaId = etapaIdParam ? parseInt(etapaIdParam, 10) : null
    const [details, setDetails] = useState<DetalhesEtapa | null>(null)
    const [loading, setLoading] = useState(true)
    const [isAssociateModalOpen, setIsAssociateModalOpen] = useState(false)
    const canManageEmployees = user?.nivelPermissao === 'ADMINISTRADOR' || user?.nivelPermissao === 'ENGENHEIRO'
    const canExecute = user?.nivelPermissao === 'OPERADOR' || user?.nivelPermissao === 'ENGENHEIRO'

    useEffect(() => {
        if (!etapaId) {
            setLoading(false)
            return
        }

        setLoading(true)
        const fetchedDetails = mockFetchEtapaDetails(etapaId)
        setDetails(fetchedDetails)
        setLoading(false)
    }, [etapaId])

    
    const handleStartStage = () => {
        if (details?.etapaAnteriorStatus !== 'CONCLUÍDA') {
            alert(`Erro: A etapa anterior deve ser CONCLUÍDA para iniciar ${details?.nome}.`)
            return
        }
        
        alert(`Etapa ${details?.nome} INICIADA!`)
        setDetails(prev => prev ? { ...prev, status: 'EM ANDAMENTO' } : null)
    }

    const handleFinishStage = () => {
        alert(`Etapa ${details?.nome} FINALIZADA!`)
        setDetails(prev => prev ? { ...prev, status: 'CONCLUÍDA' } : null)
    }

    const employeesColumns: TableColumn<FuncionarioAlocado>[] = useMemo(() => [
        { key: 'nome', header: 'Nome', sortable: true },
        { key: 'nivel', header: 'Nível', sortable: false },
        { key: 'id', header: 'ID', sortable: true },
    ], [])


    if (loading) {
        return <div className="text-center p-10 text-gray-500">Carregando detalhes da etapa...</div>
    }
    if (!details) {
        return <div className="text-center p-10 text-red-600 font-semibold">Etapa não encontrada ou código inválido.</div>
    }
    
    const canStart = canExecute && details.status === 'PENDENTE' && details.etapaAnteriorStatus === 'CONCLUÍDA'
    const canFinish = canExecute && details.status === 'EM ANDAMENTO'

    return (
        <>
            <div className="space-y-6">
                <div className="bg-white p-6 mt-20 ">
                    
                    <div className="flex justify-between items-start border-b pb-4 mb-4">
                        <div>
                            <p className="text-sm text-gray-500">Aeronave: {details.aeronaveCodigo}</p>
                            <h2 className="text-2xl font-bold text-gray-800 mt-1">{details.nome}</h2>
                            <InfoPill label="Status" value={details.status} />
                        </div>
                        
                        <div className="flex space-x-3">
                            {canExecute && (
                                <>
                                    <Button 
                                        onClick={handleStartStage}
                                        disabled={!canStart}
                                        variant={canStart ? 'primary' : 'secondary'}
                                        title={canStart ? 'Iniciar execução desta etapa' : 'Requer conclusão da etapa anterior.'}
                                    >
                                        <FaPlay className="mr-2" /> Iniciar Etapa
                                    </Button>

                                    <Button 
                                        onClick={handleFinishStage}
                                        disabled={!canFinish}
                                        variant={canFinish ? 'primary' : 'secondary'}
                                    >
                                        <FaCheck className="mr-2" /> Finalizar Etapa
                                    </Button>
                                </>
                            )}
                            
                            {canManageEmployees && (
                                <Button 
                                    onClick={() => setIsAssociateModalOpen(true)}
                                    variant="primary"
                                >
                                    <FaUserAlt className="mr-2" /> Associar Funcionário
                                </Button>
                            )}
                        </div>
                    </div>

                    
                    <div className="grid grid-cols-2 text-sm text-gray-600">
                        <p>Prazo Limite: <span className="font-semibold">{details.prazo}</span></p>
                        <p>Etapa Anterior: <StatusPill status={details.etapaAnteriorStatus} /></p>
                    </div>

                </div>

                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-medium mb-4 text-blue-700">Funcionários Atualmente Alocados</h3>
                    <GenericTable 
                        data={details.funcionarios} 
                        columns={employeesColumns} 
                    />
                </div>
            </div>

            
            <AssociateEmployeeModal
                isOpen={isAssociateModalOpen}
                onClose={() => setIsAssociateModalOpen(false)}
                etapaNome={details.nome}
                currentlyAssociatedIds={details.funcionarios.map(f => f.id)}
            />
        </>
    )
}

export default EtapaDetails


const InfoPill: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <span className="inline-flex items-center px-3 py-1 mt-2 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
        {label}: {value}
    </span>
)

const StatusPill: React.FC<{ status: StatusEtapa | 'N/A' }> = ({ status }) => {
    let classes = ''
    if (status === 'CONCLUÍDA') classes = 'bg-green-100 text-green-700'
    else if (status === 'EM ANDAMENTO') classes = 'bg-yellow-100 text-yellow-700'
    else classes = 'bg-gray-100 text-gray-600'
    
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${classes}`}>
            {status}
        </span>
    )
}