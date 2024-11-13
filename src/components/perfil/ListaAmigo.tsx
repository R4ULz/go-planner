import Image from "next/image";
import { User } from "../icons/user";
import { emailRoxo } from "../icons/emailRoxo"; 
import { lixeira } from "../icons/lixeira";
import { adicionarFriend } from "../icons/addFriend";
import { useState } from "react";
import Toastify from 'toastify-js';
export default function ListaAmigos({ user }) {
    const [friendEmail, setFriendEmail] = useState("");
    const [friends, setFriends] = useState(user.amigos || []); // Assume que amigos já estão no objeto user
    const handleAddFriend = async () => {
        if (!user?._id || !friendEmail) {
          Toastify({
            text: 'Dados insuficientes: Verifique o ID do usuário e o email.',
            duration: 2000,
            style: { background: "#ce1836" }
          }).showToast();
          return;
        }
      
        console.log("Enviando solicitação com ID:", user._id);
        console.log("Email do amigo:", friendEmail);
      
        try {
          const response = await fetch('/api/addFriend', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              currentUserId: user._id,
              friendEmail: friendEmail,
            }),
          });
      
          const data = await response.json();
          if (response.ok) {
            setFriends((prevFriends) => [...prevFriends, data.friend]);
            Toastify({
              text: 'Amigo adicionado com sucesso!',
              duration: 2000,
              style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
            }).showToast();
          } else {
            Toastify({
              text: data.message || 'Erro ao adicionar amigo',
              duration: 2000,
              style: { background: "#ce1836" }
            }).showToast();
          }
        } catch (error) {
          console.error('Erro ao adicionar amigo:', error);
        }
      };
      
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
                        <input
                            type="text"
                            placeholder="Digite o email do amigo"
                            value={friendEmail}
                            onChange={(e) => setFriendEmail(e.target.value)}
                            className="focus:outline-none"
                            />
                    </div>

                    <button
                        onClick={handleAddFriend}
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
                {friends.map((friend) => (
                    <div key={friend._id} className="rounded-xl border-[0.5px] px-4 py-3 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                            {User}
                            <p className="text-lg font-semibold text-zinc-500">{friend.nome}</p>
                            </div>
                            <div className="w-[1px] h-10 bg-zinc-300"/>
                            <p className="text-lg text-zinc-500">{friend.email}</p>
                        </div>
                        <div className="hover:text-RosinhaEscurinho transition-all pl-9">
                            {lixeira}
                        </div>
                    </div>
                ))}

                </div>

            </div>
 
       </div>
    )
}