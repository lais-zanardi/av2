import React, { useState } from 'react'
import Input from '../components/forms/Input'
import Button from '../components/forms/Button'
import { FaLock, FaUser } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const { login } = useAuth();
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!usuario || !senha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await login(usuario, senha);
        } catch (err: any) {
            setError(err.message || "Erro desconhecido ao tentar login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full min-h-screen bg-gray-100">
            <div className="hidden lg:flex w-1/2 h-screen">
                <div className="w-full h-full flex items-center justify-center bg-gray-900/10">
                    <img
                        src="src/assets/img-login.png"
                        alt="Esta imagem mostra uma aeronave moderna e imponente dentro de um hangar espaçoso e bem iluminado. A cena sugere um ambiente de alta tecnologia e cuidado meticuloso, com engenheiros ou técnicos (sutilmente visíveis) trabalhando ou inspecionando a aeronave. A iluminação é dramática, destacando as linhas da aeronave, e o fundo industrial reforça o contexto de produção e manutenção."
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/*Formulário de Login */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="flex flex-col max-w-md w-full min-h-full p-8 justify-center">
                    <div className='flex justify-between items-end p-2'>
                        {/* Título */}
                        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-left">Login</h2>
                        {/* Logo */}
                        <img src="/src/assets/img-aerocode.png" className='max-h-24 justify-center object-contain' alt="" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Campo Usuário */}
                        <Input
                            label="Usuário"
                            type="text"
                            placeholder="usuário"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            disabled={loading}
                            Icon={FaUser}
                        />

                        {/* Campo Senha */}
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="******"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            disabled={loading}
                            Icon={FaLock}
                        />

                        {error && (
                            <p className="text-sm text-red-600 text-center">{error}</p>
                        )}

                        {/* Botão Entrar */}
                        <Button
                            type="submit"
                            className="w-full mt-6"
                            loading={loading}
                            variant="primary"
                        >
                            Entrar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;