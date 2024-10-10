import axios from 'axios';

// Crie uma instância do Axios com a configuração base
const api = axios.create({
  baseURL: 'http://localhost:8989/api', // Altere para a URL base da sua API
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout de 10 segundos
});

// Função para obter o token, por exemplo, do localStorage ou outro método
const getToken = () => {
  return localStorage.getItem('token'); // Altere isso para o método que você utiliza para armazenar o token
};

// Interceptor para adicionar o Bearer Token no cabeçalho Authorization
api.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Função para tratar erros de requisição
const handleRequestError = (error: any) => {
  if (error.response) {
    // Erros que recebem resposta do servidor (status fora da faixa 2xx)
    console.error('Erro na resposta:', error.response);
  } else if (error.request) {
    // Erros que não recebem resposta do servidor
    console.error('Erro na requisição:', error.request);
  } else {
    // Outros tipos de erros (ex: erro ao configurar requisição)
    console.error('Erro inesperado:', error.message);
  }
  return Promise.reject(error);
};

// Intercepta respostas para tratar erros
api.interceptors.response.use(
  response => response,
  error => handleRequestError(error)
);

export default api;
