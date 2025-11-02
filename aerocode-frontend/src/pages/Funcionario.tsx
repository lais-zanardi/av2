import React, { useState } from 'react';
import Modal from '../components/ui/Modal';
import Button from '../components/forms/Button';
import FuncionarioSelectionTable from './FuncionarioSelectionTable';
import type { Funcionario } from '../components/types/Funcionario';

const mockFuncionarios: Funcionario[] = [
    { id: 201, nome: 'Maria Alves', nivel: 'ENGENHEIRO', telefone: '(11) 98888-1111', endereco: 'Rua A', usuario: 'maria.a' },
    { id: 202, nome: 'Carlos Souza', nivel: 'OPERADOR', telefone: '(11) 98888-2222', endereco: 'Rua B', usuario: 'carlos.s' },
    { id: 203, nome: 'Ana Lima', nivel: 'OPERADOR', telefone: '(11) 98888-3333', endereco: 'Rua C', usuario: 'ana.l' },
    { id: 204, nome: 'João Pedro', nivel: 'ENGENHEIRO', telefone: '(11) 98888-4444', endereco: 'Rua D', usuario: 'joao.p' },
];

const FuncionarioLista: React.FC = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null);

    const handleFuncionarioSelected = (funcionario: Funcionario) => {
        setSelectedFuncionario(funcionario);
        console.log(`Funcionário selecionado para alocação: ${funcionario.nome}`);
        // Aqui você faria a lógica de alocar, talvez fechando o modal
        // setIsModalOpen(false); 
    };

    return (
        <div>
            <Button onClick={() => setIsModalOpen(true)}>Abrir Modal de Alocação</Button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Associar Funcionário à Etapa"
                size="lg"
            >
                <div className="space-y-4">
                    <p className="text-gray-700">Selecione um funcionário para associar à etapa atual:</p>
                    
                    <FuncionarioSelectionTable
                        data={mockFuncionarios} // Dados de teste ou da API
                        onSelect={handleFuncionarioSelected}
                        // selectedItems={[]} // Se houver funcionários já alocados, passe aqui
                    />

                    {selectedFuncionario && (
                        <p className="text-sm text-gray-600 mt-2">
                            Funcionário escolhido: <span className="font-semibold">{selectedFuncionario.nome}</span>
                        </p>
                    )}

                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="secondary" onClick={() => { setIsModalOpen(false); setSelectedFuncionario(null); }}>Cancelar</Button>
                        <Button onClick={handleSaveAllocation} disabled={!selectedFuncionario}>Confirmar Alocação</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FuncionarioLista;