import DadosPrincipais from "./DadosPrincipais";
import MenuLateralV from "./MenuLateralV";
import { useState } from "react";
import Atividades from "./Atividades/Atividades";

type ComponentType = "DadosPrincipais" | "Atividades" | "ConvidarAmigos";

export default function Layout(){
    const [selectedComponent, setSelectedComponent] = useState<ComponentType>("DadosPrincipais");
    
    const renderComponent = () => {
        switch (selectedComponent) {
          case "DadosPrincipais":
            return <DadosPrincipais />; 
          case "Atividades":
            return <Atividades />;
          case "ConvidarAmigos":
            return ;
          default:           
        }
      };

    return (
        <div className="flex gap-10 w-full">
            <aside className="w-1/5 flex justify-center ml-10">
                <MenuLateralV setSelectedComponent={setSelectedComponent}/>
            </aside>
            <div className="w-4/5 max-w-screen-2xl">
                <p>Criando sua viagem!</p>
                {renderComponent()}
            </div>
        </div>
    )
}