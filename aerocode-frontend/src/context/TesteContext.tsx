import React, { createContext, useContext, useState, type ReactNode } from 'react'
import type { Teste, ResultadoTeste, TipoTeste } from '../components/types/Teste'
import { mockTestesDB } from '../data/mockDatabase'


interface ITesteContext {
    testes: Teste[]
    getTesteById: (id: number) => Teste | undefined
    recordTestResult: (id: number, dataRealizacao: string, resultado: 'APROVADO' | 'REPROVADO', observacoes: string) => void
}

const TesteContext = createContext<ITesteContext | undefined>(undefined)

interface TesteProviderProps {
    children: ReactNode
}

export const TesteProvider: React.FC<TesteProviderProps> = ({ children }) => {
    const [testes, setTestes] = useState<Teste[]>(mockTestesDB)

    const getTesteById = (id: number): Teste | undefined => {
        return testes.find(t => t.id === id)
    }

    const recordTestResult = (
        id: number, 
        dataRealizacao: string, 
        resultado: 'APROVADO' | 'REPROVADO', 
        observacoes: string
    ) => {
        setTestes(prev => 
            prev.map(teste => 
                teste.id === id 
                ? { ...teste, resultado, dataRealizacao, observacoes, statusAtual: resultado }
                : teste
            )
        )
        console.log(`TesteContext: Resultado do Teste ${id} registrado.`)
    }

    
    return (
        <TesteContext.Provider value={{ testes, getTesteById, recordTestResult }}>
            {children}
        </TesteContext.Provider>
    )
}


export const useTestes = () => {
    const context = useContext(TesteContext)
    if (context === undefined) {
        throw new Error('useTestes deve ser usado dentro de um TesteProvider')
    }
    return context
}


export const RESULTADO_OPCOES = [
    { value: '', label: 'Todos os Resultados' },
    { value: 'PENDENTE', label: 'Pendente' },
    { value: 'APROVADO', label: 'Aprovado' },
    { value: 'REPROVADO', label: 'Reprovado' },
]

export const TIPO_TESTE_OPCOES = [
    { value: '', label: 'Todos os Tipos' },
    { value: 'ELÉTRICO', label: 'Elétrico' },
    { value: 'HIDRÁULICO', label: 'Hidráulico' },
    { value: 'ESTRUTURAL', label: 'Estrutural' },
    { value: 'DE VOO', label: 'De Voo' },
    { value: 'SOFTWARE', label: 'Software' },
]

export const RESULTADO_REGISTRO_OPCOES = [
    { value: '', label: 'Selecione o Resultado' },
    { value: 'APROVADO', label: 'APROVADO' },
    { value: 'REPROVADO', label: 'REPROVADO' },
]