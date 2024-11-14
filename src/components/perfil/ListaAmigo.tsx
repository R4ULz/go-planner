import Image from "next/image";
import { User } from "../icons/user";
import { emailRoxo } from "../icons/emailRoxo"; 
import { lixeira } from "../icons/lixeira";
import { adicionarFriend } from "../icons/addFriend";
import { useEffect, useState } from "react";
import Toastify from 'toastify-js';
import { useUser } from "@/src/contexts/UserContext";

export default function ListaAmigos() {
  console.log("ListaAmigos component is mounted");

  const { user } = useUser();
  console.log("User at component mount:", user); // Verifica o conteúdo de `user` ao montar o componente
  const [friendEmail, setFriendEmail] = useState("");
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  // Função para carregar amigos do banco de dados
  const loadFriendsFromDatabase = async () => {
    if (user?.amigos && user.amigos.length > 0) {
      try {
        console.log("IDs de amigos do usuário:", user.amigos);
        const response = await fetch("/api/getFriends", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ friendIds: user.amigos }),
        });
        
        const data = await response.json();
        if (response.ok) {
          console.log("Amigos carregados da API:", data.friends); // Verifique se os amigos foram carregados corretamente
          setFriends(data.friends);
        } else {
          console.error("Erro ao carregar amigos:", data.message);
        }
      } catch (error) {
        console.error("Erro ao carregar amigos:", error);
      }
    } else {
      console.log("Nenhum amigo encontrado para carregar.");
    }
    setIsLoading(false); // Finaliza o carregamento após a tentativa
  };

  // Carregar os dados completos dos amigos quando o componente monta
  useEffect(() => {
    if (!user) {
      console.log("useEffect: Usuário não está carregado ainda.");
      return;
    }
    
    console.log("useEffect em ListaAmigos executado, usuário atual:", user);
    loadFriendsFromDatabase();
  }, [user]); // Executa sempre que o usuário muda

  const handleAddFriend = async () => {
    if (!user?.id || !friendEmail) {
      Toastify({
        text: 'Dados insuficientes: Verifique o ID do usuário e o email.',
        duration: 2000,
        style: { background: "#ce1836" }
      }).showToast();
      return;
    }

    try {
      const response = await fetch('/api/addFriend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentUserId: user.id,
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

  if (isLoading) {
    return <p>Carregando amigos...</p>; // Exibe uma mensagem de carregamento enquanto aguarda os dados
  }

  return (
    <div className="w-full h-full border-[1px] border-zinc-400 px-14 py-8 rounded-xl bg-white text-lg space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-zinc-500 text-cl font-semibold tex">Lista de amigos</h2>
        <h1 className="text-zinc-900 font-bold text-2xl flex">
          Adicione mais amigos
          <span className="bg-roxo w-2 h-2 rounded-full p-1 flex mt-[18px] ml-2"></span>
        </h1>
        <p className="text-zinc-400">
          Adicione seus amigos para convidá-los para as suas próximas viagens
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
            className="flex gap-1 items-center font-inter justify-center bg-laranja px-4 py-2 text-white rounded-xl font-bold"
          >
            Adicionar
            {adicionarFriend}
          </button>
        </div>
      </div>

      <div className="w-full h-[0.5px] rounded-full bg-zinc-300" />

      <div className="flex flex-col gap-1">
        <h1 className="text-zinc-900 font-bold text-2xl flex">
          Seus amigos
          <span className="bg-roxo w-2 h-2 rounded-full p-1 flex mt-[18px] ml-2"></span>
        </h1>
        <p className="text-zinc-400">
          Aqui ficam as pessoas que irão planejar e viajar junto com você!
        </p>
        <div className="w-full h-[350px] flex flex-col mt-6">
          {friends.length > 0 ? (
            friends.map((friend) => (
              <div key={friend} className="rounded-xl border-[0.5px] px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {User}
                    <p className="text-lg font-semibold text-zinc-500">{friend.nome}</p>
                  </div>
                  <div className="w-[1px] h-10 bg-zinc-300" />
                  <p className="text-lg text-zinc-500">{friend.email}</p>
                </div>
                <div className="hover:text-RosinhaEscurinho transition-all pl-9">
                  {lixeira}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-zinc-500">Nenhum amigo encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
