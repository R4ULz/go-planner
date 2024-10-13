
import MenuItem from "./MenuItem";

export default function MenuLateral({setSelectedComponent}){
    return(
        <aside className="flex flex-col border-[1px] bg-white shadow-xl border-zinc-400 rounded-xl text-black">
            <div className="overflow-y-auto lg:max-h-none max-h-[200px] flex-grow">
                <ul className="">
                    <MenuItem texto="Dados Pessoais" onclick={()=> setSelectedComponent("DadosPessoais")}/>
                    <MenuItem texto="Histórico de viagens" onclick={()=> setSelectedComponent("HistoricoViagens")}/>
                    <MenuItem texto="Login e senha" onclick={()=> setSelectedComponent("LoginSenha")}/>
                </ul>
            </div>
            <hr className="flex bg-gradient-to-r to-rosinha from-laranja h-[3px] mx-3 mt-8"/>
            <ul className="flex flex-col space-y-5 m-6">
                <button className="py-1 border-2 border-zinc-400 text-zinc-700 rounded-xl">Sair</button>
                <button className="py-1 bg-gradient-to-r to-rosinha from-laranja rounded-xl text-white">Salvar</button>
            </ul>
        </aside>
    )
}