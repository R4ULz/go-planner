import Image from "next/image";
import React, { useState } from "react";

import ServiceCard1 from "./ServiceCard1"
import { iconeCalendario } from "../../icons/Schedule"
import EX1 from "../../../../public/imgs/EXEMPLO1.png"
import EX2 from "../../../../public/imgs/Atividades.png"
import EX3 from "../../../../public/imgs/Convidar amigos.png"

export default function Services() {
    const [selectedContent, setSelectedContent] = useState(null);

    const handleCardClick = (imagePath) => {
        setSelectedContent({ imagePath });
    };

    

    return (
        <div className="flex flex-col w-full max-w-screen-xl pt-10">
            <div className="h-[100px] w-[500px]">
                <div className="flex flex-row">
                    <h1 className="font-rubik font-bold text-black text-4xl md:text-3xl ">Simplicidade e práticidade</h1><span className="flex flex-row bg-rosinha w-2 h-2 rounded-full p-1 relative top-6 mx-1"></span>
                </div>
                <h6 className="font-rubik text-md ">Mostrar as funcionalidades da nossa aplicação bem aqui</h6>
            </div>
            <div className="w-full flex justify-between items-start">
                <div className="flex flex-col w-2/5">

                    <div className="p-7 gap-10 flex flex-col items-center">
                        <ServiceCard1
                            title="Crie sua viajem"
                            description="Transforme seu sonho em realidade! No Go.planner, você pode criar sua viagem dos sonhos, escolhendo as datas, o local perfeito e até adicionando uma imagem inspiradora para ilustrar. Tudo do jeito que você imaginou! "
                            onClick={() => handleCardClick(EX1)}
                        />
                        <ServiceCard1
                            title="Adicione atividades"
                            description="Não perca nenhum momento especial! Adicione as atividades da sua viagem, definindo o que vai fazer em cada dia e horário. Deixe tudo registrado para que sua aventura seja inesquecível e organizada. Com o Go.planner, cada etapa do seu roteiro fácil!"
                            onClick={() => handleCardClick(EX2)}

                        />
                        <ServiceCard1
                            title="Convide seus amigos"
                            description="Viajar é ainda mais divertido com amigos! Com o Go.planner, você pode convidar seus amigos por e-mail para visualizarem ou colaborarem no planejamento. Todos juntos, criando memórias que vão durar para sempre! "
                            onClick={() => handleCardClick(EX3)}

                        />
                    </div>
                </div>

                <div className="flex flex-col items-end justify-center w-3/5">
                    <div className="flex justify-center rounded-lg">
                            {selectedContent ? (
                                <Image src= {selectedContent.imagePath} className="rounded-xl py-10" alt="Selected Content"/>
                        ) : (
                            <Image src= {EX1} className="rounded-xl" alt="Selected Content"/>
                        )}
                    </div>
                </div>
            </div>
            <div className="ml-32 flex justify-center mb-20 -mt-28">
                <button className="bg-gradient-to-r from-RosinhaEscurinho to-laranjinha text-white border w-[15em] h-[3em] rounded-xl flex flex-row text-xl items-center text-center justify-center ">
                    {iconeCalendario} Planejar agora
                </button>
            </div>
        </div>
    )
}