import { useState, useEffect } from "react";
import { emailRoxo } from "../../icons/emailRoxo";
import { person } from "../../icons/person";
import { useUser } from "@/src/contexts/UserContext";

type modalAtividadeProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (emailAmigo: string) => void;
};

export default function ModalAmigos({
  isOpen,
  onClose,
  onSave,
}: modalAtividadeProps) {
  const [emailAmigo, setEmailAmigo] = useState("");
  const [amigos, setAmigos] = useState([])
  const { user } = useUser();


  useEffect(() => {
    const fetchAmigos = async () => {
      if (!user?.id) {
        console.error("ID do usuário não encontrado.");
        return;
      }

      console.log("Buscando amigos para o usuário:", user.id);

      try {
        const response = await fetch('/api/getFriends', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar amigos");
        }

        const data = await response.json();
        setAmigos(data.friends);
      } catch (error) {
        console.error("Erro ao buscar amigos:", error);
      }
    };

    if (isOpen) {
      fetchAmigos();
    }
  }, [isOpen, user?.id]);

  useEffect(() => {
    if (!isOpen) {
      setEmailAmigo("");
    }
  }, [isOpen]);

  const handleInvite = (amigoEmail) => {
    onSave(amigoEmail);
    onClose();
  };

  const handleSave = () => {
    onSave(emailAmigo);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <button onClick={onClose} className="float-end text-zinc-400">
          X
        </button>
        <h2 className="text-xl font-bold -mb-2 flex pb-5">
          Adicionar Amigo
          <span className="bg-roxo w-2 h-2 rounded-full p-1 flex mt-3 ml-1"></span>
        </h2>
        <h2 className="text-sm mb-5 text-zinc-400">
          Convide a pessoa que irá planejar e viajar junto com você!{" "}
        </h2>
        <div className="mb-4">
          <div className="flex relative items-center border rounded-xl p-4">
            <i className={`absolute left-3`}>{emailRoxo}</i>
            <input
              type="text"
              className={`pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none`}
              value={emailAmigo}
              onChange={(e) => setEmailAmigo(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <button
            onClick={handleSave}
            className="py-1 bg-gradient-to-r to-rosinha from-laranja rounded-xl text-white w-full"
          >
            Salvar
          </button>
        </div>
        <div className="py-5">
          <hr />
          <div className="mt-5">
            <h2 className="text-xl font-bold flex ">
              Lista de amigos
              <span className="bg-roxo w-2 h-2 rounded-full p-1 flex mt-3 ml-1"></span>
            </h2>
            <p>Convide o(a) amigo(a) para planejar e viajar junto com voce!</p>
            <div className="border-zinc-300 border flex"></div>
            <ul>
              {amigos.length > 0 ? (
                amigos.map((amigo) => (
                  <li
                    key={amigo.id}
                    className="flex gap-3 p-3 mt-4 border-2 border-zinc-300 rounded-xl"
                  >
                    <div className="w-4/5 flex gap-3">
                      <p className="text-center font-inter gap-2 text-zinc-500 flex items-center w-1/2">
                        {person}
                        {amigo.nome}
                      </p>
                      <p className="text-center font-inter text-zinc-500 flex justify-center items-center w-1/2">
                        {amigo.email}
                      </p>
                    </div>
                    <div className="w-1/5">
                      <button
                        onClick={() => handleInvite(amigo?.email)}
                        className="flex border-2 border-laranja text-laranja rounded-xl px-2 justify-center items-center"
                      >
                        Convidar
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-zinc-500 mt-4">Nenhum amigo encontrado.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
