import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GenericTable, { type TableColumn } from '../components/ui/GenericTable'
import Button from '../components/forms/Button'
import Input from '../components/forms/Input'
import Select from '../components/forms/Select'
import { useAuth } from '../context/AuthContext'
import { FaPlus, FaSearch, FaEdit, FaEye } from 'react-icons/fa'


type StatusPeca = 'EM ESTOQUE' | 'EM USO' | 'EM MANUTENÇÃO' | 'DESCARTADA'
type TipoPeca = 'MOTOR' | 'ASA' | 'AVIONICA' | 'FUSELAGEM' | 'OUTROS'

interface Peca {
    id: number
    codigoInterno: string
    nome: string
    tipo: TipoPeca
    fornecedor: string
    status: StatusPeca
    aeronaveAssociada?: string
}

const mockPecas: Peca[] = [
    { id: 101, codigoInterno: 'ENG-RR-001', nome: 'Motor Esquerdo', tipo: 'MOTOR', fornecedor: 'Rolls Royce', status: 'EM ESTOQUE', aeronaveAssociada: undefined },
    { id: 102, codigoInterno: 'WING-L-A350', nome: 'Asa Esquerda', tipo: 'ASA', fornecedor: 'Airbus Aero', status: 'EM USO', aeronaveAssociada: 'A-350' },
    { id: 103, codigoInterno: 'AVION-GF-005', nome: 'Display Primário', tipo: 'AVIONICA', fornecedor: 'Garmin', status: 'EM MANUTENÇÃO', aeronaveAssociada: undefined },
    { id: 104, codigoInterno: 'FUS-EMB-010', nome: 'Seção Central', tipo: 'FUSELAGEM', fornecedor: 'Embraer Estruturas', status: 'EM USO', aeronaveAssociada: 'E-175' },
    { id: 105, codigoInterno: 'TIRE-MLG-001', nome: 'Pneu Trem Pouso', tipo: 'OUTROS', fornecedor: 'Michelin Aero', status: 'EM ESTOQUE', aeronaveAssociada: undefined },
]

const STATUS_OPCOES = [
    { value: '', label: 'Todos os Status' },
    { value: 'EM ESTOQUE', label: 'Em Estoque' },
    { value: 'EM USO', label: 'Em Uso' },
    { value: 'EM MANUTENÇÃO', label: 'Em Manutenção' },
    { value: 'DESCARTADA', label: 'Descartada' },
]

const TIPO_OPCOES = [
    { value: '', label: 'Todos os Tipos' },
    { value: 'MOTOR', label: 'Motor' },
    { value: 'ASA', label: 'Asa' },
    { value: 'AVIONICA', label: 'Aviônica' },
    { value: 'FUSELAGEM', label: 'Fuselagem' },
    { value: 'OUTROS', label: 'Outros' },
]


const PecaManagement: React.FC = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState<StatusPeca | ''>('')
    const [filterTipo, setFilterTipo] = useState<TipoPeca | ''>('')
    const canManage = user?.nivelPermissao === 'ADMINISTRADOR' || user?.nivelPermissao === 'ENGENHEIRO'
    const filteredPecas = useMemo(() => {
        return mockPecas.filter(peca => {
            const matchesSearch = searchTerm === '' || 
                                  peca.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  peca.codigoInterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  peca.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  (peca.aeronaveAssociada && peca.aeronaveAssociada.toLowerCase().includes(searchTerm.toLowerCase()))
            
            const matchesStatus = filterStatus === '' || peca.status === filterStatus
            const matchesTipo = filterTipo === '' || peca.tipo === filterTipo
            
            return matchesSearch && matchesStatus && matchesTipo
        })
    }, [searchTerm, filterStatus, filterTipo])


    const columns: TableColumn<Peca>[] = useMemo(() => [
        { key: 'codigoInterno', header: 'Cód. Interno', sortable: true },
        { key: 'nome', header: 'Nome da Peça', sortable: true },
        { key: 'tipo', header: 'Tipo', sortable: true },
        { key: 'fornecedor', header: 'Fornecedor', sortable: true },
        { 
            key: 'aeronaveAssociada', 
            header: 'Associada à Aeronave', 
            sortable: true,
            render: (item) => item.aeronaveAssociada || 'N/A' 
        },
        { 
            key: 'status', 
            header: 'Status', 
            render: (item) => (
                <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded ${
                    item.status === 'EM ESTOQUE' ? 'bg-blue-100 text-blue-800' : 
                    item.status === 'EM USO' ? 'bg-green-100 text-green-800' : 
                    item.status === 'EM MANUTENÇÃO' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-700'
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
                    
                    {canManage && (
                        <Button 
                            onClick={() => navigate(`/pecas/edit/${item.id}`)}
                            title="Editar Peça" 
                            variant="secondary"
                            size="sm"
                        >
                            <FaEdit />
                        </Button>
                    )}
                    {/* Botão de Visualização Detalhada (para todos, se houvesse uma página de detalhes) */}
                    {/* <Button 
                        onClick={() => navigate(`/pecas/details/${item.id}`)}
                        title="Ver Detalhes" 
                        variant="info"
                        size="sm"
                    >
                        <FaEye />
                    </Button> */}
                </div>
            )
        },
    ], [canManage])

    return (
        <div className="space-y-6 mt-20">
            
            
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-700">Gestão de Peças</h2>
                
                {canManage && (
                    <Button 
                        onClick={() => navigate('/pecas/new')}
                        variant="primary"
                    >
                        <FaPlus className="mr-2" />
                        Cadastrar Nova Peça
                    </Button>
                )}
            </div>

            <div className="bg-white p-4  flex flex-col md:flex-row gap-4 items-end">
                <Input 
                    label="Buscar por Código, Nome, Fornecedor ou Aeronave"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    Icon={FaSearch}
                    className="flex-grow"
                />
                <Select
                    label="Filtrar por Status"
                    options={STATUS_OPCOES}
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as StatusPeca | '')}
                    className="md:w-1/4"
                />
                <Select
                    label="Filtrar por Tipo"
                    options={TIPO_OPCOES}
                    value={filterTipo}
                    onChange={(e) => setFilterTipo(e.target.value as TipoPeca | '')}
                    className="md:w-1/4"
                />
            </div>

            
            <GenericTable
                data={filteredPecas}
                columns={columns}
            />
        </div>
    )
}

export default PecaManagement