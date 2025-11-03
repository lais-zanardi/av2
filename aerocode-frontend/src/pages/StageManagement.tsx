import Modal from '../components/ui/Modal'
import Input from '../components/forms/Input' 
import Button from '../components/forms/Button'
import React from 'react'

const MyStageModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    
    const handleSaveStage = () => {
        console.log("Salvando nova etapa...")
        setIsModalOpen(false) 
    }

    return (
        <div>
            <Button onClick={() => setIsModalOpen(true)}>Abrir Modal</Button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Modal: Adicionar nova etapa"
                size="md"
            >
                
                <div className="grid grid-cols-2 gap-4">
                    
                    
                    <Input label="Nome da Etapa" placeholder="Ex: Montagem da Aviônica" />
                    <Input label="Prazo (Data)" type="date" />
                    
                    
                    <Input label="Funcionário Líder" placeholder="ID ou Nome" />
                    <Input label="Descrição Curta" />

                    
                    <div className="col-span-2 flex justify-end gap-3 mt-4">
                        
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSaveStage}>Salvar Etapa</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default MyStageModal