import React, { useEffect, useState } from "react";
import { calendariu } from "../../icons/teste"; // Ícone do calendário
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@/src/contexts/UserContext";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export default function ModalViagem({ viagem, buscarViagens, onClose }) {
    const [selectedItem, setSelectedItem] = useState("dadosPrincipais");
    const [atividades, setAtividades] = useState([]);
    const [topicos, setTopicos] = useState([]);
    const [loadingAtividades, setLoadingAtividades] = useState(true);
    const [loadingTopicos, setLoadingTopicos] = useState(true);
    const [editavel, setEditavel] = useState(false);
    const [novaAtividade, setNovaAtividade] = useState({
        nome: "",
        data: "",
        horario: "",
    });
    const [adicionandoAtividade, setAdicionandoAtividade] = useState(false);
    const [convidados, setConvidados] = useState([]);
    const [loadingConvidados, setLoadingConvidados] = useState(true);
    const { user } = useUser()

    const [dadosViagem, setDadosViagem] = useState({
        titulo: viagem.titulo,
        dataInicio: viagem.dataInicio ? new Date(viagem.dataInicio).toISOString().slice(0, 10) : "",
        fimViagem: viagem.fimViagem ? new Date(viagem.fimViagem).toISOString().slice(0, 10) : "",
        partida: viagem.partida,
        destino: viagem.destino,
        descricao: viagem.descricao,
    });

    useEffect(() => {
        setDadosViagem({
            titulo: viagem.titulo,
            dataInicio: viagem.dataInicio ? new Date(viagem.dataInicio).toISOString().slice(0, 10) : "",
            fimViagem: viagem.fimViagem ? new Date(viagem.fimViagem).toISOString().slice(0, 10) : "",
            partida: viagem.partida,
            destino: viagem.destino,
            descricao: viagem.descricao,
        });
    }, [viagem]);

    const isEditor = (() => {
        console.log("Usuário logado:", user?.id);
        console.log("Criador da viagem:", viagem.criador);
        console.log("Convidados carregados:", convidados);

        const criadorEhEditor = viagem.criador?.toString() === user?.id?.toString();
        console.log("É criador da viagem:", criadorEhEditor);

        const convidadoEhEditor = convidados.some((convidado) => {
            console.log("Verificando convidado:", convidado);
            return (
                (convidado.id?.toString() === user?.id?.toString() ||
                    convidado.amigoId?._id?.toString() === user?.id?.toString() ||
                    convidado.amigoId?.toString() === user?.id?.toString()) &&
                convidado.permissao === "EDITOR"
            );
        });

        console.log("Convidado é editor:", convidadoEhEditor);

        return criadorEhEditor || convidadoEhEditor;
    })();

    const habilitarEdicao = () => {
        if (isEditor) {
            setEditavel(true);
            setDadosViagem({
                titulo: viagem.titulo || "",
                dataInicio: viagem.dataInicio || "",
                fimViagem: viagem.fimViagem || "",
                partida: viagem.partida || "",
                destino: viagem.destino || "",
                descricao: viagem.descricao || ""
            });
        } else {
            Toastify({
                text: 'Você não tem permissão para editar esta viagem!',
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
                style: {
                    background: "#ce1836",
                }
            }).showToast();
        }
    };

    const desabilitarEdicao = () => {
        setEditavel(false)
    }

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
            setLoadingAtividades(true);

            try {
                const response = await fetch(`api/trip/getActivities?tripId=${viagem._id}`);
                if (!response.ok) throw new Error("Erro ao buscar atividades");

                const atividadesData = await response.json();
                setAtividades(atividadesData);
            } catch (error) {
                console.error("Erro ao buscar atividades", error);
            } finally {
                setLoadingAtividades(false);
            }
        };

        fetchAtividades();
    }, [viagem]);


    useEffect(() => {
        const fetchConvidados = async () => {
            if (!viagem || !viagem.amigos || viagem.amigos.length === 0) {
                console.log("Nenhuma viagem ou amigos encontrados."); // Debug
                setConvidados([]); // Garante que zera os convidados se não houver amigos
                setLoadingConvidados(false); // Atualiza o estado de carregamento
                return;
            }
    
            console.log("Viagem carregada com amigos:", viagem.amigos); // Debug
    
            try {
                const convidadosDetalhes = await Promise.all(
                    viagem.amigos.map(async (amigo) => {
                        try {
                            const amigoId = typeof amigo.amigoId === "object" ? amigo.amigoId._id : amigo.amigoId;
                            console.log("Buscando dados do convidado com ID:", amigoId); // Debug
    
                            const response = await fetch("/api/getUserById", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ id: amigoId }),
                            });
    
                            if (!response.ok) throw new Error(`Erro ao buscar convidado com ID ${amigoId}`);
                            
                            const data = await response.json();
                            console.log("Dados do convidado recebido:", data); // Debug
    
                            return { ...data.user, permissao: amigo.permissao, status: amigo.status };
                        } catch (error) {
                            console.error(`Erro ao buscar convidado ${amigo.amigoId}:`, error);
                            return null; // Retorna null em caso de erro
                        }
                    })
                );
    
                const convidadosFiltrados = convidadosDetalhes.filter(Boolean); // Remove valores nulos
                setConvidados(convidadosFiltrados);
                console.log("Convidados carregados:", convidadosFiltrados); // Debug final
            } catch (error) {
                console.error("Erro ao buscar convidados:", error);
            } finally {
                setLoadingConvidados(false);
            }
        };

        fetchConvidados();
    }, [viagem]);

    useEffect(() => {
        const fetchTopicos = async () => {
            if (!viagem || !viagem._id) return;
    
            setLoadingTopicos(true);
            try {
                const response = await fetch(`/api/trip/getTopics?tripId=${viagem._id}`);
                if (!response.ok) throw new Error("Erro ao buscar tópicos");
    
                const data = await response.json();
                console.log("Resposta da API de tópicos:", data); // Log da resposta da API
    
                // Atualizando o estado com os tópicos recebidos
                setTopicos(data.trip.topicos || []);
            } catch (error) {
                console.error("Erro ao buscar tópicos:", error);
            } finally {
                setLoadingTopicos(false);
            }
        };
    
        fetchTopicos();
    }, [viagem]);
    
    const fetchViagem = async () => {
        try {
            setLoadingAtividades(true);
            setLoadingConvidados(true);

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
            setConvidados(updatedData.convidados || []);

        } catch (error) {
            console.error("Erro ao buscar dados da viagem", error);
        } finally {
            setLoadingAtividades(false);
            setLoadingConvidados(false)
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

            if (!response.ok) throw new Error("Erro ao atualizar a viagem");

            Toastify({
                text: 'Viagem editada com sucesso!',
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
            setEditavel(false);
            await fetchViagem(); // Refresca os dados após atualizar
            await buscarViagens(); // Atualiza a lista de viagens no componente pai, se necessário
        } catch (error) {
            console.error("Erro ao atualizar viagem:", error);
            Toastify({
                text: 'Erro ao atualizar viagem!',
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
                style: {
                    background: "#ce1836",
                }
            }).showToast();
        }
    };

    const toggleAtividade = async (atividadeId, currentStatus) => {
        console.log("Toggling atividade ID:", atividadeId, "Current Status:", currentStatus);
        try {
            const response = await fetch(`/api/trip/updateActivityStatus`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ tripId: viagem._id, atividadeId, concluida: !currentStatus }),
            });

            if (!response.ok) throw new Error("Erro ao atualizar status da atividade");

            const fetchAtividades = await fetch(`/api/trip/getActivities?tripId=${viagem._id}`);
            if (!fetchAtividades.ok) throw new Error("Erro ao buscar atividades");

            const atividadesAtualizadas = await fetchAtividades.json();
            setAtividades(atividadesAtualizadas);
            console.log("Atividades atualizadas:", atividadesAtualizadas);
        } catch (error) {
            console.error("Erro ao atualizar atividade:", error);
        }
    };

    if (!viagem) return null;

    const itemSelecionado = (item) => {
        setSelectedItem(item);
    };

    const dataMinima = dadosViagem.dataInicio;
    const dataMaxima = dadosViagem.fimViagem

    const atividadesPorData = atividades
        .slice() // Cria uma cópia do array para evitar mutação direta
        .sort((a, b) => new Date(a.data) - new Date(b.data)) // Ordena as atividades por data em ordem crescente
        .reduce((acc, atividade, globalIndex) => {
            const adjustedDate = new Date(atividade.data);
            adjustedDate.setHours(adjustedDate.getHours() + 12);

            const dataFormatada = adjustedDate.toLocaleDateString("pt-BR");

            if (!acc[dataFormatada]) acc[dataFormatada] = [];
            acc[dataFormatada].push({ ...atividade, globalIndex });
            return acc;
        }, {});

    const abrirFormularioAtividade = () => setAdicionandoAtividade(true)

    const fecharFormularioAtividade = () => {
        setAdicionandoAtividade(false)
        setNovaAtividade({ nome: "", data: "", horario: "" })
    }

    const adicionarAtividade = async () => {
        if (!novaAtividade.nome || !novaAtividade.horario) {
            Toastify({
                text: 'Preencha todos os campos da atividade!',
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
                style: {
                    background: "#ce1836",
                }
            }).showToast();
            return;
        }

        const atividadeComId = {
            ...novaAtividade,
            id: uuidv4(),
        };

        try {
            const response = await fetch(`/api/trip/addActivityToTrip`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ tripId: viagem._id, atividade: atividadeComId }),
            });

            if (!response.ok) throw new Error("Erro ao adicionar a atividade");

            const atividadesAtualizadas = await response.json();
            setAtividades(atividadesAtualizadas);
            fecharFormularioAtividade();
            setNovaAtividade({ nome: "", data: "", horario: "" });
        } catch (error) {
            console.error("Erro ao adicionar atividade:", error);
            Toastify({
                text: 'Erro ao adicionar atividade!',
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
                style: {
                    background: "#ce1836",
                }
            }).showToast();
        }
    };

    const atualizarPapelConvidado = async (guestId, novaPermissao) => {
        try {
            const response = await fetch(`/api/trip/updateGuestRole`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tripId: viagem._id,
                    guestId,
                    permissao: novaPermissao,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                Toastify({
                    text: 'Papel do convidado alterado com sucesso!',
                    duration: 3000,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
                console.log("Convidado atualizado:", data.guest);
            } else {
                const errorData = await response.json();
                console.error("Erro ao atualizar papel:", errorData.message);
                Toastify({
                    text: errorData.message || "Erro ao atualizar papel do convidado.",
                    duration: 3000,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true,
                    style: {
                        background: "#ce1836",
                    }
                }).showToast();
            }
        } catch (error) {
            console.error("Erro ao atualizar papel do convidado:", error);
            Toastify({
                text: "Erro ao atualizar papel do convidado.",
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
                style: {
                    background: "#ce1836",
                }
            }).showToast();
        }
    };

console.log("Estado atual de selectedItem:", selectedItem);
console.log("Estado atual de topicos:", topicos);

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
                    <li
                        className={`cursor-pointer flex gap-1 items-center font-bold ${selectedItem === "topicos" ? "text-zinc-700" : "text-zinc-400"}`}
                        onClick={() => itemSelecionado("topicos")}
                    >
                        <span className={`${selectedItem === "topicos" ? "flex flex-row bg-laranjinha w-[4px] h-[16px] rounded-full top-6" : "hidden"}`}></span>
                        Tópicos
                    </li>
                </ul>

                {selectedItem === "dadosPrincipais" ? (
                    <div className="space-y-4 mt-1">
                        <p className="font-bold text-2xl flex -mb-3">Dados Principais<span className="bg-rosinha w-2 h-2 rounded-full p-1 flex mt-4 ml-1"></span></p>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-zinc-700">Nome da sua viagem:</label>
                                <input type="text" name="titulo" value={dadosViagem.titulo} disabled={!editavel} onChange={handleInputChange} className="w-full border border-gray-300 p-[10px] rounded-xl" />
                            </div>
                            <div className="w-1/4">
                                <label className="block text-zinc-700">Início da viagem:</label>
                                <div className="flex items-center gap-2 border border-gray-300 p-1 rounded-xl">
                                    <span>{calendariu}</span>
                                    <input type="date" name="dataInicio" value={dadosViagem.dataInicio} onChange={handleInputChange} disabled={!editavel} className="w-full focus:outline-none" />
                                </div>
                            </div>
                            <div className="w-1/4">
                                <label className="block text-zinc-700">Fim da viagem:</label>
                                <div className="flex items-center gap-2 border border-gray-300 p-1 rounded-xl">
                                    <span>{calendariu}</span>
                                    <input type="date" name="fimViagem" value={dadosViagem.fimViagem} onChange={handleInputChange} disabled={!editavel} className="w-full focus:outline-none" />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2 space-y-5">
                                <div>
                                    <label className="block text-zinc-700">Local de partida:</label>
                                    <input type="text" name="partida" value={dadosViagem.partida} disabled={!editavel} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-zinc-700">Local de destino:</label>
                                    <input type="text" name="destino" value={dadosViagem.destino} disabled={!editavel} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-xl" />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <label className="block text-zinc-700">Descrição:</label>
                                <textarea name="descricao" value={dadosViagem.descricao} disabled={!editavel} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-xl h-32 resize-none" />
                            </div>
                        </div>
                        <hr className="border-spacing-0 border-zinc-400" />
                        {editavel ? (
                            <div className="flex float-end gap-5">
                                <button onClick={desabilitarEdicao} className="float-end border  border-laranja px-4 py-1 text-laranja rounded-xl font-semibold hover:bg-laranja hover:text-white">Cancelar</button>
                                <button onClick={atualizarViagem} className="float-end  bg-laranja px-4 py-1 text-white rounded-xl font-semibold">Atualizar viagem</button>
                            </div>
                        ) : (
                            <button
                                onClick={habilitarEdicao}
                                disabled={!isEditor}
                                className={`float-end border px-4 py-1 text-laranja rounded-xl font-semibold ${isEditor ? "hover:bg-laranja hover:text-white" : "opacity-50 cursor-not-allowed"
                                    }`}
                            >
                                Editar viagem
                            </button>
                        )}
                    </div>
                ) : selectedItem === "atividades" ? (
                    <div className="space-y-4 mt-1">
                        <div className="flex justify-between">
                            <p className="items-center font-bold text-2xl flex -mb-3">Atividades<span className="bg-laranja w-2 h-2 rounded-full p-1 flex mt-4 ml-1"></span></p>
                            <button onClick={abrirFormularioAtividade} className="text-white font-inter font-bold text-sm border-solid margin-0 bg-laranjinha px-2 py-3 rounded-2xl flex gap-2 items-center">Adicionar Atividade <p className="text-xl">+</p></button>
                        </div>
                        {adicionandoAtividade && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
                                    <button onClick={fecharFormularioAtividade} className="absolute top-4 right-4 text-xl">&times;</button>
                                    <h2 className="text-xl font-bold mb-2 flex">
                                        Adicionar Atividade
                                        <span className="bg-laranja w-2 h-2 rounded-full p-1 flex mt-3 ml-1"></span>
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <input
                                                type="text"
                                                name="nome"
                                                placeholder="Nome da Atividade:"
                                                value={novaAtividade.nome}
                                                onChange={(e) => setNovaAtividade({ ...novaAtividade, nome: e.target.value })}
                                                className="w-full border border-gray-300 p-2 rounded-xl"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="w-1/4">
                                                <input
                                                    type="time"
                                                    name="horario"
                                                    value={novaAtividade.horario}
                                                    onChange={(e) => setNovaAtividade({ ...novaAtividade, horario: e.target.value })}
                                                    className="w-full border border-gray-300 p-2 rounded-xl"
                                                />
                                            </div>
                                            <div className="w-3/4">
                                                <input
                                                    type="date"
                                                    name="data"
                                                    value={novaAtividade.data}
                                                    min={dataMinima}
                                                    max={dataMaxima}
                                                    onChange={(e) => setNovaAtividade({ ...novaAtividade, data: e.target.value })}
                                                    className="w-full border border-gray-300 p-2 rounded-xl"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end space-x-4">
                                            <button onClick={fecharFormularioAtividade} className="px-4 py-2 text-zinc-600 border border-zinc-300 rounded-xl">Cancelar</button>
                                            <button onClick={adicionarAtividade} className="bg-laranja px-4 py-2 text-white rounded-xl font-semibold">Adicionar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="items-center h-96 overflow-auto">
                            {loadingAtividades ? (
                                <p>Carregando atividades...</p>
                            ) : (
                                Object.keys(atividadesPorData).map((data) => (
                                    <div key={data} className="mb-4">
                                        <h3 className="font-bold text-lg">{data}</h3>
                                        <ul className="space-y-2">
                                            {atividadesPorData[data].map((atividade) => (
                                                <li key={atividade.id} className="flex items-center justify-between p-4 rounded-2xl border border-zinc-300">
                                                    <div className="flex items-center gap-2">
                                                        <label className="inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="hidden peer"
                                                                checked={atividade.concluida}
                                                                onChange={() => toggleAtividade(atividade.id, atividade.concluida)}
                                                            />
                                                            <span className="w-5 h-5 bg-white border border-rosinha rounded-md peer-checked:bg-rosinha peer-checked:border-rosinha transition duration-200 flex items-center justify-center">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="size-5 text-white"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M5 13l4 4L19 7"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </label>
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
                ) : selectedItem === "topicos" ? (
                    <div className="space-y-4 mt-1">
                        <p className="font-bold text-2xl flex -mb-3">Tópicos</p>
                        {loadingTopicos ? (
                            <p>Carregando tópicos...</p>
                        ) : topicos.length === 0 ? (
                            <p>Esta viagem não possui tópicos.</p>
                        ) : (
                            <ul className="space-y-4">
                                {topicos.map((topico, index) => (
                                    <li
                                        key={index} // Define uma key única para cada item
                                        className="p-4 border border-gray-300 rounded-xl bg-white"
                                    >
                                        <h3 className="font-bold text-lg">{topico.nome}</h3>
                                        <p className="text-zinc-500">{topico.conteudo}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4 mt-1">
                        <div className="flex flex-col h-96">
                            <p className="font-bold text-2xl flex">Convidados<span className="bg-roxo w-2 h-2 rounded-full p-1 flex mt-4 ml-1"></span></p>
                            <div className="py-5 overflow-auto">
                                {loadingConvidados ? (
                                    <p>Carregando convidados...</p>
                                ) : (
                                    <ul className="w-full">
                                        {convidados.length > 0 ? (
                                            convidados.map((convidado, index) => (
                                                <div
                                                    key={convidado.id || convidado._id || index} // Garante uma key válida
                                                    className="flex justify-between items-center border-b py-2"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-bold">{convidado.nome || "Nome não encontrado"}</span>
                                                        <span className="text-gray-500">{convidado.email || "E-mail não disponível"}</span>
                                                        <span
                                                            className={`px-2 py-1 text-sm font-semibold rounded-lg ${convidado.status === "PENDENTE"
                                                                    ? "bg-yellow-100 text-yellow-700"
                                                                    : "bg-green-100 text-green-700"
                                                                }`}
                                                        >
                                                            {convidado.status === "PENDENTE" ? "Pendente" : "Aceito"}
                                                        </span>
                                                    </div>
                                                    {convidado.status === "ACEITO" && (
                                                        <select
                                                            value={convidado.permissao || "LEITOR"}
                                                            onChange={(e) => atualizarPapelConvidado(convidado.id || convidado._id, e.target.value)}
                                                            className="border border-gray-300 rounded-lg px-2 py-1"
                                                        >
                                                            <option value="LEITOR">Leitor</option>
                                                            <option value="EDITOR">Editor</option>
                                                        </select>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <p>Nenhum convidado encontrado.</p>
                                        )}
                                    </ul>
                                )}

                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    );
}

