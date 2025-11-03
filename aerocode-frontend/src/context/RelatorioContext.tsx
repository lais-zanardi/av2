import React, { createContext, useContext, useState, type ReactNode } from 'react'
import type { Relatorio, TipoRelatorio, StatusRelatorio, RelatorioFormData } from '../components/types/Relatorio'
import { mockPecasDB, mockRelatoriosDB } from '../data/mockDatabase'
import { useAuth } from './AuthContext' 

interface IRelatorioContext {
    relatorios: Relatorio[]
    getRelatorioById: (id: number) => Relatorio | undefined
    generateRelatorio: (data: RelatorioFormData) => void
    updateRelatorioStatus: (id: number, status: StatusRelatorio, linkDownload?: string) => void
    deleteRelatorio: (id: number) => void
}


const RelatorioContext = createContext<IRelatorioContext | undefined>(undefined)


interface RelatorioProviderProps {
    children: ReactNode
}

export const RelatorioProvider: React.FC<RelatorioProviderProps> = ({ children }) => {
    const [relatorios, setRelatorios] = useState<Relatorio[]>(mockRelatoriosDB)
    const [setPecas] = useState<Pecas[]>(mockPecasDB)
    const { user } = useAuth()

    const getRelatorioById = (id: number): Relatorio | undefined => {
        return relatorios.find(r => r.id === id)
    }

    const generateRelatorio = (formData: RelatorioFormData) => {
        const newRelatorio: Relatorio = {
            id: Math.max(...relatorios.map(r => r.id), 0) + 1,
            nome: formData.nome,
            tipo: formData.tipo as TipoRelatorio,
            dataGeracao: new Date().toISOString().split('T')[0],
            geradoPor: user?.nome || 'Usuário Desconhecido', 
            status: 'PENDENTE', 
            parametros: formData.parametros,
        }

        setPecas(prev => [...prev, newRelatorio])
        console.log("RelatorioContext: Novo relatório gerado", newRelatorio)

        
        setTimeout(() => {
            setPecas(prev => 
                prev.map(r => 
                    r.id === newRelatorio.id
                    ? { 
                        ...r, 
                        status: 'GERADO', 
                        linkDownload: `/downloads/${r.tipo.toLowerCase()}_${r.id}_${new Date().getTime()}.pdf` 
                      }
                    : r
                )
            )
            console.log(`RelatorioContext: Relatório ${newRelatorio.id} processado para GERADO.`)
        }, 3000) 
    }

    const updateRelatorioStatus = (id: number, status: StatusRelatorio, linkDownload?: string) => {
        setPecas(prev => 
            prev.map(relatorio => 
                relatorio.id === id 
                ? { ...relatorio, status, linkDownload: linkDownload || relatorio.linkDownload } 
                : relatorio
            )
        )
        console.log(`RelatorioContext: Status do relatório ${id} atualizado para ${status}.`)
    }

    const deleteRelatorio = (id: number) => {
        setPecas(prev => prev.filter(relatorio => relatorio.id !== id))
        console.log(`RelatorioContext: Relatório ${id} deletado.`)
    }

    return (
        <RelatorioContext.Provider value={{ relatorios, getRelatorioById, generateRelatorio, updateRelatorioStatus, deleteRelatorio }}>
            {children}
        </RelatorioContext.Provider>
    )
}

export const useRelatorios = () => {
    const context = useContext(RelatorioContext)
    if (context === undefined) {
        throw new Error('useRelatorios deve ser usado dentro de um RelatorioProvider')
    }
    return context
}


export const TIPO_RELATORIO_OPCOES = [
    { value: '', label: 'Todos os Tipos' },
    { value: 'PRODUCAO_GERAL', label: 'Produção Geral' },
    { value: 'POR_AERONAVE', label: 'Por Aeronave' },
    { value: 'PECA_LOGISTICA', label: 'Logística de Peças' },
    { value: 'TESTES_QUALIDADE', label: 'Testes de Qualidade' },
    { value: 'MANUTENCAO', label: 'Manutenção' },
]

export const STATUS_RELATORIO_OPCOES = [
    { value: '', label: 'Todos os Status' },
    { value: 'GERADO', label: 'Gerado' },
    { value: 'PENDENTE', label: 'Pendente' },
    { value: 'ERRO', label: 'Erro' },
]