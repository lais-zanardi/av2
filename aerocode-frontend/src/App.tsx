import './App.css'
import Login from './pages/Login'
import { useAuth } from './context/AuthContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'

export default function App() {
  const { isAuthenticated } = useAuth()
  return (
   <Routes>
      
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}>
                {/*adicionar rotas filhas aqui*/}
            </Route>
        </Routes>
  )
}