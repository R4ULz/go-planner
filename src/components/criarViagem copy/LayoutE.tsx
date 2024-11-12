import MenuLateralV from "./MenuLateralE";
import Atividades from "./Atividades/AtividadesE";
import ConvidarAmigos from "./convidarAmigos/AmigosE";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { useUser } from "@/src/contexts/UserContext";
import EditarDadosPrincipais from "./DadosPrincipaisE";

type ComponentType = "DadosPrincipais" | "Atividades" | "ConvidarAmigos";

interface EditarViagemLayoutProps {
  tripId: string;
  tripData: any;
}

export default function EditarViagemLayout({ tripData: initialTripData, tripId }: EditarViagemLayoutProps) {
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>("DadosPrincipais");
  const [tripData, setTripData] = useState(initialTripData);
  const { user } = useUser();
  const router = useRouter();

  // Atualiza o estado local `tripData` com os dados recebidos como props
  useEffect(() => {
    setTripData(initialTripData);
  }, [initialTripData]);

  const handleUpdateTrip = (updatedData: Partial<typeof tripData>) => {
    setTripData(prevTripData => ({
      ...prevTripData,
      ...updatedData,
    }));
  };

  const atualizarViagem = async () => {
    try {
      const response = await fetch(`/api/trip/${tripId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar os dados no banco de dados.");
      }

      const result = await response.json();
      Toastify({
        text: 'Viagem atualizada com sucesso!',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
      console.log(result);
      router.push('/perfil');
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      alert("Falha ao atualizar a viagem.");
    }
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "DadosPrincipais":
        return <EditarDadosPrincipais tripData={tripData} handleUpdateTrip={handleUpdateTrip} />;
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
          salvarViagem={atualizarViagem} 
          menuEnabled={true} 
          selectedComponent={selectedComponent}
        />
      </aside>
      <div className="w-full">
        <p className="text-black font-inter font-medium">EDITANDO SUA VIAGEM!</p>
        {renderComponent()}
      </div>
    </div>
  );
}
