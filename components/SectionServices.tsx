import { useState } from "react"
import ServiceCard1 from "./ServiceCard1"
import ServiceCard2 from "./ServiceCard2"
import ServiceCard3 from "./ServiceCard3"
import {iconeCalendario} from "./icons/Schedule"

export default function Services(){
    const [selectedCard, setSelectedCard] = useState(null);

    const handleSelecteCard = (cardId) => {
        setSelectedCard(cardId);
    };

    return(
    <div className=" w-full flex flex-row justify-around sm:flex-col md:flex-col lg:flex-row">

        <div className="flex flex-col p-5 pt-10 w-[450px]">
            <div className="h-[100px] w-[500px]">
                <div className="flex flex-row">
                     <h1 className="flex flex-row font-rubik font-bold text-black text-4xl">Simplicidade e práticidade</h1><span className="flex flex-row bg-rosinha w-3 h-3 rounded-full p-1 relative top-6 mx-1"></span>
                </div>
                <h6 className="text-xs">Mostrar as funcionalidades da nossa aplicação bem aqui</h6>
            </div>

            <div className="h-[664px] gap-7  flex flex-col text-lg">

                <ServiceCard1
                    isSelected={selectedCard ===1}
                    onSelect={() => handleSelecteCard(1)}
                    title="Convide seus amigos"

                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quaerat sit earum magnam cum ipsam voluptate distinctio 
                    asperiores odio delectus voluptatum."
                />

                <ServiceCard2
                    isSelected={selectedCard ===2}
                    onSelect={() => handleSelecteCard(2)}
                    title="Convide seus amigos"

                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quaerat sit earum magnam cum ipsam voluptate distinctio 
                    asperiores odio delectus voluptatum."
                />

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


        <div className="flex flex-col justify-center max-w-[55em] sm: max-w-[30em] md:max-w-[55em] lg:max-w-[55em]">

            <div className="flex justify-center bg-laranjinha h-[500px] max-w-7xl rounded-lg">
                <p>Oi</p>
            </div>
            
            <div className="ml-72 mt-10 flex justify-center">
                <button className="bg-gradient-to-r from-RosinhaEscurinho to-laranjinha text-white border w-[15em] h-[3em] rounded-xl flex flex-row text-xl items-center text-center justify-center "> 
                    {iconeCalendario} Planejar agora
                </button>   
            </div>

        </div>

    </div>
    )
}