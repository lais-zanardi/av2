import React, { useMemo, useState } from 'react'
import GenericTable, { type TableColumn } from '../../components/ui/GenericTable'
import Button from '../../components/forms/Button'
import { FaEdit, FaUserPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import type { NivelPermissao, Funcionario } from '../../components/types/Funcionario'
import { useFuncionarios } from '../../context/FuncionarioContext'

const NivelBadge: React.FC<{ nivel: NivelPermissao }> = ({ nivel }) => {
    let colorClass = ''
    let textColorClass = 'text-gray-900'

    switch (nivel) {
        case 'ADMINISTRADOR':
            colorClass = 'bg-purple-100'
            textColorClass = 'text-purple-700'
            break
        case 'ENGENHEIRO':
            colorClass = 'bg-blue-100'
            textColorClass = 'text-blue-700'
            break
        case 'OPERADOR':
            colorClass = 'bg-green-100'
            textColorClass = 'text-green-700'
            break
        default:
            colorClass = 'bg-gray-100'
    }
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass} ${textColorClass}`}>
            {nivel}
        </span>
    )
}

const UserManagement: React.FC = () => {
    const navigate = useNavigate()
    const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null)
    const { funcionarios } = useFuncionarios()
    const handleEdit = (funcionario: Funcionario) => {

        navigate(`/admin/users/edit/${funcionario.id}`)

    }

    const columns: TableColumn<Funcionario>[] = useMemo(() => [
        {
            key: 'id',
            header: 'ID',
            sortable: true,
        },
        { key: 'nome', header: 'Nome', sortable: true },
        { key: 'usuario', header: 'Usuário (Login)', sortable: false },
        { key: 'telefone', header: 'Contato', sortable: false },
        {
            key: 'nivel',
            header: 'Nível',
            sortable: true,
            render: (item) => <NivelBadge nivel={item.nivel} />
        },
        {
            key: 'actions',
            header: 'Ações',
            render: (item) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEdit(item)}
                        title="Editar Funcionário"
                        className="primary p-1 transition-colors"
                    >
                        <FaEdit />
                    </button>
                </div>
            )
        },
    ], [])

    return (
        <div className="space-y-6  mt-20 p-6 w-full  shadow-md bg-white">
            <GenericTable
                data={funcionarios}
                columns={columns}
                onRowSelect={setSelectedFuncionario}
            />
            <div className="flex justify-start">
                <Button
                    onClick={() => navigate(`/admin/users/new`)}
                    variant="primary"
                    size="lg"
                >
                    <FaUserPlus className="mr-2" />
                    Novo Funcionário
                </Button>
            </div>

            {selectedFuncionario && (
                <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded text-sm">
                    Selecionado: {selectedFuncionario.nome} ({selectedFuncionario.nivel})
                </div>
            )}
        </div>
    )
}

export default UserManagement