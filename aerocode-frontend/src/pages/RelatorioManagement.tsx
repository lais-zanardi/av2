import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GenericTable, { type TableColumn } from '../components/ui/GenericTable'
import Button from '../components/forms/Button'
import Input from '../components/forms/Input'
import Select from '../components/forms/Select'
import { useAuth } from '../context/AuthContext'
import { FaPlus, FaSearch, FaDownload, FaCloudUploadAlt, FaFileAlt, FaSyncAlt } from 'react-icons/fa'
import { GenerateReportModal } from '../components/modals/RelatorioModal'
import type { Relatorio, TipoRelatorio, StatusRelatorio } from '../components/types/Relatorio'
import { useRelatorios, TIPO_RELATORIO_OPCOES, STATUS_RELATORIO_OPCOES } from '../context/RelatorioContext'

const ReportManagement: React.FC = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { relatorios } = useRelatorios()

    const [searchTerm, setSearchTerm] = useState('')
    const [filterTipo, setFilterTipo] = useState<TipoRelatorio | ''>('')
    const [filterStatus, setFilterStatus] = useState<StatusRelatorio | ''>('')
    const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false)


    const canGenerateReport = user?.nivelPermissao === 'ADMINISTRADOR' || user?.nivelPermissao === 'ENGENHEIRO'


    const filteredRelatorios = useMemo(() => {
        return relatorios.filter(relatorio => {
            const matchesSearch = searchTerm === '' || 
                                  relatorio.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  relatorio.geradoPor.toLowerCase().includes(searchTerm.toLowerCase())
            
            const matchesTipo = filterTipo === '' || relatorio.tipo === filterTipo
            const matchesStatus = filterStatus === '' || relatorio.status === filterStatus
            
            return matchesSearch && matchesTipo && matchesStatus
        })
    }, [searchTerm, filterTipo, filterStatus, relatorios])


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