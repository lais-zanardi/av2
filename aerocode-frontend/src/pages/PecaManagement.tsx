import { useMemo } from "react";
import { FaTruck, FaEdit } from "react-icons/fa";
import type { TableColumn } from "../ui/GenericTable";
import GenericTable from "../ui/GenericTable";

// Interface simulada para a entidade Peça
interface Peca {
    id: number;
    nome: string;
    tipo: 'NACIONAL' | 'IMPORTADA';
    fornecedor: string;
    status: 'EM_PRODUCAO' | 'EM_TRANSPORTE' | 'PRONTA';
}
// Exemplo: src/pages/Logistics/PecaManagement.tsx

const mockPecas: Peca[] = [
    { id: 101, nome: 'Asa Esquerda', tipo: 'IMPORTADA', fornecedor: 'Boeing', status: 'EM_TRANSPORTE' },
    { id: 102, nome: 'Motor Turbo Prop', tipo: 'NACIONAL', fornecedor: 'AeroPower', status: 'EM_PRODUCAO' },
    { id: 103, nome: 'Fuselagem Traseira', tipo: 'NACIONAL', fornecedor: 'AeroEstrutura', status: 'PRONTA' },
    // ...
];

const PecaTable: React.FC = () => {
    
    // Supondo que você gerencie o estado de seleção aqui
    const handleSelectPeca = (peca: Peca) => {
        console.log(`Peça ${peca.id} selecionada/desselecionada.`);
        // Lógica para adicionar/remover o ID ao array de peças selecionadas (estado global)
    };

    const columns: TableColumn<Peca>[] = useMemo(() => [
        { 
            key: 'selection', // CHAVE CRÍTICA: Ativa a caixa de seleção padrão no GenericTable
            header: '', 
            sortable: false,
            // O renderer padrão no GenericTable é usado
        },
        { key: 'nome', header: 'Nome da Peça', sortable: true },
        { key: 'fornecedor', header: 'Fornecedor', sortable: false },
        { key: 'tipo', header: 'Origem', sortable: true },
        { key: 'status', header: 'Status Atual', sortable: true, 
            render: (item) => (
                // Renderização customizada para Status
                <span className={`font-medium ${
                    item.status === 'PRONTA' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                    {item.status.replace('_', ' ')}
                </span>
            )
        },
        { 
            key: 'actions', 
            header: 'Ações', 
            render: (item) => (
                <div className="flex space-x-2">
                    {/* Botões de Ação Rápida */}
                    <button title="Atualizar Status" className="text-blue-600 hover:text-blue-800"><FaTruck /></button>
                    <button title="Editar Detalhes" className="text-gray-600 hover:text-gray-900"><FaEdit /></button>
                </div>
            )
        },
    ], []);

    return (
        <GenericTable
            data={mockPecas}
            columns={columns}
            onRowSelect={handleSelectPeca} // Passa o handler de seleção
        />
    );
};

export default PecaTable;