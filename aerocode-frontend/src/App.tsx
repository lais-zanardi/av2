import { useState } from 'react'
import './App.css'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import { FaBars } from 'react-icons/fa'
import Footer from './components/layout/Footer'

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  const sidebarOffsetClass = isSidebarOpen ? 'left-54' : 'left-4';
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 lg:ml-64 transition-all duration-300">
        <div className="mt-16 lg:mt-0">
          <button
            className={`fixed ${sidebarOffsetClass} top-4 p-3 lg:hidden z-50 transition-all duration-300`}
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
          <Header pageTitle="Página de Exemplo" breadcrumbs={[
            { label: 'Home', path: '/' },
            { label: 'Aqui', path: '/' }
            ]} />

          {/* Conteúdo da Rota */}
          <main className="p-8">
            {/* <Outlet /> ou o conteúdo da sua rota */}
            <p>Conteúdo da aplicação</p>
          </main>
        </div>
      
      </div>
      < Footer/>
    </div>
  );
};