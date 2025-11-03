import React from 'react'
import { FaCalendarAlt, FaHandsHelping } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext' 

const Home: React.FC = () => {
    const { user } = useAuth() 
    const fullDate = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    })

    return (
        <div className="p-8 bg-white shadow mt-10">
            
            {/* Mensagem de Boas-Vindas */}
            <div className="flex gap-4 border-b pb-4 mb-6">
                <FaHandsHelping className="text-4xl text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-800">
                    Bem-vindo(a), {user?.name || 'Usuário'}!
                </h1>
            </div>
            
            {/* Data Completa */}
            <div className="flex items-center gap-3 text-gray-600">
                <FaCalendarAlt className="text-xl text-gray-500" />
                <p className="text-lg">
                    Hoje é: <span className="font-semibold text-gray-700 capitalize">{fullDate}</span>
                </p>
            </div>
            
            <p className="mt-4 text-gray-500">
                Utilize a barra lateral para navegar pelos módulos de Gestão de Produção e Qualidade.
            </p>

        </div>
    )
}

export default Home