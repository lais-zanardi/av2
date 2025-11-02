import Modal from '../../components/ui/Modal';
import Input from '../../components/forms/Input'; 
import Button from '../../components/forms/Button';
import React from 'react';

const MyStageModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    
    const handleSaveStage = () => {
        console.log("Salvando nova etapa...");
        setIsModalOpen(false); 
    };

    return (
        <div>
            <Button onClick={() => setIsModalOpen(true)}>Abrir Modal</Button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Modal: Adicionar nova etapa"
                size="md"
            >
                {/* CONTEÚDO CUSTOMIZADO INJETADO AQUI */}
                <div className="grid grid-cols-2 gap-4">
                    
                    {/* Linha 1 */}
                    <Input label="Nome da Etapa" placeholder="Ex: Montagem da Aviônica" />
                    <Input label="Prazo (Data)" type="date" />
                    
                    {/* Linha 2 */}
                    <Input label="Funcionário Líder" placeholder="ID ou Nome" />
                    <Input label="Descrição Curta" />

                    {/* Linha 3 (Pode ser usado para botões de ação do wireframe) */}
                    <div className="col-span-2 flex justify-end gap-3 mt-4">
                        {/* Botões do wireframe (Lorem, Lorem, com ícones) */}
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSaveStage}>Salvar Etapa</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default MyStageModal;