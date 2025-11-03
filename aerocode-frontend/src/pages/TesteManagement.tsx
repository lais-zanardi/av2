import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GenericTable, { type TableColumn } from '../components/ui/GenericTable'
import Button from '../components/forms/Button'
import Input from '../components/forms/Input'
import Select from '../components/forms/Select'
import { useAuth } from '../context/AuthContext'
import { FaPlus, FaSearch, FaVial, FaCheckCircle, FaTimesCircle, FaCalendarAlt } from 'react-icons/fa'
import type { Teste, ResultadoTeste, TipoTeste } from '../components/types/Teste'
import { useTestes, RESULTADO_OPCOES, TIPO_TESTE_OPCOES } from '../context/TesteContext'

const TestManagement: React.FC = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [searchTerm, setSearchTerm] = useState('')
    const [filterResultado, setFilterResultado] = useState<ResultadoTeste | ''>('')
    const [filterTipo, setFilterTipo] = useState<TipoTeste | ''>('')
    const canRecordTest = user?.nivelPermissao === 'ADMINISTRADOR' || user?.nivelPermissao === 'ENGENHEIRO'
    const { testes } = useTestes()

    const filteredTestes = useMemo(() => {
        return testes.filter(teste => {
            const matchesSearch = searchTerm === '' || 
                                  teste.aeronaveCodigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  teste.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  teste.responsavelNome.toLowerCase().includes(searchTerm.toLowerCase())
            
            const matchesResultado = filterResultado === '' || teste.resultado === filterResultado
            const matchesTipo = filterTipo === '' || teste.tipo === filterTipo
            
            return matchesSearch && matchesResultado && matchesTipo
        })
    }, [searchTerm, filterResultado, filterTipo, testes])

    const columns: TableColumn<Teste>[] = useMemo(() => [
        { key: 'aeronaveCodigo', header: 'Aeronave', sortable: true },
        { key: 'tipo', header: 'Tipo de Teste', sortable: true },
        { key: 'dataProgramada', header: 'Data Programada', sortable: true },
        { 
            key: 'dataRealizacao', 
            header: 'Data Realização', 
            sortable: true,
            render: (item) => item.dataRealizacao || 'N/A'
        },
        { 
            key: 'resultado', 
            header: 'Resultado', 
            render: (item) => (
                <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded ${
                    item.resultado === 'APROVADO' ? 'bg-green-100 text-green-800' : 
                    item.resultado === 'REPROVADO' ? 'bg-red-100 text-red-800' : 
                    'bg-gray-100 text-gray-700'
                }`}>
                    {item.resultado}
                </span>
            )
        },
        { key: 'responsavelNome', header: 'Responsável', sortable: true },
        { 
            key: 'actions', 
            header: 'Ações', 
            render: (item) => (
                <div className="flex space-x-2 justify-end">
                    {/* Botão para Registrar Teste (se estiver PENDENTE e o usuário tiver permissão) */}
                    {canRecordTest && item.resultado === 'PENDENTE' && (
                        <Button 
                            onClick={() => navigate(`/testes/record/${item.id}`)}
                            title="Registrar Resultado do Teste" 
                            variant="primary"
                            size="sm"
                        >
                            <FaVial />  Registrar
                        </Button>
                    )}
                </div>
            )
        },
    ], [canRecordTest])


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-700">Gestão de Testes de Qualidade</h2>
                
                {canRecordTest && (
                    <Button 
                        onClick={() => alert('Abrir modal/página para programar novo teste')}
                        variant="success"
                    >
                        <FaCalendarAlt className="mr-2" />
                        Programar Novo Teste
                    </Button>
                )}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 items-end">
                <Input 
                    label="Buscar por Aeronave, Tipo ou Responsável"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    Icon={FaSearch}
                    className="grow"
                />
                <Select
                    label="Filtrar por Resultado"
                    options={RESULTADO_OPCOES}
                    value={filterResultado}
                    onChange={(e) => setFilterResultado(e.target.value as ResultadoTeste | '')}
                    className="md:w-1/4"
                />
                <Select
                    label="Filtrar por Tipo"
                    options={TIPO_TESTE_OPCOES}
                    value={filterTipo}
                    onChange={(e) => setFilterTipo(e.target.value as TipoTeste | '')}
                    className="md:w-1/4"
                />
            </div>

            
            <GenericTable
                data={filteredTestes}
                columns={columns}
            />

        </div>
    )
}

export default TestManagement