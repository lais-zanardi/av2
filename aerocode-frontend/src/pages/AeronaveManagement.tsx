// Exemplo: src/pages/Production/AeronaveManagement.tsx

import React, { useMemo }  from 'react';
import GenericTable, { type TableColumn } from '../ui/GenericTable';
import { FaEye, FaEdit } from 'react-icons/fa'; // Ícones de Ação

interface Aeronave {
    codigo: string;
    modelo: string;
    capacidade: number;
    status: 'Produção' | 'Pronta' | 'Entregue';
}

const mockAeronaves: Aeronave[] = [
    { codigo: 'E110', modelo: 'EMB-110', capacidade: 10, status: 'Produção' },
    { codigo: 'A320', modelo: 'A320neo', capacidade: 180, status: 'Pronta' },
    // ...
];

const AeronaveTable: React.FC = () => {

    // 1. Definição das Colunas
    const columns: TableColumn<Aeronave>[] = useMemo(() => [
        { key: 'codigo', header: 'Código', sortable: true },
        { key: 'modelo', header: 'Modelo', sortable: true },
        { key: 'capacidade', header: 'Capacidade', sortable: false },
        { 
            key: 'status', 
            header: 'Status', 
            render: (item) => (
                // Renderização customizada (usando um badge/rótulo)
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'Pronta' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                    {item.status}
                </span>
            )
        },
        { 
            key: 'actions', 
            header: 'Ações', 
            render: (item) => (
                // Renderização customizada (usando botões - conforme wireframe)
                <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900"><FaEye /></button>
                    <button className="text-gray-600 hover:text-gray-900"><FaEdit /></button>
                </div>
            )
        },
    ], []);

    // 2. Renderização
    return (
        <GenericTable
            data={mockAeronaves}
            columns={columns}
            // onSort={handleSort} // Lógica de ordenação seria implementada aqui
        />
    );
};

export default AeronaveTable;