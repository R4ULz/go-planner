import DadosPrincipais from "./DadosPrincipais";
import MenuLateralV from "./MenuLateralV";
import Atividades from "./Atividades/Atividades";
import ConvidarAmigos from "./convidarAmigos/Amigos";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
type ComponentType = "DadosPrincipais" | "Atividades" | "ConvidarAmigos" | "Topicos";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { useUser } from "@/src/contexts/UserContext";
import Topicos from "./Topicos/Topicos";
import { v4 as uuidv4 } from "uuid"

interface LayoutProps {
  isEditMode: boolean;
  tripId?: string;
  tripData: { partida: string; destino: string };
  menuEnabled: boolean;
  setMenuEnabled: (enabled: boolean) => void;
}

export default function Layout({ isEditMode, tripId, tripData: initialTripData, menuEnabled, setMenuEnabled }: LayoutProps) {
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>("DadosPrincipais");
  const { user } = useUser();
  const router = useRouter();

  const [tripData, setTripData] = useState({
    _id: "",
    nomeViagem: "",
    partida: initialTripData?.partida || "",
    destino: initialTripData?.destino || "",
    DataIda: "",
    DataRetorno: "",
    descricao: "",
    atividades: [],
    amigos: [],
    imagem: null,
    topicos: [],
  });

  useEffect(() => {
    if (isEditMode && tripId) {
      const fetchTripData = async () => {
        try {
          const response = await fetch(`/api/trip/updateTrip?tripId=${tripId}`);
          if (!response.ok) throw new Error("Erro ao buscar dados da viagem");

          const data = await response.json();
          setTripData(data);
        } catch (error) {
          console.error("Erro ao carregar viagem para edição:", error);
        }
      };
      fetchTripData();
    }
  }, [isEditMode, tripId]);

  const handleUpdateTrip = (updatedData: Partial<typeof tripData>) => {
    const newTripData = { ...tripData, ...updatedData };
    setTripData(newTripData);
    sessionStorage.setItem("tripData", JSON.stringify(newTripData));
  };

  const handleAddNewTopic = (newTopic) => {
    setTripData((prevTripData) => {
      const updatedTopics = [...prevTripData.topicos, newTopic];
      return { ...prevTripData, topicos: updatedTopics };
    });
  };

  const salvarViagem = async () => {
    const tripDataString = sessionStorage.getItem("tripData");
    if (!tripDataString) {
      alert("Nenhum dado de viagem encontrado para salvar.");
      return;
    }

    let tripData = JSON.parse(tripDataString);
    const partidaStored = sessionStorage.getItem("partida");
    const destinoStored = sessionStorage.getItem("destino");

    tripData = {
      ...tripData,
      partida: tripData.partida || partidaStored,
      destino: tripData.destino || destinoStored,
      criador: user?.id,
    };

    if (!tripData.partida || !tripData.destino) {
      alert("Partida e destino são obrigatórios.");
      return;
    }

    const atividadesAjustadas = tripData.atividades.map((atividade) => ({
      ...atividade,
      id: atividade.id || uuidv4(),
      nome: atividade.name,
      data: atividade.date,
      horario: atividade.time,
    }));
  
    console.log("teste", tripData.amigos)

    const amigosAjustados = tripData.amigos.map((amigo) => ({
      amigoId: amigo.id || amigo.amigoId,
      status: "PENDENTE"
    }));
    tripData = { ...tripData, atividades: atividadesAjustadas, amigos: amigosAjustados };

    console.log("Enviando dados ajustados:", tripData);

    try {
      const response = await fetch("/api/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados para o banco de dados.");
      }

      const result = await response.json();
      Toastify({
        text: isEditMode ? 'Viagem atualizada com sucesso!' : 'Viagem criada com sucesso!',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
      console.log(result);
      router.push('/perfil');
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Falha ao confirmar a viagem.");
    }
  };

  const onSaveTrip = () => {
    setMenuEnabled(true);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "DadosPrincipais":
        return <DadosPrincipais tripData={tripData} handleUpdateTrip={handleUpdateTrip} onSaveTrip={onSaveTrip} />;
      case "Atividades":
        return <Atividades tripData={tripData} handleUpdateTrip={handleUpdateTrip} />;
      case "ConvidarAmigos":
        return <ConvidarAmigos tripData={tripData} handleUpdateTrip={handleUpdateTrip} />;
      case "Topicos":
        return <Topicos tripData={tripData} handleUpdateTrip={handleUpdateTrip} handleAddNewTopic={handleAddNewTopic} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-10 max-hd:gap-20 w-full max-hd:max-w-screen-xl min-h-[716px] px-24 max-hd:px-14 justify-center">
      <aside className="w-1/5 flex justify-center ml-10">
        <MenuLateralV
          setSelectedComponent={setSelectedComponent}
          salvarViagem={salvarViagem}
          menuEnabled={menuEnabled}
          selectedComponent={selectedComponent}
          />      
      </aside>
      <div className="w-full">
        <p className="text-black font-inter font-medium">{isEditMode ? "EDITANDO SUA VIAGEM!" : "CRIANDO SUA VIAGEM!"}</p>
        {renderComponent()}
      </div>
    </div>
  );
}