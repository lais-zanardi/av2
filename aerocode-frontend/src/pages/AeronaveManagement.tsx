import React, { useMemo } from 'react'
import { FaEye, FaEdit, FaSave, FaUserPlus, FaPlusCircle, FaPlus } from 'react-icons/fa'
import GenericTable, { type TableColumn } from '../components/ui/GenericTable'
import Button from '../components/forms/Button'
import { useNavigate } from 'react-router-dom' 
import { useAuth } from '../context/AuthContext'
import type { Aeronave } from '../components/types/TipoAeronave'

const mockAeronaves: Aeronave[] = [
    { codigo: 'E175', modelo: 'EMB-175', tipo: 'COMERCIAL', capacidade: 88, status: 'Em Produção' },
    { codigo: 'A350', modelo: 'Airbus A350', tipo: 'COMERCIAL', capacidade: 300, status: 'Pronta' },
    { codigo: 'F35', modelo: 'Lockheed F-35', tipo: 'MILITAR', capacidade: 1, status: 'Em Testes' },
    { codigo: 'G280', modelo: 'Gulfstream G280', tipo: 'COMERCIAL', capacidade: 10, status: 'Entregue' },
]

const AeronaveManagement: React.FC = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const canManage = user?.nivelPermissao === 'ADMINISTRADOR' || user?.nivelPermissao === 'ENGENHEIRO'
    const isOperator = user?.nivelPermissao === 'OPERADOR'
   
    const columns: TableColumn<Aeronave>[] = useMemo(() => [
        { key: 'codigo', header: 'Código', sortable: true },
        { key: 'modelo', header: 'Modelo', sortable: true },
        { key: 'capacidade', header: 'Capacidade', sortable: false },
        { 
            key: 'status', 
            header: 'Status de Produção', 
            render: (item) => (
                <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded ${
                    item.status === 'Pronta' ? 'bg-green-100 text-green-800' : 
                    item.status === 'Em Produção' ? 'bg-yellow-100 text-yellow-800' : 
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
                        onClick={() => navigate(`/aeronaves/details/${item.codigo}`)}
                        title="Ver Detalhes" 
                        variant={isOperator ? "primary" : "secondary"}
                        size="sm"
                    >
                        <FaEye />
                    </Button>

                    {canManage && (
                        <Button
                            onClick={() => navigate(`/aeronave/edit/${item.codigo}`)}
                            title="Editar Aeronave" 
                            variant="secondary"
                            size="sm"
                        >
                            <FaEdit />
                        </Button>
                    )}
                </div>
            )
        },
    ], [canManage, isOperator]) 

    
    return (
        <div className="space-y-6  mt-20 p-6 w-full">
            
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-700">Lista de Aeronaves </h2>
                
                {canManage && (
                    <Button 
                        onClick={() => navigate('/aeronaves/new')}
                        variant="primary"
                    >
                        <FaPlus className="mr-2" />
                        Adicionar aeronave
                    </Button>
                )}
            </div>

            <GenericTable
                data={mockAeronaves}
                columns={columns}
            />
        </div>
    )
}

export default AeronaveManagement