import { useEffect, useState } from "react";
import Toastify from 'toastify-js';
import { User } from "../icons/user";
import { emailRoxo } from "../icons/emailRoxo"; 
import { lixeira } from "../icons/lixeira";
import { adicionarFriend } from "../icons/addFriend";

export default function ListaAmigos({ user }) {
  const [friendEmail, setFriendEmail] = useState("");
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  const handleRemoveFriend = async (friendId) => {
    try {
      const response = await fetch('/api/removeFriend', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, friendId: friendId })
      });
  
      const data = await response.json();
      if (response.ok) {
        setFriends(data.friends); // Atualiza a lista de amigos no estado
        Toastify({
          text: 'Amigo removido com sucesso!',
          duration: 2000,
          style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" }
        }).showToast();
      } else {
        console.error('Erro ao remover amigo:', data.message);
      }
    } catch (error) {
      console.error('Erro ao remover amigo:', error);
    }
  };



  const loadFriendsFromDatabase = async () => {
    if (user?.id) {
      try {
        const response = await fetch("/api/getFriends", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }), 
        });
        
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setFriends(data.friends);
        } else {
          console.error("Erro ao carregar amigos:", data.message);
        }
      } catch (error) {
        console.error("Erro ao carregar amigos:", error);
      }
    } else {
      console.log("ID do usuário não encontrado.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadFriendsFromDatabase();
  }, [user]);

  // Função para adicionar amigo
  const handleAddFriend = async () => {
    if (!user?.id || !friendEmail) {
        Toastify({
            text: 'Dados insuficientes: Verifique o ID do usuário e o email.',
            duration: 2000,
            style: { background: "#ce1836" }
        }).showToast();
        return;
    }

    if (user.email === friendEmail) {
        Toastify({
            text: "Você não pode se adicionar como amigo!",
            duration: 3500,
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
            Toastify({
                text: 'Solicitação de amizade enviada!',
                duration: 2000,
                style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
            }).showToast();
            setFriendEmail('');
        } else {
            Toastify({
                text: data.message || 'Erro ao enviar solicitação',
                duration: 2000,
                style: { background: "#ce1836" }
            }).showToast();
        }
    } catch (error) {
        console.error('Erro ao adicionar amigo:', error);
    }
};

  if (isLoading) {
    return <p>Carregando amigos...</p>;
  }

  return (
    <div className="w-full h-full border-[1px] border-zinc-400 px-14 py-8 rounded-xl bg-white text-lg space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-zinc-500 text-cl font-semibold">Lista de amigos</h2>
        <h1 className="text-zinc-900 font-bold text-2xl flex">
          Adicione mais amigos
          <span className="bg-roxo w-2 h-2 rounded-full p-1 flex mt-[18px] ml-2"></span>
        </h1>
        <p className="text-zinc-400">Adicione seus amigos para convidá-los para as suas próximas viagens</p>

        <div className="mt-6 px-4 py-2 border-[0.5px] border-zinc-300 rounded-xl flex items-center justify-between">
          <div className="flex gap-1 items-center flex-1">
            {emailRoxo}
            <input
              type="text"
              placeholder="Digite o email do amigo"
              value={friendEmail}
              onChange={(e) => setFriendEmail(e.target.value)}
              className="focus:outline-none w-full"
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
        <p className="text-zinc-400">Aqui ficam as pessoas que irão planejar e viajar junto com você!</p>
        <div className="w-full h-[290px] flex flex-col gap-5 mt-6 overflow-y-auto box-border">
          {friends.length > 0 ? (
            friends.map((friend) => (
              <div key={friend.id} className="rounded-xl border-[0.5px] px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-4 ">
                  <div className="flex gap-2">
                    {User}
                    <p className="text-lg font-semibold text-zinc-500 w-32 truncate">{friend.nome}</p>
                  </div>
                  <div className="w-[1px] h-10 bg-zinc-300" />
                  <p className="text-lg text-zinc-500">{friend.email}</p>
                </div>
                <button onClick={() => handleRemoveFriend(friend._id)}>
                  {lixeira}
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center font-semibold text-xl">
              <p className="text-center text-zinc-500">Parece que não há nenhum aqui.</p>
              <p className="text-zinc-500"> Clique em "adicionar" para encontrar seus amigos! </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
