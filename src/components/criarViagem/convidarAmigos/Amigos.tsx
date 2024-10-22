import { useState } from "react"
import { iconeCalendario2 } from "../../icons/Schedule2";
import { location } from "../../icons/location";
import { addAmigo } from "../../icons/addFriend";
import ModalAmigos from "./modalAmigos";


type Atividade = {
    id: number;
    name: string;
    date: string;
    time: string;
};

export default function ConvidarAmigos() {
    const [atividades, setAtividades] = useState<Atividade[]>([]); //Éo estado para armazenar as ativiadades
    const [isModalOpen, setIsModalOpen] = useState(false)

    const addAtividade = (name: string, date: string, time: string) => {
        const newAtividade = { id: atividades.length + 1, name, date, time };
        setAtividades([...atividades, newAtividade]);
    }
    return (
        <div className="font-rubik">
            <div className="flex flex-row">
                <div className="w-full">
                    <div className="flex">
                        <p className="font-bold text-xl">Convidar Amigos</p><span className="bg-roxo w-2 h-2 rounded-full p-1 flex mt-3 ml-1"></span>
                    </div>
                    <div className="mt-4 flex w-full gap-10">
                        <div className="w-3/4 items-center">
                            <div className="border rounded-xl py-1 border-rosinha flex flex-row justify-between font-bold font-inter px-4">
                                <p className="flex flex-row gap-2 items-center">{location}Japão, Tokyo</p>
                                <div className="flex gap-2">
                                    <p className="flex flex-row gap-2 items-center">{iconeCalendario2}20/12/2024</p>
                                    <p className="flex items-center">-</p>
                                    <p className="flex items-center">25/12/2024</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/4 flex justify-center items-center">
                            <button onClick={() => setIsModalOpen(true)} className="text-white font-inter font-bold border-solid bg-laranjinha px-5 py-3 rounded-2xl flex gap-2 items-center">Adicionar Amigo {addAmigo}</button>
                        </div>
                    </div>
                    <div className="py-7">
                        <p className="font-inter font-bold text-zinc-700 text-lg">Lista de amigos</p>
                    </div>
                </div>
            </div>

            <ModalAmigos
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={addAtividade}
            />
        </div>
    )
}