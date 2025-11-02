import React, { useState, useMemo } from 'react'
import Modal from '../ui/Modal'
import Input from '../forms/Input'
import Select from '../forms/Select'
import Button from '../forms/Button'
import GenericTable, { type TableColumn } from '../ui/GenericTable'
import { FaSave, FaTimes, FaSearch, FaUsers } from 'react-icons/fa'
import type { Funcionario } from '../types/Funcionario'

const STATUS_ETAPA_OPCOES = [
    { value: 'PENDENTE', label: 'PENDENTE' },
    { value: 'EM ANDAMENTO', label: 'EM ANDAMENTO' },
]

const mockFuncionarios: Funcionario[] = [
    { id: 201, nome: 'Maria Alves', nivel: 'OPERADOR', telefone: '(11) 98888-1111', endereco: 'Rua A', usuario: 'maria.a' },
    { id: 202, nome: 'Carlos Souza', nivel: 'ENGENHEIRO', telefone: '(11) 98888-2222', endereco: 'Rua B', usuario: 'carlos.s' },
    { id: 203, nome: 'Ana Lima', nivel: 'OPERADOR', telefone: '(11) 98888-3333', endereco: 'Rua C', usuario: 'ana.l' },
]

interface AddStageModalProps {
    isOpen: boolean
    onClose: () => void
    aeronaveCodigo: string 
}

export const AddStageModal: React.FC<AddStageModalProps> = ({ isOpen, onClose, aeronaveCodigo }) => {
    const [formData, setFormData] = useState({
        nome: '',
        prazo: '',
        responsavel: '',
        status: 'PENDENTE',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Nova Etapa Salva:", { ...formData, aeronave: aeronaveCodigo })
        onClose()
    }

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={`Adicionar nova etapa (Aeronave: ${aeronaveCodigo})`}
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Campos Principais */}
                    <Input label="Nome da Etapa" name="nome" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} required />
                    <Input label="Prazo para Conclusão" name="prazo" type="date" value={formData.prazo} onChange={(e) => setFormData({...formData, prazo: e.target.value})} required />
                    <Input label="Descrição Curta" name="descricao" placeholder="" />
                    <Input label="Predecessora (ID)" name="predecessora" placeholder="" type="number" />
                    <Input label="Estimativa de Horas" name="horas" placeholder="" type="number" />
                    <Input label="Custo Estimado" name="custo" placeholder="" type="number" />
                
                    <Select 
                        label="Status Inicial" 
                        name="status"
                        options={STATUS_ETAPA_OPCOES} 
                        value={formData.status} 
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        disabled
                    />
                </div>
                
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        <FaTimes className="mr-2" /> Cancelar
                    </Button>
                    <Button type="submit" variant="primary">
                        <FaSave className="mr-2" /> Salvar Etapa
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

interface AssociateEmployeeModalProps {
    isOpen: boolean
    onClose: () => void
    etapaNome: string 
    currentlyAssociatedIds: number[] 
}

export const AssociateEmployeeModal: React.FC<AssociateEmployeeModalProps> = ({ isOpen, onClose, etapaNome, currentlyAssociatedIds }) => {
    
    const [selectedEmployees, setSelectedEmployees] = useState<Funcionario[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    
    const filteredEmployees = useMemo(() => {
        return mockFuncionarios.filter(f => 
            f.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
            f.nivel.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm])

    
    const handleToggleSelection = (funcionario: Funcionario) => {
        setSelectedEmployees(prev => 
            prev.some(f => f.id === funcionario.id)
            ? prev.filter(f => f.id !== funcionario.id) // Desseleciona
            : [...prev, funcionario] // Seleciona
        )
    }

    const handleAssociate = () => {
        console.log(`Associando ${selectedEmployees.length} funcionários à etapa: ${etapaNome}`)
        onClose()
        setSelectedEmployees([]) 
    }

    const columns: TableColumn<Funcionario>[] = useMemo(() => [
        { 
            key: 'selection', 
            header: '', 
            render: (item) => (
                <input 
                    type="checkbox"
                    checked={selectedEmployees.some(f => f.id === item.id)}
                    onChange={() => handleToggleSelection(item)}
                    className="h-4 w-4 text-blue-600 rounded"
                />
            )
        },
        { key: 'nome', header: 'Nome', sortable: true },
        { key: 'nivel', header: 'Nível', sortable: false },
        { key: 'telefone', header: 'Contato', sortable: false },
    ], [selectedEmployees, currentlyAssociatedIds])

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={`Modal: Associar funcionário à etapa (${etapaNome})`}
            size="lg"
        >
            <div className="space-y-4">
                
                <div className="flex gap-4">
                    <Input 
                        label="Buscar Funcionário"
                        placeholder="Nome, Nível ou ID"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow"
                        Icon={FaSearch}
                    />
                </div>
                
                
                <GenericTable 
                    data={filteredEmployees} 
                    columns={columns} 
                    onRowSelect={handleToggleSelection} 
                />

                <p className="text-sm text-gray-600">Funcionários Selecionados: <span className="font-semibold text-blue-600">{selectedEmployees.length}</span></p>

                
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        <FaTimes className="mr-2" /> Cancelar
                    </Button>
                    <Button 
                        onClick={handleAssociate} 
                        variant="primary" 
                        disabled={selectedEmployees.length === 0}
                    >
                        <FaUsers className="mr-2" /> Associar ({selectedEmployees.length})
                    </Button>
                </div>
            </div>
        </Modal>
    )
}