import React, { useState } from "react";
import { calendariu } from "../../icons/teste"; // Ícone do calendário
import { iconeCalendario2 } from "../../icons/Schedule2";
import { location } from "../../icons/location";
import ActivityItem from "../../criarViagem/Atividades/ActivityItem";

export default function ModalViagem({ viagem, onClose }) {
    const [selectedItem, setSelectedItem] = useState("dadosPrincipais")

    if (!viagem) return null;

    const itemSelecionado = (item) => {
        setSelectedItem(item);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-full z-50">
            <div className="bg-white w-3/4 max-w-3xl rounded-lg p-6 shadow-lg relative border-rosinha border">
                <button className="absolute top-4 right-4 text-xl" onClick={onClose}>&times;</button>
                <p className="font-bold text-2xl flex">Visualizar planejamento <span className="bg-laranja w-2 h-2 rounded-full p-1 flex mt-4 ml-1"></span></p>
                <p className="text-zinc-500 mb-4">Acompanhe todo seu planejamento da viagem dos seus sonhos</p>

                <ul className="flex gap-10 border-b border-t items-center">
                    <li
                        className={`cursor-pointer flex gap-1 items-center font-bold ${selectedItem === "dadosPrincipais" ? "text-zinc-700" : "text-zinc-400"}`}
                        onClick={() => itemSelecionado("dadosPrincipais")}
                    >
                        <span className={`${selectedItem === "dadosPrincipais" ? "flex flex-row bg-laranjinha w-[4px] h-[16px] rounded-full top-6" : "hidden"}`}></span>
                        Dados Principais
                    </li>
                    <li
                        className={`cursor-pointer flex gap-1 items-center font-bold ${selectedItem === "atividades" ? "text-zinc-700" : "text-zinc-400"}`}
                        onClick={() => itemSelecionado("atividades")}
                    >
                        <span className={`${selectedItem === "atividades" ? "flex flex-row bg-laranjinha w-[4px] h-[16px] rounded-full top-6" : "hidden"}`}></span>
                        Atividades
                    </li>
                    <li
                        className={`cursor-pointer flex gap-1 items-center font-bold ${selectedItem === "listaConvidados" ? "text-zinc-700" : "text-zinc-400"}`}
                        onClick={() => itemSelecionado("listaConvidados")}
                    >
                        <span className={`${selectedItem === "listaConvidados" ? "flex flex-row bg-laranjinha w-[4px] h-[16px] rounded-full top-6" : "hidden"}`}></span>
                        Lista de convidados
                    </li>
                </ul>

                {selectedItem === "dadosPrincipais" ? (
                    <div className="space-y-4 mt-1">
                        <p className="font-bold text-2xl flex -mb-3">Dados Principais<span className="bg-rosinha w-2 h-2 rounded-full p-1 flex mt-4 ml-1"></span></p>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-zinc-700">Nome da sua viagem:</label>
                                <input type="text" value={viagem.titulo} readOnly className="w-full border border-gray-300 p-[10px] rounded-xl" />
                            </div>
                            <div className="w-1/4">
                                <label className="block text-zinc-700">Início da viagem:</label>
                                <div className="flex items-center gap-2 border border-gray-300 p-1 rounded-xl">
                                    <span>{calendariu}</span>
                                    <input type="text" value={new Date(viagem.dataInicio).toLocaleDateString("pt-BR")} readOnly className="w-full focus:outline-none" />
                                </div>
                            </div>
                            <div className="w-1/4">
                                <label className="block text-zinc-700">Fim da viagem:</label>
                                <div className="flex items-center gap-2 border border-gray-300 p-1 rounded-xl">
                                    <span>{calendariu}</span>
                                    <input type="text" value={new Date(viagem.fimViagem).toLocaleDateString("pt-BR")} readOnly className="w-full focus:outline-none" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2 space-y-5">
                                <div>
                                    <label className="block text-zinc-700 ">Local de partida:</label>
                                    <input type="text" value={viagem.partida} readOnly className="w-full border border-gray-300 p-2 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-zinc-700">Local de destino:</label>
                                    <input type="text" value={viagem.destino} readOnly className="w-full border border-gray-300 p-2 rounded-xl" />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <label className="block text-zinc-700">Descrição:</label>
                                <textarea value={viagem.descricao} readOnly className="w-full border border-gray-300 p-2 rounded-xl h-32 resize-none" />
                            </div>
                        </div>
                    </div>
                ) : selectedItem === "atividades" ? (
                    <div className="space-y-4 mt-1">
                        <p className="font-bold text-2xl flex -mb-3">Atividades<span className="bg-laranja w-2 h-2 rounded-full p-1 flex mt-4 ml-1"></span></p>
                        <div className="items-center">
                            <div className="border rounded-xl py-1 border-rosinha flex flex-row justify-between font-bold font-inter px-4 max-w-screen-2xl">
                                <p className="flex flex-row gap-2 items-center">{location}{viagem.destino}</p>
                                <div className="flex gap-2">
                                    <p className="flex flex-row gap-2 items-center">{iconeCalendario2}{new Date(viagem.dataInicio).toLocaleDateString("pt-BR")}</p>
                                    <p className="flex items-center">-</p>
                                    <p className="flex items-center">{new Date(viagem.fimViagem).toLocaleDateString("pt-BR")}</p>
                                </div>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    </div>
                        ) : (
                        <div>teste2</div>
                        )
            }
                    </div>
        </div>
            );
}
