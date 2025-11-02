import React, { useState, useMemo } from 'react';
import Modal from '../ui/Modal';
import Input from '../forms/Input';
import Select from '../forms/Select';
import Button from '../forms/Button';
import GenericTable, { type TableColumn } from '../ui/GenericTable';
import { FaSave, FaTimes, FaSearch, FaFileAlt, FaPlane } from 'react-icons/fa';


type TipoRelatorioModal = 'PRODUCAO_GERAL' | 'POR_AERONAVE' | 'PECA_LOGISTICA' | 'TESTES_QUALIDADE';

interface AeronaveParaSelecao {
    id: number;
    codigo: string;
    modelo: string;
}


const mockAeronaves: AeronaveParaSelecao[] = [
    { id: 1, codigo: 'E-175', modelo: 'EMB-175' },
    { id: 2, codigo: 'A-350', modelo: 'Airbus A350' },
    { id: 3, codigo: 'F-35', modelo: 'Lockheed F-35' },
];

const TIPO_RELATORIO_OPCOES = [
    { value: '', label: 'Selecione o Tipo de Relatório' },
    { value: 'PRODUCAO_GERAL', label: 'Relatório de Produção Geral' },
    { value: 'POR_AERONAVE', label: 'Relatório Detalhado por Aeronave' },
    { value: 'PECA_LOGISTICA', label: 'Relatório de Logística de Peças' },
    { value: 'TESTES_QUALIDADE', label: 'Relatório de Testes de Qualidade' },
];

interface GenerateReportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GenerateReportModal: React.FC<GenerateReportModalProps> = ({ isOpen, onClose }) => {
    
    const [selectedAeronave, setSelectedAeronave] = useState<AeronaveParaSelecao | null>(null);
    const [reportType, setReportType] = useState<TipoRelatorioModal | ''>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const filteredAeronaves = useMemo(() => {
        return mockAeronaves.filter(a => 
            a.codigo.toLowerCase().includes(searchTerm.toLowerCase()) || 
            a.modelo.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);


    const columns: TableColumn<AeronaveParaSelecao>[] = useMemo(() => [
        { 
            key: 'selection', 
            header: '', 
            render: (item) => (
                <input 
                    type="radio"
                    name="selectAeronave" 
                    checked={selectedAeronave?.id === item.id}
                    onChange={() => setSelectedAeronave(item)}
                    className="h-4 w-4 text-blue-600 rounded"
                />
            )
        },
        { key: 'codigo', header: 'Código', sortable: true },
        { key: 'modelo', header: 'Modelo', sortable: true },
    ], [selectedAeronave]);


    const handleGenerateReport = async () => {
        setError(null);
        if (!reportType) {
            setError("Por favor, selecione um tipo de relatório.");
            return;
        }
        if (reportType === 'POR_AERONAVE' || reportType === 'PECA_LOGISTICA' || reportType === 'TESTES_QUALIDADE') {
            if (!selectedAeronave) {
                setError("Por favor, selecione uma aeronave para este tipo de relatório.");
                return;
            }
        }

        setIsGenerating(true);
        console.log("Gerando relatório:", { 
            tipo: reportType, 
            aeronave: selectedAeronave ? selectedAeronave.codigo : 'N/A' 
        });


        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsGenerating(false);
        alert(`Relatório de ${reportType} ${selectedAeronave ? 'para ' + selectedAeronave.codigo : ''} gerado com sucesso (simulação)!`);
        
        onClose(); 
    };

 
    React.useEffect(() => {
        if (!isOpen) {
            setSelectedAeronave(null);
            setReportType('');
            setSearchTerm('');
            setError(null);
        }
    }, [isOpen]);

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Gerar Novo Relatório Final"
            size="2xl" 
        >
            <div className="space-y-6">
                
                {error && <p className="text-sm text-red-600 mb-4 p-3 bg-red-50 rounded">{error}</p>}

              
                <Select
                    label="Tipo de Relatório a Gerar"
                    name="reportType"
                    options={TIPO_RELATORIO_OPCOES}
                    value={reportType}
                    onChange={(e) => {
                        setReportType(e.target.value as TipoRelatorioModal);
                     
                        if (e.target.value === 'PRODUCAO_GERAL') {
                            setSelectedAeronave(null);
                        }
                    }}
                    required
                    Icon={FaFileAlt}
                />

           
                {(reportType === 'POR_AERONAVE' || reportType === 'PECA_LOGISTICA' || reportType === 'TESTES_QUALIDADE') && (
                    <div className="border p-4 rounded-lg bg-gray-50 space-y-4">
                        <h4 className="text-lg font-medium text-gray-700 flex items-center gap-2"><FaPlane /> Selecione a Aeronave</h4>
                        
                        <Input 
                            label="Buscar Aeronave"
                            placeholder="Código ou Modelo da Aeronave"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            Icon={FaSearch}
                        />
                        
                        <GenericTable 
                            data={filteredAeronaves} 
                            columns={columns} 
                         
                            onRowSelect={(aeronave) => setSelectedAeronave(aeronave)}
                      
                            getRowClassName={(item) => selectedAeronave?.id === item.id ? 'bg-blue-50' : ''}
                        />
                        
                        {selectedAeronave && (
                            <p className="text-sm text-gray-600">Aeronave Selecionada: <span className="font-semibold text-blue-600">{selectedAeronave.codigo} - {selectedAeronave.modelo}</span></p>
                        )}
                    </div>
                )}
                
           
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        <FaTimes className="mr-2" /> Cancelar
                    </Button>
                    <Button 
                        onClick={handleGenerateReport} 
                        variant="primary" 
                        loading={isGenerating}
                        disabled={!reportType || (['POR_AERONAVE', 'PECA_LOGISTICA', 'TESTES_QUALIDADE'].includes(reportType) && !selectedAeronave)}
                    >
                        <FaSave className="mr-2" /> Gerar Relatório
                    </Button>
                </div>
            </div>
        </Modal>
    );
};