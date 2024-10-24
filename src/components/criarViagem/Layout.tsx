import DadosPrincipais from "./DadosPrincipais";
import MenuLateralV from "./MenuLateralV";
import Atividades from "./Atividades/Atividades";
import ConvidarAmigos from "./convidarAmigos/Amigos";
import { useState } from "react";

type ComponentType = "DadosPrincipais" | "Atividades" | "ConvidarAmigos";

export default function Layout() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>("DadosPrincipais");
  const [tripData, setTripData] = useState({
    nomeViagem: "",
    destino: "",
    dataIda: "",
    dataVolta: "",
    descricao: "",
    atividades: [],
    amigos: [],
  });

  const handleUpdateTrip = (updatedData: Partial<typeof tripData>) => {
    setTripData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  // Função para salvar os dados da viagem no localStorage
  const salvarViagemLocalStorage = () => {
    try {
      const tripDataString = JSON.stringify(tripData); // Converte os dados da viagem para string JSON
      localStorage.setItem("tripData", tripDataString); // Salva no localStorage com a chave 'tripData'
      alert("Viagem salva com sucesso!"); // Alerta de sucesso
    } catch (error) {
      console.error("Erro ao salvar os dados da viagem:", error);
    }
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "DadosPrincipais":
        return <DadosPrincipais tripData={tripData} handleUpdateTrip={handleUpdateTrip} />;
      case "Atividades":
        return <Atividades tripData={tripData} handleUpdateTrip={handleUpdateTrip} />;
      case "ConvidarAmigos":
        return <ConvidarAmigos tripData={tripData} handleUpdateTrip={handleUpdateTrip} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-10 w-full">
      <aside className="w-1/5 flex justify-center ml-10">
        <MenuLateralV setSelectedComponent={setSelectedComponent} salvarViagem={salvarViagemLocalStorage} />
      </aside>
      <div className="w-full">
        <p className="text-black font-inter font-medium">CRIANDO SUA VIAGEM!</p>
        {renderComponent()}
      </div>
    </div>
  );
}
