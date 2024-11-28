import { useState } from "react";
import { useUser } from "@/src/contexts/UserContext";
import MenuItem from "./MenuItem";
import { useRouter } from "next/router";

import Voltar from "../BtnVoltar/btnVoltar";

import Toastify from "toastify-js";


export default function MenuLateral({ setSelectedComponent, handleSave }) {
  const { logout } = useUser();
  const router = useRouter();

  const [selectedComponent, setComponenteSelecionado] = useState("DadosPessoais");

  const handleLogout = () => {
    logout();
    Toastify({
      text: "Você está saindo",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
  }).showToast();

    router.push("/autenticacao");
  };

  const handleItemClick = (component: string) => {
    setComponenteSelecionado(component);
    setSelectedComponent(component);
  };

  return (
    <aside className="flex flex-col border-[1px] bg-white shadow-xl border-zinc-400 rounded-xl text-black">
      <div className="overflow-y-auto lg:max-h-none max-h-[200px] flex-grow">
        <ul>
          <MenuItem
            texto="Dados Pessoais"
            onclick={() => handleItemClick("DadosPessoais")}
            selected={selectedComponent === "DadosPessoais"}
            cor="bg-rosinha"
          />
          <MenuItem
            texto="Histórico de viagens"
            onclick={() => handleItemClick("HistoricoViagens")}
            selected={selectedComponent === "HistoricoViagens"}
            cor="bg-laranjinha"
          />
          <MenuItem
            texto="Lista de amigos"
            onclick={() => handleItemClick("LoginSenha")}
            selected={selectedComponent === "LoginSenha"}
            cor="bg-roxo"
          />
        </ul>
      </div>
      <hr className="flex bg-gradient-to-r to-rosinha from-laranja h-[3px] mx-3 mt-8" />
      <ul className="flex flex-col m-6">
        <Voltar/>
      </ul>
      
      <ul className="flex flex-col mx-6 mb-6">
        <button
          className="py-1 border-2 border-zinc-400 text-zinc-700 rounded-xl"
          onClick={handleLogout}
        >
          Sair
        </button>
      </ul>
    </aside>
  );
}
