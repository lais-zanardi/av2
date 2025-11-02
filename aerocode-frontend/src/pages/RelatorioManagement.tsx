// src/pages/Reporting/ReportManagement.tsx

import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GenericTable, { type TableColumn } from '../components/ui/GenericTable'
import Button from '../components/forms/Button'
import Input from '../components/forms/Input'
import Select from '../components/forms/Select'
import { useAuth } from '../context/AuthContext'
import { FaPlus, FaSearch, FaDownload, FaCloudUploadAlt, FaFileAlt, FaSyncAlt } from 'react-icons/fa'
import { GenerateReportModal } from '../components/modals/RelatorioModal' // Importar o modal

type TipoRelatorio = 'PRODUCAO_GERAL' | 'POR_AERONAVE' | 'PECA_LOGISTICA' | 'TESTES_QUALIDADE'
type StatusRelatorio = 'GERADO' | 'PENDENTE' | 'ERRO'

interface Relatorio {
    id: number
    nome: string 
    tipo: TipoRelatorio
    dataGeracao: string
    geradoPor: string
    status: StatusRelatorio
    linkDownload?: string 
}

const mockRelatorios: Relatorio[] = [
    { id: 1, nome: 'Relatório Final Aeronave E-175', tipo: 'POR_AERONAVE', dataGeracao: '2025-06-10', geradoPor: 'Admin User', status: 'GERADO', linkDownload: '/reports/e175_final.pdf' },
    { id: 2, nome: 'Logística de Peças Mensal (Maio)', tipo: 'PECA_LOGISTICA', dataGeracao: '2025-06-01', geradoPor: 'Engenheiro Chefe', status: 'GERADO', linkDownload: '/reports/pecas_maio.pdf' },
    { id: 3, nome: 'Relatório de Testes de Voo A-350', tipo: 'TESTES_QUALIDADE', dataGeracao: '2025-06-15', geradoPor: 'QA Manager', status: 'PENDENTE' },
    { id: 4, nome: 'Produção Geral Q2 2025', tipo: 'PRODUCAO_GERAL', dataGeracao: '2025-07-01', geradoPor: 'Admin User', status: 'ERRO' },
]

const TIPO_RELATORIO_OPCOES = [
    { value: '', label: 'Todos os Tipos' },
    { value: 'PRODUCAO_GERAL', label: 'Produção Geral' },
    { value: 'POR_AERONAVE', label: 'Por Aeronave' },
    { value: 'PECA_LOGISTICA', label: 'Logística de Peças' },
    { value: 'TESTES_QUALIDADE', label: 'Testes de Qualidade' },
]

const STATUS_RELATORIO_OPCOES = [
    { value: '', label: 'Todos os Status' },
    { value: 'GERADO', label: 'Gerado' },
    { value: 'PENDENTE', label: 'Pendente' },
    { value: 'ERRO', label: 'Erro' },
]


const ReportManagement: React.FC = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    const [searchTerm, setSearchTerm] = useState('')
    const [filterTipo, setFilterTipo] = useState<TipoRelatorio | ''>('')
    const [filterStatus, setFilterStatus] = useState<StatusRelatorio | ''>('')
    const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false)


    const canGenerateReport = user?.nivelPermissao === 'ADMINISTRADOR' || user?.nivelPermissao === 'ENGENHEIRO'


    const filteredRelatorios = useMemo(() => {
        return mockRelatorios.filter(relatorio => {
            const matchesSearch = searchTerm === '' || 
                                  relatorio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  relatorio.geradoPor.toLowerCase().includes(searchTerm.toLowerCase())
            
            const matchesTipo = filterTipo === '' || relatorio.tipo === filterTipo
            const matchesStatus = filterStatus === '' || relatorio.status === filterStatus
            
            return matchesSearch && matchesTipo && matchesStatus
        })
    }, [searchTerm, filterTipo, filterStatus])


    const columns: TableColumn<Relatorio>[] = useMemo(() => [
        { key: 'nome', header: 'Nome do Relatório', sortable: true },
        { key: 'tipo', header: 'Tipo', sortable: true },
        { key: 'dataGeracao', header: 'Data de Geração', sortable: true },
        { key: 'geradoPor', header: 'Gerado Por', sortable: true },
        { 
            key: 'status', 
            header: 'Status', 
            render: (item) => (
                <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded ${
                    item.status === 'GERADO' ? 'bg-green-100 text-green-800' : 
                    item.status === 'PENDENTE' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                }`}>
                    {item.status}
                </span>
            )
        },
        { 
            key: 'actions', 
            header: 'Ações', 
            render: (item) => (
                <div className="flex space-x-2 justify-end">
                    {/* Botão de Download/Visualização */}
                    {item.status === 'GERADO' && item.linkDownload && (
                        <Button 
                            onClick={() => window.open(item.linkDownload, '_blank')}
                            title="Download Relatório" 
                            variant="primary"
                            size="sm"
                        >
                            <FaDownload />
                        </Button>
                    )}
                    
                </div>
            )
        },
    ], [canGenerateReport])



    return (
        <>
            <div className="space-y-6 mt-20">
         
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-700">Relatórios Gerados</h2>
                    
                    {canGenerateReport && (
                        <Button 
                            onClick={() => setIsGenerateModalOpen(true)}
                            variant="primary"
                        >
                            <FaPlus className="mr-2" />
                            Gerar Novo Relatório
                        </Button>
                    )}
                </div>

            
                <div className="bg-white p-4 flex flex-col md:flex-row gap-4 items-end">
                    <Input 
                        label="Buscar por Nome do Relatório ou Gerador"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        Icon={FaSearch}
                        className="flex-grow"
                    />
                    <Select
                        label="Filtrar por Tipo"
                        options={TIPO_RELATORIO_OPCOES}
                        value={filterTipo}
                        onChange={(e) => setFilterTipo(e.target.value as TipoRelatorio | '')}
                        className="md:w-1/4"
                    />
                     <Select
                        label="Filtrar por Status"
                        options={STATUS_RELATORIO_OPCOES}
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as StatusRelatorio | '')}
                        className="md:w-1/4"
                    />
                </div>

     
                <GenericTable
                    data={filteredRelatorios}
                    columns={columns}
                />
            </div>

     
            <GenerateReportModal
                isOpen={isGenerateModalOpen}
                onClose={() => setIsGenerateModalOpen(false)}
            />
        </>
    )
}

export default ReportManagement