import Footer from "../components/Home/Footer/footer";
import Header from "../components/Home/Header/Header";
import DadosPessoais from "../components/perfil/DadosPessoais";
import HistoricoViagens from "../components/perfil/HistoricoViagens";
import LoginESenha from "../components/perfil/LoginESenha";
import MenuLateral from "../components/perfil/MenuLateral";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";

type ComponentType = "DadosPessoais" | "HistoricoViagens" | "LoginSenha";

export default function Perfil() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>("DadosPessoais");
  const { user } = useUser(); // Obtém o usuário logado
  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

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
          email,
          nome: nome,
          senha: senha || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Dados atualizados com sucesso!');
      } else {
        alert('Erro ao atualizar os dados: ' + data.message);
      }
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
      alert('Erro ao atualizar os dados');
    }
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
        setConfirmSenha={setConfirmSenha} />; 
      case "HistoricoViagens":
        return <HistoricoViagens user={user} />; // Passa o usuário como prop
      case "LoginSenha":
        return <LoginESenha user={user} />; // Passa o usuário como prop
      default:
        return <DadosPessoais user={user}             
        nome={nome}
        setNome={setNome}
        email={email}
        setEmail={setEmail}
        senha={senha}
        setSenha={setSenha}
        confirmSenha={confirmSenha}
        setConfirmSenha={setConfirmSenha}/>; // Passa o usuário como prop
    }
  };


  return (
    <div className="flex h-screen w-screen bg-gray-100 flex-col">
      <header className="fixed z-50 w-full flex justify-center">
        <Header />
      </header>
      <div className="flex w-full h-[1000px] gap-10 mt-5">
        <div className="flex w-1/5 p-20 max-w-screen-2xl">
          <MenuLateral setSelectedComponent={setSelectedComponent} handleSave={handleUpdate} />
        </div>
        <div className="w-4/5 p-20 max-w-screen-2xl">
          {renderComponent()}
        </div>
      </div>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}
