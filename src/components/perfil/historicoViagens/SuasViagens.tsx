import Image from "next/image";
import { location } from "../../icons/location";
import { lixeira } from "../../icons/lixeira";
import { iconeCalendario2 } from "../../icons/Schedule2";
import { estrelaVazia } from "../../icons/estrelaVazia";
import { estrelaCheia } from "../../icons/estrelaCheia";
import { useEffect, useState } from "react";
import { useUser } from "@/src/contexts/UserContext";
import ModalViagem from "./ModalViagens";
import Toastify from "toastify-js";

export default function SuasViagens() {
    const [minhasViagens, setMinhasViagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalViagem, setModalViagem] = useState(null);
    const { user } = useUser();
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const deleteTrip = async (id) => {
        try {
            const response = await fetch(`/api/trip/deleteTripById`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                setMinhasViagens((prev) => prev.filter((viagem) => viagem._id !== id));
                Toastify({
                    text: "Viagem deletada com sucesso!",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                }).showToast();
            } else {
                const errorData = await response.json();
                alert(`Erro: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Erro ao deletar a viagem:", error);
            Toastify({
                text: "Não foi possível deletar a viagem. Tente novamente.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#ce1836",
                },
            }).showToast();
        }
    };

    const toggleFavorito = async (id) => {
        setMinhasViagens((prev) =>
            prev.map((viagem) =>
                viagem._id === id ? { ...viagem, favoritada: !viagem.favoritada } : viagem
            )
        );

        try {
            const response = await fetch(`/api/trip/toggleFavorite`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error("Erro ao alternar favorito");
            }
        } catch (error) {
            console.error("Erro ao favoritar a viagem:", error);
            // Reverte a alteração local caso a API falhe
            setMinhasViagens((prev) =>
                prev.map((viagem) =>
                    viagem._id === id ? { ...viagem, favoritada: !viagem.favoritada } : viagem
                )
            );
        }
    };

    const buscaViagens = async () => {
        if (!user) return;
        try {
            const response = await fetch(`/api/trip/findTrips?id=${user.id}`, { method: "GET" });
            if (!response.ok) {
                throw new Error("Erro ao buscar viagens");
            }
            const viagens = await response.json();
            setMinhasViagens(viagens);
        } catch (error) {
            console.error("Erro ao buscar viagens", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscaViagens();
    }, []);

    const formatarData = (data) => {
        const dataObj = new Date(data);
        return dataObj.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    function ConfirmDeleteModal({ viagem, onConfirm, onCancel }) {
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg ">
              <h2>Confirmar Exclusão</h2>
              <p className="py-1">Você realmente deseja excluir a sua viagem?</p>
              <button onClick={() => onConfirm(viagem._id)} className="bg-gradient-to-r from-rosinha to-laranja  text-white p-2 rounded-md">Excluir</button>
              <button onClick={onCancel} className="ml-2 bg-gray-300 p-2 rounded-md">Cancelar</button>
            </div>
          </div>
        );
      }
      

    return (
        
        <div className="font-inter">
            {loading ? (
                <p>Carregando...</p>
            ) : (
                minhasViagens.map((viagem) => (
                    <div
                        key={viagem._id}
                        className="bg-white w-full p-2 rounded-xl border-[1px] shadow-md mt-4"
                    >
                        <div className="flex justify-between">
                            <h3 className="text-2xl text-zinc-600 font-bold">{viagem.titulo}</h3>
                            <div className="flex gap-2">
                                <button onClick={() => toggleFavorito(viagem._id)}>
                                    {viagem.favoritada ? estrelaCheia : estrelaVazia}
                                </button>
                                <button onClick={() => setDeleteConfirm(viagem)}>{lixeira}</button>
                                {deleteConfirm && (
                                <ConfirmDeleteModal
                                    viagem={deleteConfirm}
                                    onConfirm={(id) => {
                                    deleteTrip(id);
                                    setDeleteConfirm(null);
                                    }}
                                    onCancel={() => setDeleteConfirm(null)}
                                />
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <div className="flex gap-16">
                                    <p className="text-zinc-500 flex gap-2 items-center text-sm">
                                        <span role="img" aria-label="Localização">{location}</span>
                                        {viagem.destino}
                                    </p>
                                    <p className="text-zinc-500 flex items-center gap-1 text-sm">
                                        <span role="img" aria-label="Data">{iconeCalendario2}</span>
                                        {formatarData(viagem.dataInicio)} -{" "}
                                        {formatarData(viagem.fimViagem)}
                                    </p>
                                </div>
                                <div className="items-center mt-2 hidden">
                                    <p className="text-sm text-zinc-500 mr-2">Convidados:</p>
                                    <div className="flex space-x-2">
                                    </div>
                                </div>
                                <div className="flex space-x-4 mt-4">
                                    <button
                                        className="bg-laranja px-4 py-2 text-white rounded-xl font-semibold"
                                        onClick={() => {
                                            setModalViagem(viagem);
                                        }}
                                    >
                                        Visualizar
                                    </button>
                                </div>
                            </div>
                            <div className="size-44 relative">
                                <Image
                                    src={viagem.imagem || "/imgs/rio.jpg"} // Use a imagem do banco ou uma padrão
                                    alt={viagem.titulo}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                ))
            )}
            {modalViagem && (
                <ModalViagem
                    viagem={modalViagem}
                    buscarViagens={buscaViagens}
                    onClose={() => setModalViagem(null)}
                />
            )}
        </div>
    );
    
}
