// centraliza a lógica de login e logout
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type NivelPermissao = 'ADMINISTRADOR' | 'ENGENHEIRO' | 'OPERADOR'

interface User {
    id: number
    name: string
    nivelPermissao: NivelPermissao
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (usuario: string, senha: string) => Promise<void>
    logout: () => void
}

// Criação do Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider de Autenticação
interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const isAuthenticated = user !== null
    const navigate = useNavigate()

    // Lógica SIMULADA de Login
    const login = async (usuario: string, senha: string) => {
        await new Promise(resolve => setTimeout(resolve, 500))
        if (usuario === 'admin' && senha === '123') {
            const mockUser: User = {
                id: 1,
                name: 'Adm. Global',
                nivelPermissao: 'ADMINISTRADOR'
            }
            setUser(mockUser)
            navigate('/', { replace: true })
        } else if (usuario === 'engenheiro' && senha === '123') {
            const mockUser: User = {
                id: 2,
                name: 'Eng. Chefe',
                nivelPermissao: 'ENGENHEIRO'
            }
            setUser(mockUser)
            navigate('/', { replace: true })
        } else if (usuario === 'operador' && senha === '123') {
            const mockUser: User = {
                id: 3,
                name: 'Op. Produção',
                nivelPermissao: 'OPERADOR'
            }
            setUser(mockUser)
            navigate('/', { replace: true })
        } else {
            throw new Error("Usuário ou senha inválidos.")
        }
    }

    const logout = () => {
        setUser(null)
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }
    return context
}