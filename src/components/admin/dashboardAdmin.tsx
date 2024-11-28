import { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useRouter } from 'next/router';
import { PlaneTakeoff, TreePalmIcon, UserPlus, Users } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale, // Para escalas categóricas no eixo X
  LinearScale, // Para escalas lineares no eixo Y
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);




export default function DashboardAdmin() {
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

  const chartData = {
    labels: meses, // Meses do ano
    datasets: [
      {
        label: 'Usuários Mensais',
        data: data.usuariosMensais.map((d) => d.total), // Dados de usuários
        backgroundColor: '#FF5f33', // Cor das barras
        borderColor: '#ff5833', // Cor da borda
        borderWidth: 1,
      },
      {
        label: 'Viagens Mensais',
        data: data.viagensMensais.map((d) => d.total), // Dados de viagens
        backgroundColor: '#C70f39', // Cor das barras
        borderColor: '#C70039', // Cor da borda
        borderWidth: 1,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Corrige o tipo explicitamente
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Meses',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Quantidade',
        },
        beginAtZero: true,
      },
    },
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
  const gerarRelatorioPDF = () => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text('Relatório de Dados', 10, 10);

    // Adiciona os dados gerais
    doc.setFontSize(12);
    doc.text(`Ano: ${ano}`, 10, 20);
    doc.text(`Total de Usuários: ${data.totalUsers}`, 10, 30);
    doc.text(`Total de Viagens: ${data.totalTrips}`, 10, 40);
    doc.text(`Novos Usuários Hoje: ${data.newUsersToday}`, 10, 50);
    doc.text(`Viagens Criadas Hoje: ${data.newTripsToday}`, 10, 60);

    // Adiciona tabela de usuários mensais
    doc.autoTable({
      head: [['Mês', 'Usuários']],
      body: data.usuariosMensais.map((d) => [d.mes, d.total]),
      startY: 70,
    });

    // Adiciona tabela de viagens mensais
    doc.autoTable({
      head: [['Mês', 'Viagens']],
      body: data.viagensMensais.map((d) => [d.mes, d.total]),
      startY: doc.lastAutoTable.finalY + 10, // Posiciona abaixo da tabela anterior
    });

    // Salva o PDF
    doc.save(`Relatorio_${ano}.pdf`);
  };
  return (
    <div className='w-full'>

      <div className='w-full flex justify-between items-center'>
        <div>
          <h2 className='text-lg font-semibold font-inter text-zinc-500'>
          Painel do administrador
          </h2>
          <h1 className="text-4xl font-bold font-inter">
            Overview
            <span className="size-[10px] inline-block rounded-full bg-gradient-to-tr bg-rosinha from-laranja ml-1"></span>
          </h1>
          <p className='text-zinc-400'>Gerencie e analise com facilidade os dados da sua aplicação</p>
        </div>
        <div className="">
          <button
            onClick={gerarRelatorioPDF}
            className="bg-laranjinha hover:bg-laranjinha/80 transition-all text-white px-5 py-3 rounded-md font-rubik font-semibold"
          >
            Gerar Relatório PDF
          </button>
        </div>
      </div>


    
      {/* Dados gerais */}
      <div className='mt-12 w-full flex gap-8 justify-between'>
        <div className="border-[1px] rounded-xl p-5 w-64 space-y-4">
          <div className='w-full flex justify-between items-center'>
            <h2 className="text-lg font-semibold font-inter text-zinc-500">Total de usuários</h2>

            <Users className='size-5 font-bold text-zinc-500'/>
          </div>
          <p className='text-zinc-700 font-bold text-xl'>{data.totalUsers}</p>
        </div>

        <div className="border-[1px] rounded-xl p-5 w-64 space-y-4">
          <div className='w-full flex justify-between items-center'>
            <h2 className="text-lg font-semibold font-inter text-zinc-500">Total de viagens</h2>

            <PlaneTakeoff className='size-5 font-bold text-zinc-500'/>
          </div>
          <p className='text-zinc-700 font-bold text-xl'>{data.totalTrips}</p>
        </div>
        
        <div className="border-[1px] rounded-xl p-5 w-64 space-y-4">
          <div className='w-full flex justify-between items-center'>
            <h2 className="text-lg font-semibold font-inter text-zinc-500">Novos Clientes Hoje</h2>

            <UserPlus className='size-5 font-bold text-zinc-500'/>
          </div>
          <p className='text-zinc-700 font-bold text-xl'>{data.newUsersToday}</p>
        </div>
        
        <div className="border-[1px] rounded-xl p-5 w-64 space-y-4">
          <div className='w-full flex justify-between items-center'>
            <h2 className="text-lg font-semibold font-inter text-zinc-500">Viagens Criadas Hoje</h2>

            <TreePalmIcon className='size-5 font-bold text-zinc-500'/>
          </div>
          <p className='text-zinc-700 font-bold text-xl'>{data.newTripsToday}</p>
        </div>
      </div>

      
      {/* Dados mensais */}
      <div className="mt-12">
        <div className='flex gap-6 items-center'>
          <h2 className="text-xl font-bold ">Gráfico de Dados Mensais</h2>
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
        <Bar data={chartData} options={chartOptions} />
      </div>

     
    </div>
  );
}