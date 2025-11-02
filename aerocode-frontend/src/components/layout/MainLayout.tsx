import React, { useState, useMemo, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import getBreadcrumbs from '../../utils/navigation'


const MainLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const location = useLocation()

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev)
    }, [])

    const MenuIcon = isSidebarOpen ? FaTimes : FaBars
    const buttonOffsetClass = isSidebarOpen ? 'left-64' : 'left-4'
    const { breadcrumbs, pageTitle } = useMemo(() => {
        const bcs = getBreadcrumbs(location.pathname)
        const title = bcs.length > 1 ? bcs[bcs.length - 1].label : "Home"
        return { breadcrumbs: bcs, pageTitle: title }
    }, [location.pathname])


    return (
        <div className="flex min-h-screen bg-gray-50">

            {/*Sidebar*/}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={toggleSidebar}
            />

            {/*Área Principal de Conteúdo*/}
            <div className="flex-1 lg:ml-64 transition-all duration-300">
                <button
                    className={`fixed ${buttonOffsetClass} top-4 p-3 lg:hidden z-50 transition-all duration-300 bg-white shadow rounded-lg`}
                    onClick={toggleSidebar}
                >
                    <MenuIcon />
                </button>
                <div className="mt-16 lg:mt-0">
                    <Header
                        pageTitle={pageTitle}
                        breadcrumbs={breadcrumbs}
                    />

                    <main className="p-8 pb-16"> 
                        <Outlet /> 
                    </main>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout