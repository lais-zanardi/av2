import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/forms/Input'
import Select from '../../components/forms/Select'
import Button from '../../components/forms/Button'
import type { Funcionario, NivelPermissao } from '../../components/types/Funcionario'
import { FaUser, FaPhone, FaMapMarkerAlt, FaKey, FaSave, FaLock } from 'react-icons/fa'

const INITIAL_FORM_DATA: Partial<Funcionario> = {
    nome: '',
    telefone: '',
    endereco: '',
    usuario: '',
    nivel: 'OPERADOR',
}

const NIVEL_OPCOES = [
    { value: 'ADMINISTRADOR', label: 'ADMINISTRADOR' },
    { value: 'ENGENHEIRO', label: 'ENGENHEIRO' },
    { value: 'OPERADOR', label: 'OPERADOR' },
]

const UserCreateForm: React.FC = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<Partial<Funcionario>>(INITIAL_FORM_DATA)
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value as NivelPermissao | string,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (isSaving) return

        if (senha !== confirmarSenha) {
            setError("As senhas digitadas não são idênticas.")
            return
        }

        if (!formData.nome || !formData.usuario || !formData.nivel || !senha) {
            setError("Por favor, preencha todos os campos obrigatórios (Nome, Usuário, Nível e Senha).")
            return
        }

        setIsSaving(true)
        setError(null)
        
        const newUserPayload = {
            ...formData,
            senha: senha, 
            id: Math.random()*10, 
        }
        
        console.log("Tentativa de criar novo usuário:", newUserPayload)
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        setIsSaving(false)
        alert(`Novo funcionário '${formData.nome}' criado com sucesso! ID: ${newUserPayload.id}`)
        navigate('/admin/users') 
    }

    return (
        <div className="bg-white  mt-20 p-6 w-[75%] shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Criar Novo Funcionário</h2>
            {error && <p className="text-sm text-red-600 mb-4 p-3 bg-red-50 rounded">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2 mb-4 text-blue-700">1. Informações Cadastrais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Nome Completo" name="nome" type="text" value={formData.nome || ''} onChange={handleChange} Icon={FaUser} required />
                        <Input label="Telefone" name="telefone" type="tel" value={formData.telefone || ''} onChange={handleChange} Icon={FaPhone} />
                        <Input label="Endereço" name="endereco" type="text" value={formData.endereco || ''} onChange={handleChange} Icon={FaMapMarkerAlt} className="md:col-span-2" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2 mb-4 text-blue-700">2. Credenciais e Nível de Acesso</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        
                        
                        <Input label="Usuário (Login)" name="usuario" type="text" value={formData.usuario || ''} onChange={handleChange} Icon={FaUser} required />
                        <Input label="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} Icon={FaLock} required />
                        <Input label="Confirmar Senha" type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} Icon={FaLock} required />

                        <Select
                            label="Nível de Permissão"
                            name="nivel"
                            options={NIVEL_OPCOES}
                            value={formData.nivel || ''}
                            onChange={handleChange}
                            className="md:col-span-3"
                        />
                    </div>
                </div>

                <div className="flex justify-start gap-4 pt-4 border-t mt-8">
                    <Button type="submit" loading={isSaving} variant="primary">
                        <FaSave className="mr-2" />
                        Criar Funcionário
                    </Button>
                    
                    <Button type="button" variant="secondary" onClick={() => navigate('/admin/users')}>
                        Cancelar e Voltar
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UserCreateForm