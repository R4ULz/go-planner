import ActivityItem from "./ActivityItem";
import { Frame } from "../../icons/Frame";
import ModalAtividade from "./modalAtividade";
import { iconeCalendario2 } from "../../icons/Schedule2";
import { location } from "../../icons/location";
import { useEffect, useState } from "react";

type Atividade = {
  id: number;
  name: string;
  date: string; 
  time: string;
};

interface AtividadesProps {
  tripData: {
    atividades: Atividade[];
  };
  handleUpdateTrip: (updatedData: Partial<{ atividades: Atividade[] }>) => void;
}

export default function Atividades({ tripData, handleUpdateTrip }: AtividadesProps) {

  const { atividades, destino, dataIda ,dataVolta } = tripData;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addAtividade = (name: string, date: string, time: string) => {
    const newAtividade = { id: atividades.length + 1, name, date, time };
    handleUpdateTrip({ atividades: [...atividades, newAtividade] }); // Atualizando o estado no Layout
  };

  const removeAtividade = (id: number) => {
    const updatedAtividades = atividades.filter((atividade) => atividade.id !== id);
    handleUpdateTrip({ atividades: updatedAtividades }); // Atualizando o estado no Layout
  };

  // Agrupando atividades por dia
  const atividadesPorDia = atividades.reduce((acc: Record<string, Atividade[]>, atividade) => {
    const { date } = atividade; 
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(atividade);
    return acc;
  }, {});

  return (
    <div className="font-rubik flex flex-col justify-center">
      <div className="flex flex-row">
        <div className="w-full">
          <div className="flex">
            <p className="font-bold text-xl">Atividades</p>
            <span className="bg-laranja w-2 h-2 rounded-full p-1 flex mt-3 ml-1"></span>
          </div>

          <div className="mt-4 flex w-full gap-16">
            <div className="w-5/6 items-center">
              <div className="border rounded-xl py-1 border-rosinha flex flex-row justify-between font-bold font-inter px-4 max-w-screen-2xl">
                <p className="flex flex-row gap-2 items-center">{location}{destino}</p>
                <div className="flex gap-2">
                  <p className="flex flex-row gap-2 items-center">{iconeCalendario2}{dataIda}</p>
                  <p className="flex items-center">-</p>
                  <p className="flex items-center">{dataVolta}</p>
                </div>
              </div>
            </div>
            <div className="w-1/6 flex justify-end items-center mr-7">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-white font-inter font-bold border-solid margin-0 bg-laranjinha px-5 py-3 rounded-2xl flex gap-2 items-center"
              >
                Adicionar Atividade+
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="custom-scrollbar pr-14 pt-5 overflow-y-auto max-h-[calc(75vh-150px)]">
        {atividades.length > 0 ? (
          Object.keys(atividadesPorDia).map((dia) => (
            <div key={dia} className="mb-6">
              <h3 className="text-lg font-bold mb-3">Dia {dia.split("-")[2]}</h3> 
              {atividadesPorDia[dia].map((atividade) => (
                <ActivityItem key={atividade.id} activity={atividade} onRemove={removeAtividade}/>
              ))}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            {Frame}
            <p className="font-medium py-5">Opa! Não há nenhuma atividade aqui!</p>
            <p className="text-gray-500">Se você quiser adicionar alguma atividade que </p>
            <p className="text-gray-500">realizará na viagem, aperte em “Adicionar atividade”.</p>
          </div>
        )}
      </div>

      <ModalAtividade isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={addAtividade} />
    </div>
  );
}
