import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { user } = useUser(); // Pega o usuário do contexto
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Mostra o modal se o usuário não estiver autenticado
    console.log(user)
    if (!user || user.role !== "admin") {
    
      setShowModal(true);
    }
  }, [user, router]);

  const handleRedirect = () => {
    setShowModal(false);
    router.push({
      pathname: '/autenticacao',
      query: { modo: 'login' }
    });
  };

  if (!user || user.role !== "admin") {
    return (
      showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/35 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-lg p-24">
            <h2 className="text-xl font-bold mb-4">Acesso não permitido</h2>
            <p className="mb-4 text-lg">Você precisa estar logado como administrador para acessar o painel.</p>
            <button
              onClick={handleRedirect}
              className="bg-gradient-to-r to-rosinha from-laranja text-white px-4 py-2 rounded-lg"
            >
              Fazer login
            </button>
          </div>
        </div>
      )
    );
  }

  return (
    <div>
      <h1>Painel do Administrador</h1>
      {/* Conteúdo do painel */}
    </div>
  );
}
