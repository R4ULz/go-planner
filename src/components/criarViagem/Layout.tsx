import DadosPrincipais from "./DadosPrincipais";
import MenuLateralV from "./MenuLateralV";
import Atividades from "./Atividades/Atividades";
import ConvidarAmigos from "./convidarAmigos/Amigos";
import { useState } from "react";
import { useRouter } from "next/router";

type ComponentType = "DadosPrincipais" | "Atividades" | "ConvidarAmigos";

export default function Layout() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>("DadosPrincipais");
  const router = useRouter();
  const [tripData, setTripData] = useState({
    nomeViagem: "",
    destino: "",
    dataIda: "",
    dataVolta: "",
    descricao: "",
    atividades: [],
    amigos: [],
    imagem: null,
  });

  const handleUpdateTrip = (updatedData: Partial<typeof tripData>) => {
    const newTripData = { ...tripData, ...updatedData };
    setTripData(newTripData);

    // Salvar os dados no sessionStorage
    sessionStorage.setItem("tripData", JSON.stringify(newTripData));
  };

  const salvarViagem = async () => {
    const tripDataString = sessionStorage.getItem("tripData");

    if (!tripDataString) {
      alert("Nenhum dado de viagem encontrado para salvar.");
      return;
    }

    let tripData = JSON.parse(tripDataString);

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
        throw new Error("Erro ao enviar os dados para o banco de dados.");
      }

      const result = await response.json();
      alert("Viagem salva com sucesso no banco de dados!");
      console.log(result);
      router.push('/perfil')
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Falha ao confirmar a viagem.");
    }
  };;

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
    <div className="flex gap-10 w-full min-h-[700px] px-24 justify-center">
      <aside className="w-1/5 flex justify-center ml-10">
        <MenuLateralV setSelectedComponent={setSelectedComponent} salvarViagem={salvarViagem} />
      </aside>
      <div className="w-full">
        <p className="text-black font-inter font-medium">CRIANDO SUA VIAGEM!</p>
        {renderComponent()}
      </div>
    </div>
  );
}
