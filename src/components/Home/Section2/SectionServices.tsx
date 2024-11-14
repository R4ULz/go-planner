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
        "Adicione as atividades da sua viagem, definindo o que vai fazer em cada dia e horário. Deixe tudo registrado para que sua aventura seja inesquecível! Com o Go.planner, seu roteiro fica muito mais fácil!",
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
    <div className="flex flex-col w-full max-w-screen-xl md:pt-10 pt-10 p-1 md:p-10">
      <div className="md:h-[100px] w-full sm:h-[50px]">
        <div className="flex flex-row md:justify-start justify-center">
          <h1 className="font-rubik font-bold text-black md:text-4xl text-2xl">
            Simplicidade e praticidade
          </h1>
          <span className="flex flex-row bg-rosinha w-2 h-2 rounded-full p-1 relative md:w-2 md:h-2 md:top-7 mx-1 md:top-5 top-5 w-1 h-1"></span>
        </div>
        <h6 className="font-rubik text-md text-zinc-700 md:text-start text-center">
          Veja como você pode criar seu planejamento para a viagem perfeita!
        </h6>
      </div>
      <div className="w-full flex md:flex-row justify-between gap-10 items-start flex-col">
        <div className="flex flex-col md:w-2/5 w-full">
          <div className="p-4 w-full md:gap-10 flex flex-col items-center gap-2">
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

        <div className="flex flex-col justify-center gap-16 md:w-3/5 w-full">
          <div className="rounded-lg">
            <div className="relative md:w-[750px] md:h-[500px] rounded-md overflow-hidden w-full h-[250px] ">
              <Image
                src={selectedCard.image}
                alt={selectedCard.name}
                fill
                className="rounded-md"
              />
            </div>
          </div>
          <div className="w-full flex md:justify-end justify-center p-5">
            <button className="w-[250px] md:hidden flex gap-1 items-center font-inter justify-center bg-gradient-to-r from-rosinha to-laranja px-3 py-2 text-white rounded-xl font-bold ">
              {iconeCalendario} Planejar agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}