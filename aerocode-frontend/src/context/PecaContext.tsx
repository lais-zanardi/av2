import React, { createContext, useContext, useState, type ReactNode } from 'react'
import type { Peca, StatusPeca, TipoPeca, PecaFormData } from '../components/types/Peca'
import { mockPecasDB } from '../data/mockDatabase' 


interface IPecaContext {
    pecas: Peca[]
    getPecaById: (id: number) => Peca | undefined
    addPeca: (peca: PecaFormData) => void
    updatePeca: (id: number, updatedPeca: Partial<PecaFormData>) => void
    deletePeca: (id: number) => void
}


const PecaContext = createContext<IPecaContext | undefined>(undefined)


interface PecaProviderProps {
    children: ReactNode
}

export const PecaProvider: React.FC<PecaProviderProps> = ({ children }) => {
    const [pecas, setPecas] = useState<Peca[]>(mockPecasDB)

    const getPecaById = (id: number): Peca | undefined => {
        return pecas.find(p => p.id === id)
    }

    const addPeca = (pecaData: PecaFormData) => {
        const newPeca: Peca = {
            id: Math.max(...pecas.map(p => p.id), 0) + 1, 
            ...pecaData,
            status: pecaData.status as StatusPeca,
            tipo: pecaData.tipo as TipoPeca, 
            dataEntrada: pecaData.dataEntrada || new Date().toISOString().split('T')[0],
            dataUltimaAtualizacao: new Date().toISOString().split('T')[0],
            aeronaveAssociada: pecaData.aeronaveAssociada || undefined,
        }
        setPecas(prev => [...prev, newPeca])
        console.log("PecaContext: Peça adicionada", newPeca)
    }

    const updatePeca = (id: number, updatedData: Partial<PecaFormData>) => {
        setPecas(prev => 
            prev.map(peca => 
                peca.id === id 
                ? { 
                    ...peca, 
                    ...updatedData, 
                    dataUltimaAtualizacao: new Date().toISOString().split('T')[0],
                    status: updatedData.status as StatusPeca || peca.status,
                    tipo: updatedData.tipo as TipoPeca || peca.tipo,
                } 
                : peca
            )
        )
        console.log(`PecaContext: Peça ${id} atualizada.`)
    }

    const deletePeca = (id: number) => {
        setPecas(prev => prev.filter(peca => peca.id !== id))
        console.log(`PecaContext: Peça ${id} deletada.`)
    }


    return (
        <PecaContext.Provider value={{ pecas, getPecaById, addPeca, updatePeca, deletePeca }}>
            {children}
        </PecaContext.Provider>
    )
}


export const usePecas = () => {
    const context = useContext(PecaContext)
    if (context === undefined) {
        throw new Error('usePecas deve ser usado dentro de um PecaProvider')
    }
    return context
}


export const STATUS_PECA_OPCOES = [
    { value: '', label: 'Todos os Status' },
    { value: 'EM ESTOQUE', label: 'Em Estoque' },
    { value: 'EM USO', label: 'Em Uso' },
    { value: 'EM MANUTENÇÃO', label: 'Em Manutenção' },
    { value: 'DESCARTADA', label: 'Descartada' },
    { value: 'REPARO', label: 'Em Reparo' },
]

export const TIPO_PECA_OPCOES = [
    { value: '', label: 'Todos os Tipos' },
    { value: 'MOTOR', label: 'Motor' },
    { value: 'ASA', label: 'Asa' },
    { value: 'AVIONICA', label: 'Aviônica' },
    { value: 'FUSELAGEM', label: 'Fuselagem' },
    { value: 'TREM DE POUSO', label: 'Trem de Pouso' },
    { value: 'OUTROS', label: 'Outros' },
]