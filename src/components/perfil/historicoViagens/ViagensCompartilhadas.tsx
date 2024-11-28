import Image from "next/image";
import { location } from "../../icons/location";
import { iconeCalendario2 } from "../../icons/Schedule2";
import { useEffect, useState } from "react";
import { useUser } from "@/src/contexts/UserContext";
import ModalViagem from "./ModalViagens";

export default function ViagensCompartilhadas() {
  const [viagensCompartilhadas, setViagensCompartilhadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalViagem, setModalViagem] = useState(null);
  const { user } = useUser();

  const buscaViagensCompartilhadas = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const response = await fetch(`/api/trip/sharedTrips?id=${user.id}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar viagens compartilhadas");
      }
      const viagens = await response.json();
      console.log("Viagens compartilhadas:", viagens);
      setViagensCompartilhadas(viagens);
    } catch (error) {
      console.error("Erro ao buscar viagens compartilhadas: ", error);
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (data) => {
    const dataObj = new Date(data);
    dataObj.setHours(dataObj.getHours() + 12);
    return dataObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    buscaViagensCompartilhadas();
  }, [user]);

  return (
    <div className="font-inter">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        viagensCompartilhadas.map((viagem) => (
          <div
            key={viagem._id}
            className="bg-white w-full p-2 rounded-xl border-[1px] shadow-md mt-4"
          >
            <div className="flex justify-between">
              <h3 className="text-2xl text-zinc-600 font-bold">{viagem.titulo}</h3>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <div className="flex gap-16">
                  <p className="text-zinc-500 flex gap-2 items-center text-sm">
                    <span role="img" aria-label="Localização">{location}</span>{" "}
                    {viagem.destino}
                  </p>
                  <p className="text-zinc-500 flex items-center gap-1 text-sm">
                    <span role="img" aria-label="Data">{iconeCalendario2}</span>{" "}
                    {formatarData(viagem.dataInicio)} - {formatarData(viagem.fimViagem)}
                  </p>
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="bg-laranja px-4 py-2 text-white rounded-xl font-semibold"
                    onClick={() => setModalViagem(viagem)}
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
          buscarViagens={() => {
            setModalViagem(null);
            buscaViagensCompartilhadas();
          }}
          onClose={() => setModalViagem(null)}
        />
      )}
    </div>
  );
}
