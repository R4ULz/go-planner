import Image from "next/image"
import { location } from "../../icons/location"
import { lixeira } from "../../icons/lixeira"
import { iconeCalendario2 } from "../../icons/Schedule2"
import { use, useEffect, useState } from "react"
import { useUser } from "@/src/contexts/UserContext"
import ModalViagem from "./ModalViagens"
import { useRouter } from "next/router"

export default function SuasViagens() {

    const [minhasViagens, setMinhasViagens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalViagem, setModalViagem] = useState(null)
    const {user} = useUser()

    const deleteTrip = async (id) => {
        console.log("ID para deletar:", id); // Verificação do ID
    
        try {
          const response = await fetch(`/api/trip/deleteTripById`, { // Certifique-se de que o caminho está correto
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }), // Enviando o ID no corpo da requisição
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log("Viagem deletada:", data);
            alert("Viagem deletada com sucesso!");
            // Atualiza o estado para remover a viagem deletada da lista
            setMinhasViagens((prev) => prev.filter((viagem) => viagem._id !== id));
          } else {
            const errorData = await response.json();
            alert(`Erro: ${errorData.message}`);
          }
        } catch (error) {
          console.error("Erro ao deletar a viagem:", error);
          alert("Não foi possível deletar a viagem. Tente novamente.");
        }
    };
    
    const buscaViagens = async () =>{
        if(!user) return;
        try {
            const response = await fetch(`api/trip/findTrips?id=${user.id}`, {method: 'GET'});
            if(!response.ok){
                throw new Error("erro ao buscar viagens")
            }
            const viagens = await response.json()
            setMinhasViagens(viagens)
        } catch (error) {
            console.error("erro ao buscar viagens ", error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() =>{
        buscaViagens()
    }, [])

    const formatarData = (data) =>{
        const dataObj = new Date(data);
        dataObj.setHours(dataObj.getHours() + 12);
        return dataObj.toLocaleDateString('pt-BR', {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    return (
        <div className="font-inter">
            {loading ? (
                <p>Carregando...</p>
            ) : (
                minhasViagens.map((viagem) => (
                    <div key={viagem._id} className="bg-white w-full p-2 rounded-xl border-[1px] shadow-md mt-4">
                        <div className="flex justify-between">
                            <h3 className="text-2xl text-zinc-600 font-bold">{viagem.titulo}</h3>
                            <button onClick={() => deleteTrip(viagem._id)}>{lixeira}</button>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <div className="flex gap-16">
                                    <p className="text-zinc-500 flex gap-2 items-center text-sm">
                                        <span role="img" aria-label="Localização">{location}</span> {viagem.destino}
                                    </p>
                                    <p className="text-zinc-500 flex items-center gap-1 text-sm">
                                        <span role="img" aria-label="Data">{iconeCalendario2}</span> 
                                        {formatarData(viagem.dataInicio)} - {formatarData(viagem.fimViagem)}
                                    </p>
                                </div>
                                <div className="items-center mt-2 hidden">
                                    <p className="text-sm text-zinc-500 mr-2">Convidados:</p>
                                    <div className="flex space-x-2">
                                        {viagem.amigos.map((convidado, index) => (
                                            <span key={index} className="text-white bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                                                {convidado}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex space-x-4 mt-4">
                                    <button className="bg-laranja px-4 py-2 text-white rounded-xl font-semibold" onClick={() =>{setModalViagem(viagem)}}>Visualizar</button>
                                </div>
                            </div>
                            <div className="size-44 relative">
                                <Image src={viagem.imagem || "/imgs/rio.jpg"} alt={viagem.titulo} layout="fill" objectFit="cover" className="rounded-lg" />
                            </div>
                        </div>
                    </div>
                ))
            )}
            {modalViagem && <ModalViagem viagem={modalViagem} buscarViagens={buscaViagens} onClose={() => setModalViagem(null)} />}
        </div>
    );
}