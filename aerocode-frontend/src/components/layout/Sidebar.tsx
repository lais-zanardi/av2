import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaTimes, FaPlane, FaCogs, FaClipboardList, FaVial, FaFileAlt, FaUserShield, FaSignOutAlt } from 'react-icons/fa'


// Roles
type NivelPermissao = 'ADMINISTRADOR' | 'ENGENHEIRO' | 'OPERADOR'

interface User {
    id: number
    name: string
    nivelPermissao: NivelPermissao
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SidebarItem {
    name: string
    icon: React.ReactNode
    path: string
    minPermission: NivelPermissao
}

// SIMULAÇÃO: O contexto real viria de useAuth()
const mockUser: User = {
    id: 1,
    name: 'Gerson Penha',
    nivelPermissao: 'ADMINISTRADOR', // Troque aqui para testar diferentes permissões
}

const navigationItems: SidebarItem[] = [
    { name: 'Aeronaves', icon: <FaPlane />, path: '/aeronaves', minPermission: 'ENGENHEIRO' },
    { name: 'Peças', icon: <FaCogs />, path: '/pecas', minPermission: 'OPERADOR' },
    { name: 'Etapas Prod.', icon: <FaClipboardList />, path: '/etapas', minPermission: 'OPERADOR' },
    { name: 'Testes', icon: <FaVial />, path: '/testes', minPermission: 'ENGENHEIRO' },
    { name: 'Relatórios', icon: <FaFileAlt />, path: '/relatorios', minPermission: 'ENGENHEIRO' },
    { name: 'Administração', icon: <FaUserShield />, path: '/admin/users', minPermission: 'ADMINISTRADOR' },
]

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    // No projeto real: const { user } = useAuth()
    const user = mockUser
    const location = useLocation()

    const userCanAccess = (minPermission: NivelPermissao): boolean => {
        if (!user) return false
        
        const hierarchy = {
            'ADMINISTRADOR': 3,
            'ENGENHEIRO': 2,
            'OPERADOR': 1,
        }
        
        return hierarchy[user.nivelPermissao] >= hierarchy[minPermission]
    }

    const baseClasses = "fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-40 flex flex-col border-r border-gray-100 transition-transform duration-300 ease-in-out";
    const responsiveClasses = isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0";
    return (
        <>
        {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
                    aria-hidden="true"
                />
            )}
        <aside
           className={`${baseClasses} ${responsiveClasses} lg:translate-x-0 lg:shadow-xl`}
                aria-label="Barra Lateral de Navegação Principal da Aerocode"
            >
    
            {/* Topo da Sidebar: Logo e Botão Fechar (Mobile) */}
                <div className="p-4 border-b border-gray-100 h-20 flex items-center justify-between">
                    <span className="text-xl text-gray-800 font-mono font-bold">aerocode</span>
                    <button onClick={onClose} className="lg:hidden p-2 rounded-full hover:bg-gray-100">
                    </button>
                </div>

            {/* Links de Navegação */}
            <nav className="flex-grow p-2 space-y-1">
                {navigationItems.map((item) => {
                    if (!userCanAccess(item.minPermission)) return null

                    const isActive = location.pathname === item.path

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center p-3 text-sm font-medium rounded transition-colors duration-150
                                ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`}
                        >
                            <span className="mr-3 text-lg">{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Base da Sidebar: Informações e Logout */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center p-2 text-sm text-gray-500">
                    <span className="w-8 h-8 rounded-full bg-gray-100 mr-3 flex items-center justify-center text-gray-800 font-semibold">
                        {user.name[0]}
                    </span>
                    <div>
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.nivelPermissao}</p>
                    </div>
                </div>
               <button
                    onClick={() => console.log('Logout action')}
                    className="w-full mt-2 p-2 text-sm text-center text-red-600 hover:bg-red-50 rounded flex items-center justify-center gap-2 transition-colors"
                >
                    <FaSignOutAlt className="text-red-600" />
                    Logout
                </button>
            </div>
        </aside>
        </>
    )
}
export default Sidebar