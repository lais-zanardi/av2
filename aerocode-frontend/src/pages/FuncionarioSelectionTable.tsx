import type { Funcionario, NivelPermissao } from '../components/types/Funcionario'
import React, { useMemo } from 'react'
import GenericTable, { type TableColumn } from '../components/ui/GenericTable'

const NivelBadge: React.FC<{ nivel: NivelPermissao }> = ({ nivel }) => {
    let colorClass = ''
    switch (nivel) {
        case 'ADMINISTRADOR':
            colorClass = 'text-purple-600 bg-purple-100'
            break
        case 'ENGENHEIRO':
            colorClass = 'text-blue-600 bg-blue-100'
            break
        case 'OPERADOR':
            colorClass = 'text-green-600 bg-green-100'
            break
        default:
            colorClass = 'text-gray-600 bg-gray-100'
    }
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
            {nivel}
        </span>
    )
}
interface FuncionarioSelectionTableProps {
    data: Funcionario[]
    onSelect: (selectedFuncionario: Funcionario) => void
    selectedItems?: Funcionario[]
}


const FuncionarioSelectionTable: React.FC<FuncionarioSelectionTableProps> = ({
    data,
    onSelect,
}) => {

    const columns: TableColumn<Funcionario>[] = useMemo(() => [
        {
            key: 'selection', 
            header: '', 
            sortable: false,
        },
        { key: 'nome', header: 'Nome', sortable: true },
        { key: 'nivel', header: 'Nível', sortable: true, render: (item) => <NivelBadge nivel={item.nivel} /> }, // Usando o NivelBadge
        { key: 'telefone', header: 'Contato', sortable: false },
    ], []) 
    return (
        <GenericTable
            data={data}
            columns={columns}
            onRowSelect={onSelect}
        />
    )
}

export default FuncionarioSelectionTable