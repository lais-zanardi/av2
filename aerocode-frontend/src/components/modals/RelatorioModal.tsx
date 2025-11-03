import React, { useState, useMemo } from 'react'
import Modal from '../ui/Modal'
import Input from '../forms/Input'
import Select from '../forms/Select'
import Button from '../forms/Button'
import { FaSave, FaTimes, FaSearch, FaFileAlt, FaPlane } from 'react-icons/fa'
import type { TipoRelatorio, RelatorioFormData } from '../types/Relatorio'
import { useRelatorios, TIPO_RELATORIO_OPCOES } from '../../context/RelatorioContext'
import { useAeronaves } from '../../context/AeronaveContext' 

interface GenerateReportModalProps {
    isOpen: boolean
    onClose: () => void
}

export const GenerateReportModal: React.FC<GenerateReportModalProps> = ({ isOpen, onClose }) => {
    const { generateRelatorio } = useRelatorios()
    const { aeronaves } = useAeronaves()
    const [formData, setFormData] = useState<RelatorioFormData>({
        nome: '',
        tipo: '',
        parametros: {},
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleParamChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            parametros: {
                ...prev.parametros,
                [name]: value,
            },
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.nome || !formData.tipo) {
            alert('Por favor, preencha o nome e o tipo do relatório.')
            return
        }
        generateRelatorio(formData) 
        onClose()
        setFormData({ nome: '', tipo: '', parametros: {} }) 
    }

    const isAeronaveSpecific = formData.tipo === 'POR_AERONAVE' || formData.tipo === 'TESTES_QUALIDADE' || formData.tipo === 'MANUTENCAO'

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Gerar Novo Relatório"
            size="md"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Nome do Relatório"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                />
                <Select
                    label="Tipo de Relatório"
                    name="tipo"
                    options={TIPO_RELATORIO_OPCOES.filter(opt => opt.value !== '')} 
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                />

                {isAeronaveSpecific && (
                    <Select
                        label="Selecionar Aeronave"
                        name="aeronaveCodigo"
                        options={[
                            { value: '', label: 'Selecione uma Aeronave' },
                            ...aeronaves.map(a => ({ value: a.codigo, label: `${a.codigo} - ${a.modelo}` }))
                        ]}
                        value={formData.parametros?.aeronaveCodigo || ''}
                        onChange={(e) => handleParamChange('aeronaveCodigo', e.target.value)}
                        required
                    />
                )}
                {formData.tipo === 'PRODUCAO_GERAL' && (
                    <Input
                        label="Mês/Ano (MM/YYYY)"
                        name="periodo"
                        value={formData.parametros?.periodo || ''}
                        onChange={(e) => handleParamChange('periodo', e.target.value)}
                        placeholder="07/2024"
                    />
                )}

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button type="button" variant="secondary" onClick={onClose}>
                        <FaTimes className="mr-2" /> Cancelar
                    </Button>
                    <Button type="submit" variant="primary">
                        <FaFileAlt className="mr-2" /> Gerar Relatório
                    </Button>
                </div>
            </form>
        </Modal>
    )
}