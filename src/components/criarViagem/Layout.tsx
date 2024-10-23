import DadosPrincipais from "./DadosPrincipais";
import MenuLateralV from "./MenuLateralV";
import { useState } from "react";
import Atividades from "./Atividades/Atividades";
import ConvidarAmigos from "./convidarAmigos/Amigos";

type ComponentType = "DadosPrincipais" | "Atividades" | "ConvidarAmigos";

export default function Layout(){
    const [selectedComponent, setSelectedComponent] = useState<ComponentType>("DadosPrincipais");
    const [tripId, setTripId] = useState<string | null>(null);  

    const renderComponent = () => {
        switch (selectedComponent) {
          case "DadosPrincipais":
            return <DadosPrincipais setTripId={setTripId}/>; 
          case "Atividades":
            return <Atividades tripId={tripId}/>;
          case "ConvidarAmigos":
            return <ConvidarAmigos tripId={tripId}/>;
          default:           
        }
      };

    return (
        <div className="flex gap-10 w-full">
            <aside className="w-1/5 flex justify-center ml-10">
                <MenuLateralV setSelectedComponent={setSelectedComponent}/>
            </aside>
            <div className="w-full">
              <p className="text-black font-inter font-medium">
                          CRIANDO SUA VIAGEM!
              </p>
                {renderComponent()}
            </div>
        </div>
    )
}