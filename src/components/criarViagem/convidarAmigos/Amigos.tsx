import { useState } from "react";
import { iconeCalendario2 } from "../../icons/Schedule2";
import { location } from "../../icons/location";
import { adicionarFriend } from "../../icons/addFriend";
import ModalAmigos from "./modalAmigos";

type Amigo = {
  email: string;
  id: string; // Incluímos o ID retornado pela API do banco de dados
};

interface ConvidarAmigosProps {
  tripData: {
    amigos: Amigo[];
  };
  handleUpdateTrip: (updatedData: Partial<{ amigos: Amigo[] }>) => void;
}

export default function ConvidarAmigos({ tripData, handleUpdateTrip }: ConvidarAmigosProps) {
  const { amigos } = tripData; // Pegando a lista de amigos do estado global
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para exibir erros

  // Função para adicionar um novo amigo à lista após a verificação no banco de dados
  const adicionarAmigo = async (emailAmigo: string) => {
    try {
      // Faz a requisição para a API que busca o usuário pelo e-mail
      const response = await fetch("/api/getUserByEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailAmigo}),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Se o usuário for encontrado, adiciona o amigo à lista
        const novoAmigo = { email: data.user.email, id: data.user.id };
        handleUpdateTrip({ amigos: [...amigos, novoAmigo] });
        setErrorMessage(null); // Remove a mensagem de erro, caso exista
        setIsModalOpen(false); // Fecha o modal
      } else {
        // Se o usuário não for encontrado, exibe uma mensagem de erro
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Erro ao buscar o usuário. Tente novamente.");
    }
  };

  return (
    <div className="font-rubik">
      <div className="flex flex-row">
        <div className="w-full">
          <div className="flex">
            <p className="font-bold text-xl">Convidar Amigos</p>
            <span className="bg-roxo w-2 h-2 rounded-full p-1 flex mt-3 ml-1"></span>
          </div>
          <div className="mt-4 flex w-full gap-16">
            <div className="w-5/6 items-center">
              <div className="border rounded-xl py-1 border-rosinha flex flex-row justify-between font-bold font-inter px-4 max-w-screen-2xl">
                <p className="flex flex-row gap-2 items-center">{location}Japão, Tokyo</p>
                <div className="flex gap-2">
                  <p className="flex flex-row gap-2 items-center">{iconeCalendario2}20/12/2024</p>
                  <p className="flex items-center">-</p>
                  <p className="flex items-center">25/12/2024</p>
                </div>
              </div>
            </div>
            <div className="w-1/6 flex justify-end items-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-white font-inter font-bold border-solid margin-0 bg-laranjinha px-5 py-3 rounded-2xl flex gap-2 items-center"
              >
                Adicionar Amigo {adicionarFriend}
              </button>
            </div>
          </div>
          <div className="py-7">
            <p className="font-inter font-bold text-zinc-700 text-lg">Lista de amigos</p>
            <ul>
              {amigos.map((amigo, index) => (
                <li key={index} className="border p-3 mb-2 rounded-lg flex gap-10 text-zinc-500">
                  <p className="font-inter font-bold">Amigo</p>
                  <p>{amigo.email}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mostra mensagem de erro, se existir */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <ModalAmigos
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={adicionarAmigo} // Passa a função adicionarAmigo para o modal
      />
    </div>
  );
}
