import Footer from "../components/Home/Footer/footer";
import Header from "../components/Home/Header/Header";
import DadosPessoais from "../components/perfil/DadosPessoais";
import HistoricoViagens from "../components/perfil/HistoricoViagens";
import LoginESenha from "../components/perfil/LoginESenha";
import MenuLateral from "../components/perfil/MenuLateral";
import { useState } from "react";


export default function Perfil(){
    const [selectedComponent, setSelectedComponent] = useState("DadosPessoais");

    const renderComponent = () => {
        switch (selectedComponent) {
          case "DadosPessoais":
            return <DadosPessoais />;
          case "HistoricoViagens":
            return <HistoricoViagens />;
          case "LoginSenha":
            return <LoginESenha />;
          default:
            return <DadosPessoais />;
        }
      };
    

    return(
        <div className="flex h-screen w-screen bg-gray-100 flex-col">
            <header className="fixed z-50 w-full flex justify-center">
                <Header />
            </header>
            <div className="flex w-full h-[1000px] gap-10 mt-5">
                <div className="flex w-1/5 p-20 max-w-screen-2xl">
                    <MenuLateral setSelectedComponent={setSelectedComponent}/>
                </div>
                <div className="w-4/5 p-20 max-w-screen-2xl">
                    {renderComponent()}
                </div>
            </div>
            <footer className="w-full">
              <Footer/>
            </footer>
        </div>
    )
}