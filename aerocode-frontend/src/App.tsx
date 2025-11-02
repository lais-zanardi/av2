import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Login from './pages/Login'
import UserManagement from './pages/admin/UserManagement'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import UserUpdateForm from './pages/admin/UserUpdateForm'
import UserCreateForm from './pages/admin/UserCreateForm'
import AeronaveManagement from './pages/AeronaveManagement'
import AeronaveCreateForm from './pages/AeronaveCreateForm'
import AeronaveUpdateForm from './pages/AeronaveUpdateForm'
import AeronaveDetails from './pages/AeronaveDetails'
import EtapaDetails from './pages/EtapaDetails'
import Etapas from './pages/Etapas'
import PecaManagement from './pages/PecaManagement'
import PecaCreateForm from './pages/PecaCreateForm'
import TestManagement from './pages/TesteManagement'
import TestRecordForm from './pages/TesteRecordForm'
import RelatorioManagement from './pages/RelatorioManagement'

const App: React.FC = () => {
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
               <Route path="admin/users/new" element={<UserCreateForm />}/>
               <Route path="admin/users/edit/:funcionarioId" element={<UserUpdateForm />}/>
                <Route path="aeronaves" element={<AeronaveManagement />} />
                <Route path="aeronaves/new" element={<AeronaveCreateForm />} />
                <Route path="/aeronave/edit/:codigo" element={<AeronaveUpdateForm />} />
                <Route path="/aeronaves/details/:codigo" element={<AeronaveDetails />} />
                <Route path="/etapas" element={<Etapas />} />
                <Route path="/etapas/:etapaId" element={<EtapaDetails />} />
                <Route path="/pecas" element={<PecaManagement />} />
                <Route path="/pecas/new" element={<PecaCreateForm />} />
                <Route path="/pecas/edit/:id" element={<PecaCreateForm />} />
               <Route path="/testes" element={<TestManagement />}/>
               <Route path="/testes/record/:id" element={<TestRecordForm />}/>
               <Route path="/relatorios" element={<RelatorioManagement />}/>
                <Route path="*" element={<Navigate to="/" replace />} />
                
            </Route>
        </Routes>
    )
}

export default App