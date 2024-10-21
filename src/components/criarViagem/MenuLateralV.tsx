import MenuItemV from "./MenuItemV";
import { useRouter } from "next/router";

export default function MenuLateralV({ setSelectedComponent}) {

  return (
    <aside className="flex h-full flex-col border-[1px] bg-white shadow-xl border-zinc-400 rounded-xl text-black">
      <div className="overflow-y-auto lg:max-h-none max-h-[200px] flex-grow">
        <ul>
          <MenuItemV
            texto="Dados Principais"
            onclick={() => setSelectedComponent("DadosPessoais")}
          />
          <MenuItemV
            texto="Atividades"
            onclick={() => setSelectedComponent("HistoricoViagens")}
          />
          <MenuItemV
            texto="Convidar"
            onclick={() => setSelectedComponent("LoginSenha")}
          />
        </ul>
      </div>
      <hr className="flex bg-gradient-to-r to-rosinha from-laranja h-[3px] mx-3 mt-8" />
      <ul className="flex flex-col space-y-5 m-6">
        <button
          className="py-1 border-2 border-zinc-400 text-zinc-700 rounded-xl"
        >
          Sair
        </button>
        <button
          className="py-1 bg-gradient-to-r to-rosinha from-laranja rounded-xl text-white"
        >
          Confirmar
        </button>
      </ul>
    </aside>
  );
}