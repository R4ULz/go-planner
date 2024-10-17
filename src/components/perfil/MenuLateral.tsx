import { useUser } from "@/src/contexts/UserContext";
import MenuItem from "./MenuItem";
import { useRouter } from "next/router";

export default function MenuLateral({ setSelectedComponent, handleSave }) {
  const { logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    alert("Você está saindo")
    router.push("/autenticacao");

  };

  return (
    <aside className="flex flex-col border-[1px] bg-white shadow-xl border-zinc-400 rounded-xl text-black">
      <div className="overflow-y-auto lg:max-h-none max-h-[200px] flex-grow">
        <ul>
          <MenuItem
            texto="Dados Pessoais"
            onclick={() => setSelectedComponent("DadosPessoais")}
          />
          <MenuItem
            texto="Histórico de viagens"
            onclick={() => setSelectedComponent("HistoricoViagens")}
          />
          <MenuItem
            texto="Login e senha"
            onclick={() => setSelectedComponent("LoginSenha")}
          />
        </ul>
      </div>
      <hr className="flex bg-gradient-to-r to-rosinha from-laranja h-[3px] mx-3 mt-8" />
      <ul className="flex flex-col space-y-5 m-6">
        <button
          className="py-1 border-2 border-zinc-400 text-zinc-700 rounded-xl"
          onClick={handleLogout}
        >
          Sair
        </button>
        <button
          onClick={handleSave}
          className="py-1 bg-gradient-to-r to-rosinha from-laranja rounded-xl text-white"
        >
          Salvar
        </button>
      </ul>
    </aside>
  );
}
