// src/components/layout/Sidebar.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlane, FaCogs, FaClipboardList, FaVial, FaFileAlt, FaUserShield } from 'react-icons/fa'

// Roles
type NivelPermissao = 'ADMINISTRADOR' | 'ENGENHEIRO' | 'OPERADOR'

// Definição da interface do usuário 
interface User {
    id: number
    name: string
    nivelPermissao: NivelPermissao
}

// Interface para os itens da Sidebar
interface SidebarItem {
    name: string
    icon: React.ReactNode // Usamos ReactNode para ícones (poderia ser SVG ou componente)
    path: string
    minPermission: NivelPermissao
}

// SIMULAÇÃO: O contexto real viria de useAuth()
const mockUser: User = {
    id: 1,
    name: 'Gerson Penha',
    nivelPermissao: 'ENGENHEIRO', // Troque aqui para testar diferentes permissões
}


// ----------------------------------------------------------------------
// 1. Definição dos Itens de Navegação (Baseado no Plano de Módulos)
// ----------------------------------------------------------------------

const navigationItems: SidebarItem[] = [
    { name: 'Aeronaves', icon: <FaPlane />, path: '/aeronaves', minPermission: 'ENGENHEIRO' },
    { name: 'Peças', icon: <FaCogs />, path: '/pecas', minPermission: 'OPERADOR' },
    { name: 'Etapas Prod.', icon: <FaClipboardList />, path: '/etapas', minPermission: 'OPERADOR' },
    { name: 'Testes', icon: <FaVial />, path: '/testes', minPermission: 'ENGENHEIRO' },
    { name: 'Relatórios', icon: <FaFileAlt />, path: '/relatorios', minPermission: 'ENGENHEIRO' },
    { name: 'Administração', icon: <FaUserShield />, path: '/admin/users', minPermission: 'ADMINISTRADOR' },
]


// ----------------------------------------------------------------------
// 2. Componente Principal Sidebar
// ----------------------------------------------------------------------

const Sidebar: React.FC = () => {
    // No projeto real: const { user } = useAuth()
    const user = mockUser

    const userCanAccess = (minPermission: NivelPermissao): boolean => {
        console.log('Sidebar renderizada');
        if (!user) return false
        
        const hierarchy = {
            'ADMINISTRADOR': 3,
            'ENGENHEIRO': 2,
            'OPERADOR': 1,
        }
        
        return hierarchy[user.nivelPermissao] >= hierarchy[minPermission]
    }
    
    return (
        <aside 
        className="bg-red-500 p-10 text-white"
        aria-label="Barra Lateral de Navegação Principal da Aerocode"
        >aqui é a sidebar
            
            {/* Topo da Sidebar: Logo */}
            <div className="p-4 border-b border-info/30 h-20 flex items-center justify-center bg-primary/5">
                <span className="text-xl font-bold text-primary">AEROCODE</span> 
            </div>

            {/* Links de Navegação */}
            <nav className="flex-grow p-2 space-y-1">
                {navigationItems.map((item) => {
                    if (!userCanAccess(item.minPermission)) return null
                    
                    return (
                        <Link 
                        key={item.name}
                        to={item.path}
                        className="flex items-center p-3 text-sm font-medium text-info hover:bg-accent/10 hover:text-primary rounded-lg transition-colors duration-150"
                        >
                            {/* O ÍCONE AGORA É RENDERIZADO COMO UM COMPONENTE */}
                            <span className="mr-3 text-lg">{item.icon}</span> 
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Base da Sidebar: Informações e Logout */}
            <div className="p-4 border-t border-info/30">
                <div className="flex items-center p-2 text-sm text-info/70">
                    <span className="w-8 h-8 rounded-full bg-primary/20 mr-3 flex items-center justify-center text-primary font-semibold">
                        {user.name[0]}
                    </span>
                    <div>
                        <p className="font-semibold text-primary">{user.name}</p>
                        <p className="text-xs text-info/90">{user.nivelPermissao}</p>
                    </div>
                </div>
                <button 
                    onClick={() => console.log('Logout action')}
                    className="w-full mt-2 p-2 text-sm text-center text-danger hover:bg-danger/10 rounded-lg transition-colors"
                    >
                    Sair / Logout
                </button>
            </div>
        </aside>
    )
}

export default Sidebar