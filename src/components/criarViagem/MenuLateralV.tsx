import { Plus } from "../icons/Plus";
import MenuItemV from "./MenuItemV";

interface MenuLateralVProps {
  setSelectedComponent: (component: string) => void;
  salvarViagem: () => void; // Recebe a função para salvar os dados
}

export default function MenuLateralV({ setSelectedComponent, salvarViagem }: MenuLateralVProps) {
  return (
    <aside className="flex h-full flex-col border-[1px] bg-white shadow-xl border-zinc-400 rounded-xl text-black font-bold">
      <div className="overflow-y-auto lg:max-h-none max-h-[200px] flex-grow">
        <ul>
          <MenuItemV
            texto="Dados Principais"
            onclick={() => setSelectedComponent("DadosPrincipais")}
          />
          <MenuItemV
            texto="Atividades"
            onclick={() => setSelectedComponent("Atividades")}
          />
          <MenuItemV
            texto="Convidar"
            onclick={() => setSelectedComponent("ConvidarAmigos")}
          />

          <div className="flex justify-center mt-5">
            <button className="px-7 flex flex-row items-center text-black border-2 border-laranjinha rounded-xl font-bold">
              Novo Tópico {Plus}
            </button>
          </div>
        </ul>
      </div>
      <hr className="flex bg-gradient-to-r to-rosinha from-laranja h-[3px] mx-3 mt-8" />

      <ul className="flex flex-col space-y-5 m-6">
        <button className="py-1 border-2 border-zinc-400 text-zinc-700 rounded-xl">Sair</button>
        <button
          className="py-1 bg-gradient-to-r to-rosinha from-laranja rounded-xl text-white"
          onClick={salvarViagem} // Chama a função salvarViagem quando o botão Confirmar é pressionado
        >
          Confirmar
        </button>
      </ul>
    </aside>
  );
}
