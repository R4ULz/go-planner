import { useState } from "react"
import ActivityItem from "./ActivityItem";
import { Frame } from "../../icons/Frame";
import ModalAtividade from "./modalAtividade";
import { iconeCalendario2 } from "../../icons/Schedule2";
import { location } from "../../icons/location";

type Atividade = {
    id: number;
    name: string;
    date: string;
    time: string;
};



export default function Atividades({tripId}) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [atividades, setAtividades] = useState<Atividade[]>([]);

    const addAtividade = async (name: string, date: string, time: string) => {
        const activityData = {
            nome: name,
            descricao: '',  // Não temos um campo de descrição aqui, pode adicionar se necessário
            data: date,
            time: time,
            viagemId: tripId
        };

        try {
            const response = await fetch('/api/createActivity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activityData),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Atividade adicionada com sucesso!');
                setAtividades([...atividades, { id: data.id, name, date, time }]);
            } else {
                alert('Erro ao adicionar atividade: ' + data.error);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao adicionar a atividade.');
        }
    };
    
    return (
        <div className="font-rubik">
            <div className="flex flex-row">
                <div className="w-full">
                    <div className="flex">
                        <p className="font-bold text-xl">Atividades</p><span className="bg-laranja w-2 h-2 rounded-full p-1 flex mt-3 ml-1"></span>
                    </div>

                    <div className="mt-4 flex w-full gap-10">
                        {/* {atividades.length > 0 ? (
                            atividades.map((atividades) => (
                                <ActivityItem key={atividades.id} activity={atividades} />))
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                {Frame}
                                <p className="font-medium py-5">Opa! Não há nenhuma atividade aqui!</p>
                                <p className="text-gray-500">Se você quiser adicionar alguma atividade que </p>
                                <p className="text-gray-500">realizará na viagem, aperte em “Adicionar atividade”.</p>
                            </div>
                        )} */}
                        <div className="flex w-full gap-10">
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
                            <button onClick={() => setIsModalOpen(true)} className="text-white font-inter font-bold border-solid bg-laranjinha px-5 py-3 rounded-2xl flex gap-2 items-center">Adicionar Amigo +</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <ModalAtividade
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={addAtividade}
            />
        </div>
    )
}