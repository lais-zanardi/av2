import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaTimes, FaPlane, FaCogs, FaClipboardList, FaVial, FaFileAlt, FaUserShield, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

// Roles
type NivelPermissao = 'ADMINISTRADOR' | 'ENGENHEIRO' | 'OPERADOR'

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

const navigationItems: SidebarItem[] = [
    { name: 'Administração', icon: <FaUserShield />, path: '/admin/users', minPermission: 'ADMINISTRADOR' },
    { name: 'Aeronaves', icon: <FaPlane />, path: '/aeronaves', minPermission: 'OPERADOR' },
    { name: 'Etapas de Produção', icon: <FaClipboardList />, path: '/etapas', minPermission: 'OPERADOR' },
    { name: 'Peças', icon: <FaCogs />, path: '/pecas', minPermission: 'OPERADOR' },
    { name: 'Relatórios', icon: <FaFileAlt />, path: '/relatorios', minPermission: 'ENGENHEIRO' },
    { name: 'Testes', icon: <FaVial />, path: '/testes', minPermission: 'ENGENHEIRO' },
]

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();
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
                <Link to='/' className="pl-3 gap-x-5 border-b border-gray-100 h-20 flex items-center justify-between">
                    <span className="text-xl text-gray-800 font-mono font-bold">aerocode</span>
                    <img
                        src="src/assets/img-aerocode.png"
                        alt="logotipo Aerocode"
                        className="w-full h-full object-fit"
                    />
                    <button onClick={onClose} className="hidden p-2 hover:bg-gray-100">
                    </button>
                </Link>

                {/* Links de Navegação */}
                <nav className="flex-grow p-2 space-y-1">
                    {navigationItems.map((item) => {
                        if (!userCanAccess(item.minPermission)) return null

                        const isActive = location.pathname === item.path

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center p-3 text-sm font-medium transition-colors duration-150
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
                        <span className="w-8 h-8 bg-gray-100 mr-3 flex items-center justify-center text-gray-800 font-semibold">
                            {user.name[0]}
                        </span>
                        <div>
                            <p className="font-semibold text-gray-800">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.nivelPermissao}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full mt-2 p-2 text-sm text-center text-red-600 hover:bg-red-50 flex items-center justify-center gap-2 transition-colors"
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