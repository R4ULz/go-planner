import Image from "next/image";
import { User } from "../icons/user";
import { emailRoxo } from "../icons/emailRoxo"; 
import { lixeira } from "../icons/lixeira";
import { adicionarFriend } from "../icons/addFriend";
export default function ListaAmigos() {
    return (
       <div className="w-full h-full border-[1px] border-zinc-400 px-14 py-8 rounded-xl bg-white text-lg space-y-8">
            <div className="flex flex-col gap-1">
                <h2 className="text-zinc-500 text-cl font-semibold tex">Lista de amigos</h2>
                <h1 className="text-zinc-900 font-bold text-2xl flex">
                    Adicione mais amigos 
                    <span className="bg-roxo w-2 h-2 rounded-full p-1 flex mt-[18px] ml-2"></span>
                </h1>
                <p className="text-zinc-400">
                    Adicione seus amigos para convidá-los para as suas proximas viagens
                </p>

                <div className="mt-6 px-4 py-2 border-[0.5px] border-zinc-300 rounded-xl flex items-center justify-between">
                    <div className="flex gap-1 items-center">
                        {emailRoxo}
                        <input type="text" placeholder="planner@gmail.com" className="focus:outline-none" />
                    </div>

                    <button
                        className=" flex gap-1 items-center font-inter justify-center bg-laranja px-4 py-2 text-white rounded-xl font-bold">
                         Adicionar
                         {adicionarFriend}
                    </button>
                </div>
            </div>

            <div className="w-full h-[0.5px] rounded-full bg-zinc-300"/>

       
            <div className="flex flex-col gap-1">
                <h1 className="text-zinc-900 font-bold text-2xl flex">
                    Seus amigos
                    <span className="bg-roxo w-2 h-2 rounded-full p-1 flex mt-[18px] ml-2"></span>
                </h1>
                <p className="text-zinc-400">
                Aqui fica as pessoas que irão planejar e viajar junto com você!
                </p>
                <div className="w-full h-[350px] flex flex-col mt-6">
                    <div className=" rounded-xl border-[0.5px]  px-4 py-3 flex justify-between items-center">
                        <div className="flex items-center gap-4 justify-between ">
                            <div className="flex gap-2">
                                {User}
                                <p className="text-lg font-semibold text-zinc-500">Nome do convidado</p>
                            </div>

                            <div className="w-[1px] h-10 bg-zinc-300 "/>
                            
                            <p className="text-lg text-zinc-500">email@copnvidado</p>
                        </div>

                        <div className="hover:text-RosinhaEscurinho transition-all pl-9">
                        {lixeira}
                        </div>
                    </div>

                </div>

            </div>
 
       </div>
    )
}