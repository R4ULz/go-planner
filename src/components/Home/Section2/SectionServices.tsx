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
        "Não perca nenhum momento especial! Adicione as atividades da sua viagem, definindo o que vai fazer em cada dia e horário. Deixe tudo registrado para que sua aventura seja inesquecível e organizada. Com o Go.planner, cada etapa do seu roteiro fácil!",
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
    <div className="flex flex-col w-full max-w-screen-xl pt-10">
      <div className="h-[100px] w-[500px]">
        <div className="flex flex-row">
          <h1 className="font-rubik font-bold text-black text-4xl md:text-3xl ">
            Simplicidade e praticidade
          </h1>
          <span className="flex flex-row bg-rosinha w-2 h-2 rounded-full p-1 relative top-6 mx-1"></span>
        </div>
        <h6 className="font-rubik text-md text-zinc-700">
          Veja como você pode criar seu planejamento para a viagem perfeita!
        </h6>
      </div>
      <div className="w-full flex justify-between gap-10 items-start">
        <div className="flex flex-col w-2/5">
          <div className="p-7 gap-10 flex flex-col items-center">
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

        <div className="flex flex-col items-end justify-center gap-16 w-3/5">
          <div className="flex justify-center rounded-lg">
            <div className="relative w-[750px] h-[500px] rounded-md overflow-hidden">
              <Image
                src={selectedCard.image}
                alt={selectedCard.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button className="bg-gradient-to-r from-RosinhaEscurinho to-laranjinha text-white border px-16 py-3 gap-1 font-semibold rounded-xl flex flex-row text-xl items-center text-center justify-center ">
              {iconeCalendario} Planejar agora
            </button>
          </div>
        </div>
      </div>
      {/* <div className="ml-32 flex justify-center mb-20 -mt-28">
        <button className="bg-gradient-to-r from-RosinhaEscurinho to-laranjinha text-white border w-[15em] h-[3em] rounded-xl flex flex-row text-xl items-center text-center justify-center ">
          {iconeCalendario} Planejar agora
        </button>
      </div> */}
    </div>
  );
}