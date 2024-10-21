import MenuLateral from "../components/perfil/MenuLateral"
import Header from "../components/Home/Header/Header"
import Footer from "../components/Home/Footer/footer"
import { useState } from "react"
import ActivityItem from "../components/Atividades/ActivityItem"
import { Frame } from "../components/icons/Frame"
import MenuLateralV from "../components/criarViagem/MenuLateralV"


type Atividade ={
    id:number;
    name: string;
};

export default function Atividades(){
    const [atividades, setAtividades] = useState<Atividade[]>([]); //Éo estado para armazenar as ativiadades
    
    const addAtividade = () =>{
        const newAtividade = {id: atividades.length + 1, name: `Atividade ${atividades.length + 1}` };
        setAtividades([...atividades, newAtividade]);
    }
    return(
        <div className="font-rubik">

            <div>
                <Header/>
            </div>

            <div className="flex flex-row p-16">
                <div className="px-24">
                    <MenuLateralV />
                </div> 
                        
                <div className="pr-20 w-full">
                    <p className="text-black font-medium">
                        CRIANDO SUA VIAGEM!
                    </p>
                    
                    <div className="flex">
                        <p className="font-bold text-lg">Atividades</p><span className="bg-laranja w-2 h-2 rounded-full p-1 flex mt-3 ml-1"></span>
                    </div>

                    <div className="mt-4">
                        {atividades.length > 0 ?(
                            atividades.map((atividades) =>(
                                <ActivityItem key={atividades.id} activity={atividades}/>                        ))
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                {Frame}
                               <p className="font-medium py-5">Opa! Não há nenhuma atividade aqui!</p>
                               <p className="text-gray-500">Se você quiser adicionar alguma atividade que </p>
                               <p className="text-gray-500">realizará na viagem, aperte em “Adicionar atividade”.</p>
                            </div>
                        )}
                    </div>

                </div>

                <div className="mt-4">
                    <button onClick={addAtividade} className="text-white border-solid bg-laranjinha p-3 rounded-2xl w-[200px]">Adicionar Atividades +</button>
                </div>
            </div>
            

            <Footer/>
        </div>
    )
}