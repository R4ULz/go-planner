import React, { useEffect, useState } from "react";
import { calendariu } from "../../icons/teste"; // Ícone do calendário
import { iconeCalendario2 } from "../../icons/Schedule2";
import { location } from "../../icons/location";

export default function ModalViagem({ viagem, onClose }) {
    const [selectedItem, setSelectedItem] = useState("dadosPrincipais")
    const [atividades, setAtividades] = useState([])
    const [laodingAtividades, setLoadingAtividades] = useState(true)

    useEffect(() =>{
        const fetchAtividades = async () =>{
            if(!viagem || !viagem._id) return;
            setLoadingAtividades(true)

            try{
                const response = await fetch(`api/trip/getActivities?tripId=${viagem._id}`)
                if(!response.ok){
                    throw new Error("erro ao buscar atividades")
                }
                const atividadesData = await response.json()
                setAtividades(atividadesData);
            }catch(error){
                console.error("erro ao buscar atividades", error)
            }finally{
                setLoadingAtividades(false)
            }
        }

        fetchAtividades()
    }, [viagem])

    const toggleAtividade = async (globalIndex, currentStatus) => {
        try {
            const response = await fetch(`api/trip/updateActivityStatus`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ tripId: viagem._id, atividadeIndex: globalIndex, concluida: !currentStatus }),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar status da atividade");
            }

            setAtividades((prevAtividades) =>
                prevAtividades.map((atividade, index) =>
                    index === globalIndex
                        ? { ...atividade, concluida: !currentStatus }
                        : atividade
                )
            );
        } catch (error) {
            console.error("Erro ao atualizar atividade:", error);
        }
    };

    if (!viagem) return null;

    const itemSelecionado = (item) => {
        setSelectedItem(item);
    };

    const atividadesPorData = atividades.reduce((acc, atividade, globalIndex) => {
        const dataFormatada = new Date(atividade.data).toLocaleDateString('pt-BR');
        if (!acc[dataFormatada]) acc[dataFormatada] = [];
        acc[dataFormatada].push({ ...atividade, globalIndex });
        return acc;
    }, {});

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
                        <div className="items-center h-96 overflow-auto">
                        {laodingAtividades ? (
                                <p>Carregando atividades...</p>
                            ) : (
                                Object.keys(atividadesPorData).map((data) => (
                                    <div key={data} className="mb-4">
                                        <h3 className="font-bold text-lg">{data}</h3>
                                        <ul className="space-y-2">
                                            {atividadesPorData[data].map((atividade) => (
                                                <li key={atividade.globalIndex} className="flex items-center justify-between p-4 rounded-2xl border border-zinc-300">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={atividade.concluida}
                                                            onChange={() => toggleAtividade(atividade.globalIndex, atividade.concluida)}
                                                            className="h-5 w-5"
                                                        />
                                                        <span className={`${atividade.concluida ? "line-through text-gray-500 bg-gray-100" : "text-zinc-700"}`}>
                                                            {atividade.nome}
                                                        </span>
                                                    </div>
                                                    <span className="text-zinc-600">{atividade.horario}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ) : (
                        <div className="font-inter text-zinc-700 text-2xl p-5">Aqui teremos a parte de convidados da viagem</div>
                        )
            }
                    </div>
        </div>
            );
}
