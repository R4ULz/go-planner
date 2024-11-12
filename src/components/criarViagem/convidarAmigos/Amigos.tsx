import { useState } from "react";
import { iconeCalendario2 } from "../../icons/Schedule2";
import { location } from "../../icons/location";
import { adicionarFriend } from "../../icons/addFriend";
import ModalAmigos from "./modalAmigos";
import { User } from "../../icons/user";
import { lixeira } from "../../icons/lixeira";
import { frameUser } from "../../icons/FrameUser";

type Amigo = {
  email: string;
  nome: string;
  id: string;
};

interface ConvidarAmigosProps {
  tripData: {
    amigos: Amigo[];
    destino: string;
    DataIda: string;
    DataRetorno: string;
  };
  handleUpdateTrip: (updatedData: Partial<{ amigos: Amigo[] }>) => void;
}

export default function ConvidarAmigos({
  tripData,
  handleUpdateTrip,
}: ConvidarAmigosProps) {
  const { amigos, destino, DataIda, DataRetorno } = tripData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const adicionarAmigo = async (emailAmigo: string) => {
    try {
      const response = await fetch("/api/getUserByEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailAmigo }),
      });

      const data = await response.json();

      if (response.status === 200) {
        const novoAmigo = { email: data.user.email, id: data.user.id, nome: data.user.nome };
        handleUpdateTrip({ amigos: [...amigos, novoAmigo] });
        setErrorMessage(null); 
        setIsModalOpen(false); 
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Erro ao buscar o usuário. Tente novamente.");
    }
  };

  const removeAmigo = (id: string) => {
    const updatedAmigos = amigos.filter((amigo) => amigo.id !== id);
    handleUpdateTrip({ amigos: updatedAmigos });
  };

  function parseLocalDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  
  const formattedDataIda = DataIda ? parseLocalDate(DataIda).toLocaleDateString('pt-BR') : "Data não informada";
  const formattedDataVolta = DataRetorno ? parseLocalDate(DataRetorno).toLocaleDateString('pt-BR') : "Data não informada";

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
              <div className="border rounded-xl py-1 border-rosinha flex flex-row justify-between font-bold font-inter px-4">
              <p className="flex flex-row gap-2 items-center">{location}{destino}</p>
                <div className="flex gap-2">
                  <p className="flex flex-row gap-2 items-center">{iconeCalendario2}{formattedDataIda}</p>
                  <p className="flex items-center">-</p>
                  <p className="flex items-center">{formattedDataVolta}</p>
                </div>
              </div>
            </div>
            <div className="w-1/6 flex justify-end items-center mr-7">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-white font-inter font-bold border-solid margin-0 bg-laranjinha px-5 py-3 rounded-2xl flex gap-2 items-center"
              >
                Adicionar  {adicionarFriend}
              </button>
            </div>
          </div>
          <div className="py-7">
            <p className="font-inter font-bold text-zinc-700 text-lg">Lista de convidados</p>
            {amigos.length > 0 ? (
              <ul>
                {amigos.map((amigo) => (
                  <li
                    key={amigo.id}
                    className="border p-3 mb-2 rounded-lg flex gap-10 text-zinc-500 justify-between text-lg"
                  >
                    <div className="flex flex-row items-center">
                      <p className="pr-8 gap-2 font-inter font-bold flex items-center border-r-2 pr-2">
                        {User} {amigo.nome}
                      </p>
                      <p className="px-5">{amigo.email}</p>
                    </div>

                    <div className="flex justify-between ">
                      <p className="flex items-center px-5 gap-3 font-bold">
                        <span className="bg-laranjinha w-2 h-2 rounded-full p-1 flex mt- ml-1"></span>{" "}
                        Convite pendente
                      </p>
                      <button onClick={() => removeAmigo(amigo.id)} className="border-l-2 pl-2">
                        {lixeira}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center">
                {frameUser}
                <p className="font-medium py-5">Opa! Não há amigos aqui!</p>
                <p className="text-gray-500">Se você quiser adicionar algum amigo para poder </p>
                <p className="text-gray-500">ajudar no seu planejamento e na viagem, aperte em </p>
                <p className="text-gray-500">“Adicionar”.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mostra mensagem de erro, se existir */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <ModalAmigos
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={adicionarAmigo}
      />
    </div>
  );
}
