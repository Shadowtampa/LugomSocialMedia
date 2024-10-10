import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const [email, setEmail] = useState(''); // Estado para armazenar o e-mail
    const [password, setPassword] = useState(''); // Estado para armazenar a senha
    const [error, setError] = useState<string>(''); // Estado para armazenar erros de autenticação
    const [loading, setLoading] = useState(false); // Estado de carregamento

    const navigate = useNavigate(); // Hook do react-router-dom para redirecionar

    // Função para lidar com o envio do formulário
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Previne o comportamento padrão do form
        setLoading(true); // Define o início do carregamento
        setError(''); // Reseta o erro antes de fazer a requisição

        try {
            const response = await api.post('/login', { email, password }); // Faz a requisição de login para a API
            const token = response.data.access_token; // Assume que a resposta contém o token de autenticação
            localStorage.setItem('token', token); // Armazena o token no localStorage para uso posterior
            navigate('/dashboard'); // Redireciona para a dashboard se autenticado
            // Redirecione o usuário ou faça qualquer outra ação após o login
        } catch (error) {
            setError('Falha na autenticação. Verifique suas credenciais.');
        } finally {
            setLoading(false); // Define o fim do carregamento
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token'); // Pega o token do localStorage
                
                if (token && token.length > 0) {
                    const response = await api.get('/me', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.status === 200) {
                        navigate('/dashboard'); // Redireciona para a dashboard se autenticado
                    }
                }
            } catch (error) {
                console.error('Erro de autenticação', error);
            }
        };

        checkAuth(); // Chama a função no efeito
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {/* Campo de e-mail */}
                <label htmlFor="email" className="block text-gray-700">E-mail</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full p-3 mt-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                {/* Campo de senha */}
                <label htmlFor="password" className="block text-gray-700">Senha</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full p-3 mt-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                {/* Exibição de erro */}
                {error && <p className="text-red-600 mb-4">{error}</p>}

                {/* Botão de login */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Carregando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
};

export default Login;
