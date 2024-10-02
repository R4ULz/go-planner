import { useState } from "react"
import ServiceCard1 from "./ServiceCard1"
import ServiceCard2 from "./ServiceCard2"
import ServiceCard3 from "./ServiceCard3"
import { iconeCalendario } from "./icons/Schedule"

export default function Services(){
    const [selectedCard, setSelectedCard] = useState(null);

    const handleSelecteCard = (cardId) => {
        setSelectedCard(cardId);
    };

    return(
    <div className="w-full flex flex-row justify-around gap-5 sm: flex-col items-center md:flex-row">

        <div className="flex flex-col p-5 pt-10 w-[450px]">
            <div className="h-[100px] w-[500px]">
                <div className="flex flex-row">
                     <h1 className="font-rubik font-bold text-black text-4xl md: text-3xl ">Simplicidade e práticidade</h1><span className="flex flex-row bg-rosinha w-2 h-2 rounded-full p-1 relative top-6 mx-1"></span>
                </div>
                <h6 className="font-rubik textsm ">Mostrar as funcionalidades da nossa aplicação bem aqui</h6>
            </div>

            <div className="h-full gap-5 flex flex-col text-lg">

                <ServiceCard1
                    isSelected={selectedCard ===1}
                    onSelect={() => handleSelecteCard(1)}
                    title="Convide seus amigos"

                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quaerat sit earum magnam cum ipsam voluptate distinctio 
                    asperiores odio delectus voluptatum."
                />

                    <hr />

                <ServiceCard2
                    isSelected={selectedCard ===2}
                    onSelect={() => handleSelecteCard(2)}
                    title="Convide seus amigos"

                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quaerat sit earum magnam cum ipsam voluptate distinctio 
                    asperiores odio delectus voluptatum."
                />

                    <hr />

                <ServiceCard3
                    isSelected={selectedCard ===3}
                    onSelect={() => handleSelecteCard(3)}
                    title="Convide seus amigos"

                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quaerat sit earum magnam cum ipsam voluptate distinctio 
                    asperiores odio delectus voluptatum."
                />

            </div>
        </div>


        <div className="flex flex-col justify-center w-full sm: max-w-[35em] md:max-w-[55em] lg:max-w-[55em]">

            <div className="flex justify-center items-center bg-laranjinha h-[500px] rounded-lg">
                <p>Inserir a tela deseja ao selecionar aqui</p>
            </div>

            <div className="ml-10 mt-10 flex sm:justify-center m-5">
                <button className="bg-gradient-to-r from-RosinhaEscurinho to-laranjinha text-white border w-[17em] h-[3em] rounded-2xl flex flex-row text-xl items-center text-center justify-center "> 
                    {iconeCalendario} Planejar agora
                </button>   
            </div>
            
        </div>

    </div>
    )
}