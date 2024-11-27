import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState({
    totalUsers: 0,
    totalTrips: 0,
    newUsersToday: 0,
    newTripsToday: 0,
    usuariosMensais: [],
    viagensMensais: [],
  });

  const [ano, setAno] = useState(new Date().getFullYear()); // Ano inicial

  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const formatarDadosMensais = (dados) => {
    return meses.map((mes, index) => {
      const encontrado = dados.find((d) => d._id === index + 1); // Meses no MongoDB começam de 1
      return { mes, total: encontrado ? encontrado.total : 0 };
    });
  };

  const fetchDashboardData = async (anoSelecionado) => {
    try {
      const res = await fetch(`/api/getDashboardData?ano=${anoSelecionado}`);
      const result = await res.json();

      // Formatar dados mensais
      const usuariosMensais = formatarDadosMensais(result.usuariosMensais || []);
      const viagensMensais = formatarDadosMensais(result.viagensMensais || []);

      setData({ ...result, usuariosMensais, viagensMensais });
    } catch (erro) {
      console.log('Erro ao buscar dados:', erro);
    }
  };

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      setShowModal(true);
    } else {
      fetchDashboardData(ano); // Busca os dados para o ano inicial
    }
  }, [user, ano]);

  const handleAnoChange = (event) => {
    const novoAno = parseInt(event.target.value);
    setAno(novoAno);
  };

  if (!user || user.role !== 'admin') {
    return (
      showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/35 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-lg p-24">
            <h2 className="text-xl font-bold mb-4">Acesso não permitido</h2>
            <p className="mb-4 text-lg">
              Você precisa estar logado como administrador para acessar o painel.
            </p>
            <button
              onClick={() => router.push('/autenticacao?modo=login')}
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
      <h1 className="text-2xl font-bold mb-4">Painel do Administrador</h1>

      

      {/* Dados gerais */}
      <div>
        <h2 className="text-xl font-bold mb-4">Dados Gerais</h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="font-bold">Total de Clientes</h2>
            <p>{data.totalUsers}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="font-bold">Total de Viagens</h2>
            <p>{data.totalTrips}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="font-bold">Novos Clientes Hoje</h2>
            <p>{data.newUsersToday}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="font-bold">Viagens Criadas Hoje</h2>
            <p>{data.newTripsToday}</p>
          </div>
        </div>
      </div>

      {/* Dados mensais */}
      <div>
        {/* Seletor de Ano */}
      <div className="mb-6">
        <label htmlFor="ano" className="font-bold mr-2">
          Selecione o Ano:
        </label>
        <select
          id="ano"
          value={ano}
          onChange={handleAnoChange}
          className="border rounded p-2"
        >
          {[...Array(10)].map((_, i) => {
            const anoOpcao = new Date().getFullYear() - i;
            return (
              <option key={anoOpcao} value={anoOpcao}>
                {anoOpcao}
              </option>
            );
          })}
        </select>
      </div>
        <h2 className="text-xl font-bold mb-4">Dados Mensais ({ano})</h2>

        {/* Novos Usuários por Mês */}
        <h3 className="text-lg font-bold mb-2">Novos Usuários por Mês</h3>
        <ul className="bg-gray-50 p-4 rounded-lg shadow">
          {data.usuariosMensais.map(({ mes, total }, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>{mes}</span>
              <span>{total} usuários</span>
            </li>
          ))}
        </ul>

        {/* Viagens Criadas por Mês */}
        <h3 className="text-lg font-bold mb-2 mt-6">Viagens Criadas por Mês</h3>
        <ul className="bg-gray-50 p-4 rounded-lg shadow">
          {data.viagensMensais.map(({ mes, total }, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>{mes}</span>
              <span>{total} viagens</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
