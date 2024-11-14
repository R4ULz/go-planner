import { useState } from "react";
import { Plus } from "../icons/Plus";
import MenuItemV from "./MenuItemV";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

interface MenuLateralVProps {
  setSelectedComponent: (component: string) => void;
  salvarViagem: () => void;
  menuEnabled: boolean;
  selectedComponent: string;
}

export default function MenuLateralV({ setSelectedComponent, salvarViagem, menuEnabled, selectedComponent }: MenuLateralVProps) {

  const handleItemClick = (component: string, isDisabled: boolean) => {
    if (isDisabled) {
      Toastify({
        text: "É necessário cadastrar uma viagem primeiro!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ff5f5f",
        close: true,
      }).showToast();
    } else {
      setSelectedComponent(component);
    }
  };

  const handleNewTopicClick = () => {
    // Aqui podemos definir "Topicos" como o componente selecionado
    setSelectedComponent("Topicos");
  };

  return (
    <aside className="flex h-full flex-col border-[1px] bg-white shadow-xl border-zinc-400 rounded-xl text-black font-bold">
      <div className="overflow-y-auto lg:max-h-none max-h-[200px] flex-grow">
        <ul>
          <MenuItemV
            texto="Dados Principais"
            onclick={() => handleItemClick("DadosPrincipais", false)}
            selected={selectedComponent === "DadosPrincipais"}
            cor="bg-rosinha"
          />
          <MenuItemV
            texto="Atividades"
            onclick={() => handleItemClick("Atividades", !menuEnabled)}
            selected={selectedComponent === "Atividades"}
            disabled={!menuEnabled}
            cor="bg-laranjinha"
          />
          <MenuItemV
            texto="Convidar"
            onclick={() => handleItemClick("ConvidarAmigos", !menuEnabled)}
            selected={selectedComponent === "ConvidarAmigos"}
            disabled={!menuEnabled}
            cor="bg-roxo"
          />
          <div className="flex justify-center mt-5">
            <button
              className="px-7 flex flex-row items-center text-black border-2 border-laranjinha rounded-xl font-bold"
              onClick={handleNewTopicClick}
            >
              Novo Tópico {Plus}
            </button>
          </div>
        </ul>
      </div>
      <hr className="flex bg-gradient-to-r to-rosinha from-laranja h-[3px] mx-3 mt-8" />

      <ul className="flex flex-col space-y-5 m-6">
        <button className="py-1 border-2 border-zinc-400 text-zinc-700 rounded-xl">Sair</button>
        <button
          className="py-2 bg-gradient-to-r to-rosinha from-laranja rounded-xl text-white font-semibold"
          onClick={salvarViagem}
        >
          Finalizar viagem
        </button>
      </ul>
    </aside>
  );
}