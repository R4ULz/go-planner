import Image from "next/image";
import React, { useState } from "react";

import ServiceCard1 from "./ServiceCard1";
import { iconeCalendario } from "../../icons/Schedule";
// Importe ou defina suas imagens corretamente

export default function Services() {
  const options = [
    {
      id: 1,
      name: "Dados da viagem",
      title: "Planeje e viaje",
      description:
        "Transforme seu sonho em realidade! No Go.planner, você pode criar sua viagem dos sonhos, escolhendo as datas, o local perfeito e até adicionando uma imagem inspiradora para ilustrar. Tudo do jeito que você imaginou!",
      image: "/imgs/mainData.png",
    },
    {
      id: 2,
      name: "Criação de atividade",
      title: "Adicione Atividades",
      description:
        "Não perca nenhum momento especial! Adicione as atividades da sua viagem, definindo o que vai fazer em cada dia e horário. Deixe tudo registrado para que sua aventura seja inesquecível! Com o Go.planner, cada etapa do seu roteiro fácil!",
      image: "/imgs/createActivities.png",
    },
    {
      id: 3,
      name: "Convidados",
      title: "Convide seus amigos",
      description:
        "Viajar é ainda mais divertido com amigos! Com o Go.planner, você pode convidar seus amigos por e-mail para visualizarem ou colaborarem no planejamento. Todos juntos, criando memórias que vão durar para sempre!",
      image: "/imgs/invitesList.png",
    },
  ];

  const [selectedCard, setSelectedCard] = useState(options[0]);

  return (
    <div className="flex flex-col w-full max-w-screen-xl md:pt-10 sm:pt-10 pl-10">
      <div className="md:h-[100px] w-full sm:h-[50px]">
        <div className="flex flex-row md:justify-start sm:justify-center">
          <h1 className="font-rubik font-bold text-black md:text-4xl md:text-3xl sm:text-2xl">
            Simplicidade e praticidade
          </h1>
          <span className="flex flex-row bg-rosinha w-2 h-2 rounded-full p-1 relative md:top-6 mx-1 sm:top-5"></span>
        </div>
        <h6 className="font-rubik text-md text-zinc-700 md:text-start sm:text-center">
          Veja como você pode criar seu planejamento para a viagem perfeita!
        </h6>
      </div>
      <div className="w-full flex md:flex-row justify-between gap-10 items-start flex-col">
        <div className="flex flex-col md:w-2/5 sm:w-full">
          <div className="p-7 md:gap-10 flex flex-col items-center sm:gap-2">
            {options.map((option) => (
              <ServiceCard1
                key={option.id}
                title={option.title}
                description={option.description}
                onClick={() => setSelectedCard(option)}
                option={option.id}
                isActive={selectedCard.id === option.id}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-16 md:w-3/5 sm:w-full">
          <div className="flex justify-center rounded-lg">
            <div className="relative md:w-[750px] md:h-[500px] rounded-md overflow-hidden sm:w-[500px] h-[320px] ">
              <Image
                src={selectedCard.image}
                alt={selectedCard.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>
          <div className="w-full flex md:justify-end sm:justify-center sm:p-5">
            <button className="bg-gradient-to-r from-RosinhaEscurinho to-laranjinha text-white border px-16 py-3 gap-1 font-semibold rounded-xl flex flex-row text-xl items-center text-center justify-center ">
              {iconeCalendario} Planejar agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}