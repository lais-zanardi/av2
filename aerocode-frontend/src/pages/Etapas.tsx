import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericTable, { type TableColumn } from '../components/ui/GenericTable';
import Button from '../components/forms/Button';
import Input from '../components/forms/Input';
import Select from '../components/forms/Select';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaEye, FaSearch } from 'react-icons/fa';


type StatusEtapa = 'PENDENTE' | 'EM ANDAMENTO' | 'CONCLUÍDA';

interface EtapaGlobal {
    id: number;
    aeronaveCodigo: string;
    nome: string;
    prazo: string;
    status: StatusEtapa;
    responsavelNome: string;
}

const mockEtapas: EtapaGlobal[] = [
    { id: 1, aeronaveCodigo: 'E-175', nome: 'Desenho Final', prazo: '2025-01-01', status: 'CONCLUÍDA', responsavelNome: 'Carlos Souza' },
    { id: 2, aeronaveCodigo: 'E-175', nome: 'Montagem Fuselagem', prazo: '2025-03-15', status: 'CONCLUÍDA', responsavelNome: 'Maria Alves' },
    { id: 3, aeronaveCodigo: 'E-175', nome: 'Instalação Elétrica', prazo: '2025-05-20', status: 'EM ANDAMENTO', responsavelNome: 'Pedro Silva' },
    { id: 4, aeronaveCodigo: 'E-175', nome: 'Testes de Voo', prazo: '2025-10-10', status: 'PENDENTE', responsavelNome: 'João Ribeiro' },
    { id: 5, aeronaveCodigo: 'A-350', nome: 'Pintura Externa', prazo: '2025-07-30', status: 'EM ANDAMENTO', responsavelNome: 'Ana Lima' },
    { id: 6, aeronaveCodigo: 'F-35', nome: 'Montagem Armamento', prazo: '2025-09-01', status: 'PENDENTE', responsavelNome: 'Ricardo Costa' },
];

const STATUS_OPCOES = [
    { value: '', label: 'Todos os Status' },
    { value: 'PENDENTE', label: 'PENDENTE' },
    { value: 'EM ANDAMENTO', label: 'EM ANDAMENTO' },
    { value: 'CONCLUÍDA', label: 'CONCLUÍDA' },
];

const Etapas: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<StatusEtapa | ''>('');
    const canManage = user?.nivelPermissao === 'ADMINISTRADOR' || user?.nivelPermissao === 'ENGENHEIRO';

    
    const filteredEtapas = useMemo(() => {
        return mockEtapas.filter(etapa => {
            const matchesSearch = searchTerm === '' || 
                                  etapa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  etapa.aeronaveCodigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  etapa.responsavelNome.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesStatus = filterStatus === '' || etapa.status === filterStatus;
            
            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, filterStatus]);


    
    const columns: TableColumn<EtapaGlobal>[] = useMemo(() => [
        { key: 'aeronaveCodigo', header: 'Aeronave', sortable: true },
        { key: 'nome', header: 'Nome da Etapa', sortable: true },
        { key: 'prazo', header: 'Prazo', sortable: true },
        { key: 'responsavelNome', header: 'Responsável', sortable: true },
        { 
            key: 'status', 
            header: 'Status', 
            render: (item) => (
                <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded ${
                    item.status === 'CONCLUÍDA' ? 'bg-green-100 text-green-800' : 
                    item.status === 'EM ANDAMENTO' ? 'bg-yellow-100 text-yellow-800' : 
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
                    <Button 
                        onClick={() => navigate(`/etapas/${item.id}`)}
                        title="Ver Detalhes da Etapa" 
                        variant="secondary"
                        size="sm"
                    >
                        <FaEye />
                    </Button>
                </div>
            )
        },
    ], []);


    
    return (
        <div className="space-y-6">
            
            
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-700">Gestão de Etapas de Produção</h2>
                
                {canManage && (
                    <Button 
                        onClick={() => navigate('/etapas/new')} 
                        variant="primary"
                    >
                        <FaPlus className="mr-2" />
                        Registrar Nova Etapa
                    </Button>
                )}
            </div>

            
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4">
                <Input 
                    label="Buscar por Nome, Aeronave, Responsável"
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
                    onChange={(e) => setFilterStatus(e.target.value as StatusEtapa | '')}
                    className="md:w-1/4"
                />
            </div>

            
            <GenericTable
                data={filteredEtapas}
                columns={columns}
            />
        </div>
    );
};

export default Etapas;