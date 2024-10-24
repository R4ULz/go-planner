import { useState, useEffect } from "react";
import { emailRoxo } from "../../icons/emailRoxo";

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

  useEffect(() => {
    if (!isOpen) {
      setEmailAmigo(""); 
    }
  }, [isOpen]);

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
      </div>
    </div>
  );
}
