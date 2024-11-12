import React, { useEffect, useState } from "react";
import { calendariu } from "../../icons/teste"; // Ícone do calendário
import axios from "axios";

export default function ModalViagem({ viagem, buscarViagens, onClose }) {
    const [selectedItem, setSelectedItem] = useState("dadosPrincipais")
    const [atividades, setAtividades] = useState([])
    const [laodingAtividades, setLoadingAtividades] = useState(true)
    const [editavel, setEditavel] = useState(false)
    const [suggestionsPartida, setSuggestionsPartida] = useState<any[]>([]);
    const [suggestionsDestino, setSuggestionsDestino] = useState<any[]>([]);

    const [dadosViagem, setDadosViagem] = useState({
        titulo: viagem.titulo,
        dataInicio: viagem.dataInicio,
        fimViagem: viagem.fimViagem,
        partida: viagem.partida,
        destino: viagem.destino,
        descricao: viagem.descricao,
    })

    const fetchLocationSuggestions = async (inputValue: string, type: string) => {
        if (inputValue.length > 2) {
            try {
                const response = await axios.get(
                    `https://eu1.locationiq.com/v1/autocomplete.php`,
                    {
                        params: {
                            key: process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY,
                            q: inputValue,
                            format: "json",
                        },
                    }
                );

                if (type === "partida") {
                    setSuggestionsPartida(response.data);
                } else if (type === "destino") {
                    setSuggestionsDestino(response.data);
                }
            } catch (error) {
                console.error("Erro ao buscar sugestões de localizações:", error);
            }
        } else {
            if (type === "partida") {
                setSuggestionsPartida([]);
            } else if (type === "destino") {
                setSuggestionsDestino([]);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "destino") {
            fetchLocationSuggestions(value, "destino");
        } else if (name === "partida") {
            fetchLocationSuggestions(value, "partida");
        }
    };

    const handleSuggestionClick = (suggestion: any, type: string) => {
        if (type === "partida") {
            setSuggestionsPartida([]);
        } else if (type === "destino") {
            setSuggestionsDestino([]);
        }
    };

    const habilitarEdicao = async () => {
        await fetchViagem();
        setEditavel(true);
    };

    const cancelarEdicao = () => {
        setEditavel(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDadosViagem((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchAtividades = async () => {
            if (!viagem || !viagem._id) return;
            setLoadingAtividades(true)

            try {
                const response = await fetch(`api/trip/getActivities?tripId=${viagem._id}`)
                if (!response.ok) {
                    throw new Error("erro ao buscar atividades")
                }
                const atividadesData = await response.json()
                setAtividades(atividadesData);
            } catch (error) {
                console.error("erro ao buscar atividades", error)
            } finally {
                setLoadingAtividades(false)
            }
        }

        fetchAtividades()
    }, [viagem])

    const fetchViagem = async () => {
        try {
            setLoadingAtividades(true);
            const response = await fetch(`/api/trip/findTripById/${viagem._id}`);
            if (!response.ok) throw new Error("Erro ao buscar dados da viagem");

            const updatedData = await response.json();
            setDadosViagem({
                titulo: updatedData.titulo,
                dataInicio: updatedData.dataInicio ? new Date(updatedData.dataInicio).toISOString().slice(0, 10) : "",
                fimViagem: updatedData.fimViagem ? new Date(updatedData.fimViagem).toISOString().slice(0, 10) : "",
                partida: updatedData.partida,
                destino: updatedData.destino,
                descricao: updatedData.descricao
            });
            setAtividades(updatedData.atividades || []);
        } catch (error) {
            console.error("Erro ao buscar dados da viagem", error);
        } finally {
            setLoadingAtividades(false);
        }
    };

    const atualizarViagem = async () => {
        try {
            const response = await fetch(`/api/trip/updateTripById/${viagem._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosViagem),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar a viagem");
            }

            const updatedTrip = await response.json();
            alert("Viagem atualizada com sucesso!");
            setEditavel(false);
            await buscarViagens();
        } catch (error) {
            console.error("Erro ao atualizar viagem:", error);
            alert("Erro ao atualizar a viagem.");
        }
    };


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
                                <input type="text" name="titulo" value={dadosViagem.titulo} readOnly={!editavel} onChange={handleInputChange} className="w-full border border-gray-300 p-[10px] rounded-xl" />
                            </div>
                            <div className="w-1/4">
                                <label className="block text-zinc-700">Início da viagem:</label>
                                <div className="flex items-center gap-2 border border-gray-300 p-1 rounded-xl">
                                    <span>{calendariu}</span>
                                    <input type="text" name="dataInicio" value={new Date(dadosViagem.dataInicio).toLocaleDateString("pt-BR")} onChange={handleInputChange} readOnly={!editavel} className="w-full focus:outline-none" />
                                </div>
                            </div>
                            <div className="w-1/4">
                                <label className="block text-zinc-700">Fim da viagem:</label>
                                <div className="flex items-center gap-2 border border-gray-300 p-1 rounded-xl">
                                    <span>{calendariu}</span>
                                    <input type="text" name="fimViagem" value={new Date(dadosViagem.fimViagem).toLocaleDateString("pt-BR")} onChange={handleInputChange} readOnly={!editavel} className="w-full focus:outline-none" />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2 space-y-5">
                                <div>
                                    <label className="block text-zinc-700 ">Local de partida:</label>
                                    <input type="text" name="partida" value={dadosViagem.partida} readOnly={!editavel} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-xl" />
                                    {suggestionsPartida.length > 0 && (
                                        <ul className="absolute z-10 top-full left-0 right-0 border border-zinc-300 mt-2 rounded-lg max-h-40 overflow-y-auto bg-white">
                                            {suggestionsPartida.map((suggestion: any, index: number) => (
                                                <li
                                                    key={index}
                                                    className="p-2 cursor-pointer hover:bg-zinc-200"
                                                    onClick={() => handleSuggestionClick(suggestion, "partida")}
                                                >
                                                    {suggestion.display_name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-zinc-700">Local de destino:</label>
                                    <input type="text" name="destino" value={dadosViagem.destino} readOnly={!editavel} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-xl" />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <label className="block text-zinc-700">Descrição:</label>
                                <textarea name="descricao" value={dadosViagem.descricao} readOnly={!editavel} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-xl h-32 resize-none" />
                            </div>
                        </div>
                        <hr className="border-spacing-0 border-zinc-400" />
                        {editavel ? (
                            <div className=" flex float-end gap-5">
                                <button onClick={cancelarEdicao} className="float-end border border-laranja px-4 py-1 text-laranja rounded-xl font-semibold hover:bg-laranja hover:text-white">Cancelar</button>
                                <button onClick={habilitarEdicao} className="float-end border bg-laranja px-4 py-1 text-white rounded-xl font-semibold hover:border-laranja hover:bg-white hover:text-laranja">Atualizar viagem</button>
                            </div>
                        ) : (
                            <button onClick={habilitarEdicao} className="float-end border border-laranja px-4 py-1 text-laranja rounded-xl font-semibold hover:bg-laranja hover:text-white">Editar viagem</button>
                        )}
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
