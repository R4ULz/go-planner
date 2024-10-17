
import React, { useState } from "react";

import ServiceCard1 from "./ServiceCard1"
import { iconeCalendario } from "../../icons/Schedule"

export default function Services() {
    const [selectedContent, setSelectedContent] = useState(null);

    const handleCardClick = (title, description) => {
        setSelectedContent({ title, description });
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

                    <div className="p-4 gap-10 flex flex-col text-lg">
                        <ServiceCard1
                            title="Convide seus amigos"
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quaerat sit earum magnam cum ipsam voluptate distinctio
                            asperiores odio delectus voluptatum."
                            onClick={() => handleCardClick("Organize suas tarefas", "Atvidades")}
                        />
                        <ServiceCard1
                            title="Convide seus amigos"
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quaerat sit earum magnam cum ipsam voluptate distinctio
                            asperiores odio delectus voluptatum."
                            onClick={() => handleCardClick("Convide seus amigos", "Amigos")}

                        />
                        <ServiceCard1
                            title="Convide seus amigos"
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Quaerat sit earum magnam cum ipsam voluptate distinctio
                            asperiores odio delectus voluptatum."
                            onClick={() => handleCardClick("Acompanhe seu progresso", "Dados")}

                        />
                    </div>
                </div>

                <div className="flex flex-col items-end justify-center w-3/5">
                    <div className="flex justify-center bg-gray-300 rounded-lg w-[40rem] h-[30rem]">
                        {selectedContent ? (
                            <div>
                                <h2 className="text-2xl font-bold">{setSelectedContent.title}</h2>
                                <p className="text=lg">{selectedContent.description}</p>
                            </div>
                        ) : (
                            <p>oi</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="ml-72 flex justify-center mb-10">
                <button className="bg-gradient-to-r from-RosinhaEscurinho to-laranjinha text-white border w-[15em] h-[3em] rounded-xl flex flex-row text-xl items-center text-center justify-center ">
                    {iconeCalendario} Planejar agora
                </button>
            </div>
        </div>
    )
}