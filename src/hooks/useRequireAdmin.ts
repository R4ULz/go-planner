import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useRequireAdmin() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
      if (user.role !== 'admin') {
        router.push('/403'); // Redireciona para página de acesso negado
      }
    } catch (error) {
      router.push('/login'); // Token inválido
    }
  }, [router]);
}