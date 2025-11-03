import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Funcionario } from '../components/types/Funcionario';
import { mockFuncionariosDB } from '../data/mockDatabase'; 

interface IFuncionarioContext {
    funcionarios: Funcionario[];
    getFuncionarioById: (id: number) => Funcionario | undefined;
    createFuncionario: (data: Partial<Funcionario>) => void;
    updateFuncionario: (id: number, data: Partial<Funcionario>) => void;
}

const FuncionarioContext = createContext<IFuncionarioContext | undefined>(undefined);

interface FuncionarioProviderProps {
    children: ReactNode;
}

export const FuncionarioProvider: React.FC<FuncionarioProviderProps> = ({ children }) => {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>(mockFuncionariosDB);
    const getFuncionarioById = (id: number): Funcionario | undefined => {
        return funcionarios.find(f => f.id === id);
    };

    
    const createFuncionario = (data: Partial<Funcionario>) => {
        const newFuncionario: Funcionario = {
            id: Math.max(...funcionarios.map(f => f.id)) + 1, 
            nome: data.nome || '',
            nivel: data.nivel || 'OPERADOR',
            telefone: data.telefone || '',
            endereco: data.endereco || '',
            usuario: data.usuario || '',
        };

        setFuncionarios(prev => [...prev, newFuncionario]);
        console.log("FuncionarioContext: Usuário criado", newFuncionario);
    };

    
    const updateFuncionario = (id: number, data: Partial<Funcionario>) => {
        setFuncionarios(prev => 
            prev.map(f => 
                f.id === id ? { ...f, ...data } : f 
            )
        );
        console.log("FuncionarioContext: Usuário atualizado", id, data);
    };

    
    return (
        <FuncionarioContext.Provider value={{ funcionarios, getFuncionarioById, createFuncionario, updateFuncionario }}>
            {children}
        </FuncionarioContext.Provider>
    );
};


export const useFuncionarios = () => {
    const context = useContext(FuncionarioContext);
    if (context === undefined) {
        throw new Error('useFuncionarios deve ser usado dentro de um FuncionarioProvider');
    }
    return context;
};