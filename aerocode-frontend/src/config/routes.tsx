import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Login from '../pages/Login' 
import UserManagement from '../pages/UserManagement'
import { useAuth } from '../context/AuthContext'
import Home from '../pages/Home'

const AppRoutes: React.FC = () => {
    const { isAuthenticated } = useAuth() 

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
                path="/" 
                element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />} 
            >
                <Route index element={<Home />} /> 
                <Route path="admin/users" element={<UserManagement />} />
                <Route path="aeronaves" element={<p>Página de Listagem de Aeronaves</p>} />
                <Route path="*" element={<Navigate to="/" replace />} />
                
            </Route>
        </Routes>
    )
}

export default AppRoutes