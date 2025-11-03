import React, { createContext, useContext, useState, type ReactNode } from 'react'
import type { Aeronave } from '../components/types/TipoAeronave'
import { mockAeronavesDB } from '../data/mockDatabase'

interface IAeronaveContext {
    aeronaves: Aeronave[]
    getAeronaveByCodigo: (codigo: string) => Aeronave | undefined
    createAeronave: (data: Partial<Aeronave>) => void
    updateAeronave: (codigo: string, data: Partial<Aeronave>) => void
}


const AeronaveContext = createContext<IAeronaveContext | undefined>(undefined)


interface AeronaveProviderProps {
    children: ReactNode
}

export const AeronaveProvider: React.FC<AeronaveProviderProps> = ({ children }) => {
    const [aeronaves, setAeronaves] = useState<Aeronave[]>(mockAeronavesDB)


    const getAeronaveByCodigo = (codigo: string): Aeronave | undefined => {
        return aeronaves.find(a => a.codigo.toUpperCase() === codigo.toUpperCase())
    }


    const createAeronave = (data: Partial<Aeronave>) => {
        const codigoUpper = (data.codigo || '').toUpperCase()


        if (!codigoUpper || getAeronaveByCodigo(codigoUpper)) {
            throw new Error(`Código ${codigoUpper} já existe ou é inválido. Por favor, use outro código.`)
        }

        const newAeronave: Aeronave = {
            codigo: codigoUpper,
            modelo: data.modelo || 'Novo Modelo (Sem Modelo)',
            tipo: data.tipo || 'COMERCIAL',
            capacidade: data.capacidade || 1,
            status: data.status || 'Em Produção',
        }

        setAeronaves(prev => [...prev, newAeronave])
        console.log("AeronaveContext: Aeronave criada", newAeronave)
    }


    const updateAeronave = (codigo: string, data: Partial<Aeronave>) => {
        setAeronaves(prev =>
            prev.map(a =>
                a.codigo.toUpperCase() === codigo.toUpperCase() ? { ...a, ...data } : a
            )
        )
        console.log("AeronaveContext: Aeronave atualizada", codigo, data)
    }


    return (
        <AeronaveContext.Provider value={{ aeronaves, getAeronaveByCodigo, createAeronave, updateAeronave }}>
            {children}
        </AeronaveContext.Provider>
    )
}


export const useAeronaves = () => {
    const context = useContext(AeronaveContext)
    if (context === undefined) {
        throw new Error('useAeronaves deve ser usado dentro de um AeronaveProvider')
    }
    return context
}

export const TIPO_AERONAVE_OPCOES = [
    { value: 'COMERCIAL', label: 'Comercial' },
    { value: 'CARGA', label: 'Carga' },
    { value: 'MILITAR', label: 'Militar' },
]

export const STATUS_AERONAVE_OPCOES = [
    { value: 'Em Produção', label: 'Em Produção' },
    { value: 'Em Testes', label: 'Em Testes' },
    { value: 'Pronta', label: 'Pronta' },
    { value: 'Entregue', label: 'Entregue' },
    { value: 'Desativada', label: 'Desativada' },
]