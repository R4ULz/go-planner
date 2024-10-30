import DadosPrincipais from "./DadosPrincipais";
import MenuLateralV from "./MenuLateralV";
import Atividades from "./Atividades/Atividades";
import ConvidarAmigos from "./convidarAmigos/Amigos";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
type ComponentType = "DadosPrincipais" | "Atividades" | "ConvidarAmigos";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

interface LayoutProps {
  tripData: { partida: string; destino: string };
  menuEnabled: boolean;
  setMenuEnabled: (enabled: boolean) => void;
}

export default function Layout({tripData: initialTripData, menuEnabled, setMenuEnabled}: LayoutProps) {
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>("DadosPrincipais");

  const router = useRouter();
  const [tripData, setTripData] = useState({
    nomeViagem: "",
    partida: initialTripData?.partida || "",
    destino: initialTripData?.destino || "",
    dataIda: "",
    dataVolta: "",
    descricao: "",
    atividades: [],
    amigos: [],
    imagem: null,
  });

  useEffect(() => {
    // Atualizar tripData se initialTripData mudar
    if (initialTripData.partida || initialTripData.destino) {
      setTripData(prevTripData => ({
        ...prevTripData,
        partida: initialTripData.partida,
        destino: initialTripData.destino,
      }));
      console.log("Initial trip data set in Layout:", initialTripData);
    }
  }, [initialTripData]);

  useEffect(() => {
    console.log("Initial trip data:", initialTripData);
    console.log("Current trip data:", tripData);
  }, [initialTripData, tripData]);

  const handleUpdateTrip = (updatedData: Partial<typeof tripData>) => {
    const newTripData = { ...tripData, ...updatedData };
    setTripData(newTripData);
    sessionStorage.setItem("tripData", JSON.stringify(newTripData));
  };

  const salvarViagem = async () => {
    const tripDataString = sessionStorage.getItem("tripData");

    if (!tripDataString) {
      alert("Nenhum dado de viagem encontrado para salvar.");
      return;
    }

    let tripData = JSON.parse(tripDataString);

    const partidaStored = sessionStorage.getItem("partida")
    const destinoStored = sessionStorage.getItem("destino")

    tripData = {
      ...tripData,
      partida: tripData.partida || partidaStored,
      destino: tripData.destino || destinoStored,
    };

    if (!tripData.partida || !tripData.destino) {
      alert("Partida e destino são obrigatórios.");
      return;
    }

    const atividadesAjustadas = tripData.atividades.map((atividade) => ({
      nome: atividade.name, // Ajustando 'name' para 'nome'
      data: atividade.date, // Ajustando 'date' para 'data'
      horario: atividade.time, // Ajustando 'time' para 'horario'
    }));

    tripData = { ...tripData, atividades: atividadesAjustadas };

    const amigosAjustados = tripData.amigos.map((amigo) => amigo.id);

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
        throw new Error("Erro ao enviar os dados para o banco de dados. ", data);
      }

      const result = await response.json();
      Toastify({
        text: 'Viagem confirmada!',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style:{
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
      console.log(result);
      router.push('/perfil')
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
        return <DadosPrincipais tripData={tripData} handleUpdateTrip={handleUpdateTrip} onSaveTrip={onSaveTrip}/>;
      case "Atividades":
        return <Atividades tripData={tripData} handleUpdateTrip={handleUpdateTrip} />;
      case "ConvidarAmigos":
        return <ConvidarAmigos tripData={tripData} handleUpdateTrip={handleUpdateTrip} />;
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
        <p className="text-black font-inter font-medium">CRIANDO SUA VIAGEM!</p>
        {renderComponent()}
      </div>
    </div>
  );
}
