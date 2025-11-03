import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import GenericTable, { type TableColumn } from '../components/ui/GenericTable'
import Button from '../components/forms/Button'
import { FaPlane, FaCode, FaUsers, FaRulerCombined, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaCog, FaVial, FaPlus, FaHashtag } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { AddStageModal, AssociateEmployeeModal } from '../components/modals/StageModals'
import type { StatusProducao } from '../components/types/TipoAeronave'
import { useAeronaves } from '../context/AeronaveContext'
import type { Aeronave, Peca, Etapa, TesteRegistro, StatusEtapa, ResultadoTeste } from '../components/types/TipoAeronave'

const AeronaveDetails: React.FC = () => {
    const [isAddStageModalOpen, setIsAddStageModalOpen] = useState(false)
    const [isAssociateModalOpen, setIsAssociateModalOpen] = useState(false)
    const openAddStage = () => setIsAddStageModalOpen(true)
    const closeAddStage = () => setIsAddStageModalOpen(false)

    const openAssociate = () => setIsAssociateModalOpen(true)
    const closeAssociate = () => setIsAssociateModalOpen(false)
    const navigate = useNavigate()
    const { user } = useAuth()
    const params = useParams()
    const codigoAeronave = params.codigo
    const { aeronaves } = useAeronaves()
    const { getAeronaveByCodigo, addEtapaToAeronave } = useAeronaves()

    const [details, setDetails] = useState<Aeronave | null>(null)
    const [loading, setLoading] = useState(true)

    const canManage = user?.nivelPermissao === 'ADMINISTRADOR' || user?.nivelPermissao === 'ENGENHEIRO'

    useEffect(() => {
        if (!codigoAeronave) {
            setLoading(false)
            return
        }

        setLoading(true)
        const fetchedDetails = getAeronaveByCodigo(codigoAeronave)

        setDetails(fetchedDetails)
        setLoading(false)
    }, [codigoAeronave, getAeronaveByCodigo])

    const pecasColumns: TableColumn<Peca>[] = useMemo(() => [
        { key: 'codigo', header: 'Cód. Peça', sortable: true },
        { key: 'nome', header: 'Nome', sortable: false },
        { key: 'fornecedor', header: 'Fornecedor', sortable: false },
        { key: 'status', header: 'Status Logístico', sortable: true },
    ], [canManage])

    const etapasColumns: TableColumn<Etapa>[] = useMemo(() => [
        { key: 'id', header: 'ID', sortable: false },
        { key: 'nome', header: 'Etapa', sortable: false },
        { key: 'prazo', header: 'Prazo', sortable: true },
        {
            key: 'status',
            header: 'Status',
            render: (item) => (
                <span className={`font-semibold ${item.status === 'CONCLUÍDA' ? 'text-green-600' :
                    item.status === 'EM ANDAMENTO' ? 'text-yellow-600' : 'text-gray-500'
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            key: 'actions',
            header: 'Ações',
            render: (item) => (
                canManage && (
                    <Button title="Associar Funcionário" variant="secondary" size="sm" onClick={openAssociate}>Associar</Button>
                )
            )
        },

    ], [canManage])

    const testesColumns: TableColumn<TesteRegistro>[] = useMemo(() => [
        { key: 'tipo', header: 'Tipo de Teste', sortable: false },
        { key: 'data', header: 'Data', sortable: false },
        {
            key: 'resultado',
            header: 'Resultado',
            render: (item) => (
                <span className={`flex items-center gap-1 font-semibold ${item.resultado === 'APROVADO' ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {item.resultado === 'APROVADO' ? <FaCheckCircle /> : <FaTimesCircle />}
                    {item.resultado}
                </span>
            )
        },
        {
            key: 'actions',
            header: 'Ações',
            render: (item) => (
                canManage && (
                    <Button title="Ver Detalhes" variant="secondary" size="sm">Ver</Button>
                )
            )
        },
    ], [canManage])

    if (loading) {
        return <div className="text-center p-10 text-gray-500">Carregando detalhes da aeronave...</div>
    }
    if (!details) {
        return <div className="text-center p-10 text-red-600 font-semibold">Aeronave não encontrada ou código inválido.</div>
    }

    const handleSaveStage = (etapaData: any) => {
        if (!details || !details.codigo) {
            alert('Erro: Aeronave não identificada.');
            return;
        }

        try {
            setDetails(prevDetails => {
                if (!prevDetails) return null;
                
                const newEtapa = {
                    id: Math.max(...prevDetails.etapas.map(e => e.id), 0) + 1,
                    nome: etapaData.nome,
                    prazo: etapaData.prazo,
                    status: etapaData.status,
                };

                return {
                    ...prevDetails,
                    etapas: [...prevDetails.etapas, newEtapa], 
                };
            });
            
            alert(`Etapa '${etapaData.nome}' adicionada com sucesso!`);

        } catch (error) {
            alert(`Erro ao salvar etapa: ${error}`);
        }
    };


    return (
        <div className="space-y-10">
            <div className="bg-white mt-20 p-6 w-full">
                <h3 className="text-xl font-medium mb-4 text-blue-700">Informações Gerais</h3>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <InfoBox label="Código" value={details.codigo} icon={<FaHashtag />} />
                        <InfoBox label="Modelo" value={details.modelo} icon={<FaPlane />} />
                        <InfoBox label="Tipo" value={details.tipo} icon={<FaUsers />} />
                        <InfoBox label="Alcance" value={`${details.alcance} km`} icon={<FaRulerCombined />} />
                        <InfoBox label="Status Geral" value={details.status} icon={<FaHourglassHalf />} />
                    </div>

                    <div className="lg:col-span-1  p-4 flex flex-col items-center justify-center bg-gray-50">
                        <div className="relative">
                            <svg className="w-24 h-24 transform -rotate-90">
                                <circle className="text-gray-200" strokeWidth="6" stroke="currentColor" fill="transparent" r="40" cx="48" cy="48" />
                                <circle
                                    className="text-blue-500"
                                    strokeWidth="6"
                                    strokeDasharray={2 * Math.PI * 40}
                                    strokeDashoffset={(2 * Math.PI * 40) - (2 * Math.PI * 40 * details.percentualConcluido / 100)}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="40"
                                    cx="48"
                                    cy="48"
                                />
                            </svg>
                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-gray-700">
                                {details.percentualConcluido}%
                            </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Produção Completa</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6">
                <h3 className="text-xl font-medium mb-4 text-blue-700 flex justify-between items-center">
                    Fluxo de Etapas de Produção
                    {canManage && (
                        <Button variant="primary" size="sm" onClick={openAddStage}>
                            Adicionar Etapa
                        </Button>
                    )}
                </h3>
                <GenericTable data={details.etapas} columns={etapasColumns} />
            </div>

            <div className="bg-white p-6">
                <h3 className="text-xl font-medium mb-4 text-blue-700 flex justify-between items-center">
                    Gestão de Peças e Logística
                    {canManage && (
                        <Button variant="primary" size="sm" onClick={() => navigate('/pecas')}>
                            Adicionar Peça
                        </Button>
                    )}
                </h3>
                <GenericTable data={details.pecas} columns={pecasColumns} />
            </div>


            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-4 text-blue-700 flex justify-between items-center">
                    Resultados de Testes de Qualidade
                    {canManage && (
                        <Button variant="primary" size="sm" onClick={() => navigate('/testes')}>
                            Registrar Teste
                        </Button>
                    )}
                </h3>
                <GenericTable data={details.testes} columns={testesColumns} />
            </div>
            <AddStageModal
                isOpen={isAddStageModalOpen}
                onClose={closeAddStage}
                aeronaveCodigo={details?.codigo || ''}
                onSave={handleSaveStage}
            />


            <AssociateEmployeeModal
                isOpen={isAssociateModalOpen}
                onClose={closeAssociate}
                etapaNome="Instalação Elétrica"
                currentlyAssociatedIds={[101, 205]}
            />

        </div >
    )
}

export default AeronaveDetails

// Componente Auxiliar para Caixas de Informação
const InfoBox: React.FC<{ label: string; value: string | number; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="flex items-center p-3 bg-gray-100 rounded-lg">
        <div className="text-blue-500 mr-3 text-lg">
            {icon}
        </div>
        <div>
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="text-sm font-semibold text-gray-800">{value}</p>
        </div>
    </div>
)

function getAeronaveById(codigoAeronave: string) {
    throw new Error('Function not implemented.')
}
