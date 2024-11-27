import Footer from "../components/Home/Footer/footer";
import Header from "../components/Home/Header/Header";
import DadosPessoais from "../components/perfil/DadosPessoais";
import HistoricoViagens from "../components/perfil/HistoricoViagens";
import LoginESenha from "../components/perfil/ListaAmigo";
import MenuLateral from "../components/perfil/MenuLateral";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/router";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import ListaAmigos from "../components/perfil/ListaAmigo";

type ComponentType = "DadosPessoais" | "HistoricoViagens" | "LoginSenha";

export default function Perfil() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>("DadosPessoais");
  const { user } = useUser();
  const [nome, setNome] = useState(user?.nome);
  const [email, setEmail] = useState(user?.email);
  const [cpf, setCPF] = useState(user?.cpf)
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, [user, router])

  const handleRedirect = () => {
    setShowModal(false);
    router.push({
      pathname: '/autenticacao',
      query: { modo: 'login' }
    });
  };

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = async () => {
    if (senha !== confirmSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    try {
      const res = await fetch('/api/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          novoEmail: email,
          nome: nome,
          senha: senha || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Toastify({
          text: 'Dados atualizados com sucesso!',
          duration: 2000,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }
        }).showToast();

      } else {
        Toastify({
          text: `${data.message}`,
          duration: 2000,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true,
          style: {
            background: "#ce1836",
          }
        }).showToast();
      }
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
      Toastify({
        text: 'Erro ao atualizar os dados!',
        duration: 2000,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: "#ce1836",
        }
      }).showToast();
    }
  };

  const handleCreateTrip = () => {
      router.push({
        pathname: "/criarViagem",
    })
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "DadosPessoais":
        return <DadosPessoais user={user} nome={nome}
          setNome={setNome}
          email={email}
          setEmail={setEmail}
          senha={senha}
          setSenha={setSenha}
          confirmSenha={confirmSenha}
          setConfirmSenha={setConfirmSenha}
          cpf={cpf} />;
      case "HistoricoViagens":
        return <HistoricoViagens user={user} onCreateTrip={handleCreateTrip}/>; // Passa o usuário como prop
      case "LoginSenha":
        return <ListaAmigos user={user} />; // Passa o usuário como prop
      default:
        return <DadosPessoais user={user}
          nome={nome}
          setNome={setNome}
          email={email}
          setEmail={setEmail}
          senha={senha}
          setSenha={setSenha}
          confirmSenha={confirmSenha}
          setConfirmSenha={setConfirmSenha} />; // Passa o usuário como prop
    }
  };   


  return (
    <div>
      {user
        ?
        <div className="flex overflow-x-hidden bg-gray-100 flex-col items-center">
      <header className="fixed z-50 w-full flex justify-center bg-white border-b-[0.5px] border-zinc-200">
        <Header />
      </header>
      <div className="flex max-w-screen-2xl  w-full  gap-10 mt-5">
        <div className="flex w-1/5 p-20 ">
          <MenuLateral setSelectedComponent={setSelectedComponent} handleSave={handleUpdate} />
        </div>
        <div className="w-4/5 h-[850px] p-20 max-w-screen-2xl">
          {renderComponent()}
        </div>
      </div>
      <footer  className="w-full flex justify-center bg-black">
        <Footer />
      </footer>
    </div>
    :
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/35 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-lg p-24">
              <h2 className="text-xl font-bold mb-4">Acesso não permitido</h2>
              <p className="mb-4 text-lg">Você precisa estar logado para acessar o perfil.</p>
              <button
                onClick={handleRedirect}
                className="bg-gradient-to-r to-rosinha from-laranja text-white px-4 py-2 rounded-lg"
              >
                Fazer login
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
}
