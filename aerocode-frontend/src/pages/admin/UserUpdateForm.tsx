import React, { useState, useEffect } from 'react'
import Input from '../../components/forms/Input'
import Select from '../../components/forms/Select'
import Button from '../../components/forms/Button'
import { FaUser, FaPhone, FaMapMarkerAlt, FaKey, FaSave } from 'react-icons/fa'
import type { Funcionario } from '../../components/types/Funcionario'
import { useParams, useNavigate } from 'react-router-dom'
import { useFuncionarios } from '../../context/FuncionarioContext'

const NIVEL_OPCOES = [
    { value: 'ADMINISTRADOR', label: 'ADMINISTRADOR' },
    { value: 'ENGENHEIRO', label: 'ENGENHEIRO' },
    { value: 'OPERADOR', label: 'OPERADOR' },
]

const UserUpdateForm: React.FC = () => {
    const params = useParams()
    const funcionarioIdParam = params.funcionarioId 
    const id = funcionarioIdParam ? parseInt(funcionarioIdParam, 10) : null
    const [originalFuncionario, setOriginalFuncionario] = useState<Funcionario | null>(null)
    const [formData, setFormData] = useState<Partial<Funcionario>>({})
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { getFuncionarioById, updateFuncionario } = useFuncionarios()

    useEffect(() => {
        if (!id) {
            setLoading(false)
            setError("ID de funcionário inválido na URL.")
            return
        }

        setLoading(true)
        setError(null)
        const fetchedData = getFuncionarioById(id)
        
        if (fetchedData) {
            setOriginalFuncionario(fetchedData)
            setFormData(fetchedData) // pré-preenche o formulário
        } else {
            setError(`Funcionário com ID ${id} não encontrado.`)
        }

        setLoading(false)
    }, [id, getFuncionarioById])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }


    // handler de submissão form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!originalFuncionario || isSaving) return
        setIsSaving(true)
        setError(null)
        console.log("Tentativa de salvar dados:", formData)
        
       try {
            updateFuncionario(id, formData) 

            setIsSaving(false)
            alert(`Funcionário ${originalFuncionario.nome} atualizado com sucesso!`)
            navigate('/admin/users')

        } catch (err: any) {
            setIsSaving(false)
            setError(err.message || "Erro ao atualizar usuário.")
        }
    }


    return (
        <div className="bg-white mt-20 p-6 w-[75%] shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Editar Funcionário: {originalFuncionario?.nome}</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2 mb-4 text-blue-700">1. Informações Cadastrais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="ID"
                            type="text"
                            value={String(originalFuncionario?.id)}
                            disabled={true}
                            Icon={FaKey}
                        />

                        <Input
                            label="Nome Completo"
                            name="nome"
                            type="text"
                            value={formData.nome || ''}
                            onChange={handleChange}
                            Icon={FaUser}
                        />

                        <Input
                            label="Telefone"
                            name="telefone"
                            type="tel"
                            value={formData.telefone || ''}
                            onChange={handleChange}
                            Icon={FaPhone}
                        />

                        <Input
                            label="Endereço"
                            name="endereco"
                            type="text"
                            value={formData.endereco || ''}
                            onChange={handleChange}
                            Icon={FaMapMarkerAlt}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b pb-2 mb-4 text-blue-700">2. Nível de Acesso</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <Input
                            label="Usuário (Login)"
                            type="text"
                            value={originalFuncionario?.usuario || ''}
                            disabled={true}
                        />

                        <Select
                            label="Nível de Permissão"
                            name="nivel"
                            options={NIVEL_OPCOES}
                            value={formData.nivel || ''}
                            onChange={handleChange}
                            className="md:col-span-2"
                        />
                    </div>
                </div>

                <div className="flex justify-start gap-4 pt-4">
                    <Button type="submit" loading={isSaving} variant="primary">
                        <FaSave className="mr-2" />
                        Salvar Alterações
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => navigate('/admin/users')}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UserUpdateForm