import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: JSX.Element;
}

// Componente para proteger as rotas
const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const token = localStorage.getItem('token'); // Verifica se o token existe no localStorage

  if (!token) {
    return <Navigate to="/login" />; // Se o token não existir, redireciona para o login
  }

  return element; // Se o token existir, renderiza o componente
};

export default PrivateRoute;
