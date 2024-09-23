import ServiceCard1 from "./ServiceCard1"
import ServiceCard2 from "./ServiceCard2"
import ServiceCard3 from "./ServiceCard3"
import {iconeCalendario} from "./icons/Schedule"

export default function Services(){
    return(
    <div className="flex flex-row justify-around ">

        <div className="flex flex-col py-10 w-[450px]">
            <div className="h-[100px] w-[370px]">
                <h1 className="text-3xl">Simplicidade e práticidade <b>.</b></h1>
                <h6 className="text-xs">Mostrar as funcionalidades da nossa aplicação bem aqui.</h6>
            </div>

            <div className="h-[664px] gap-10 flex flex-col text-lg">

                <ServiceCard1
                    title="Convide seus amigos"

                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quaerat sit earum magnam cum ipsam voluptate distinctio 
                    asperiores odio delectus voluptatum."
                />

                <ServiceCard2
                    title="Convide seus amigos"

                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quaerat sit earum magnam cum ipsam voluptate distinctio 
                    asperiores odio delectus voluptatum."
                />

                <ServiceCard3
                    title="Convide seus amigos"

                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quaerat sit earum magnam cum ipsam voluptate distinctio 
                    asperiores odio delectus voluptatum."
                />

            </div>
        </div>


        <div className="flex flex-col justify-center max-w-[55em]">

            <div className="flex justify-center bg-laranjinha h-[500px] max-w-7xl rounded-md ">
                <p>oi</p>
            </div>
            
            <div className="ml-72 mt-10 flex justify-center">
                <button className="bg-gradient-to-r from-RosinhaEscurinho to-laranjinha text-white border w-[15em] h-[3em] rounded-xl flex flex-row text-xl items-center text-center justify-center "> 
                    {iconeCalendario} Planejar agora {/*Não sei pq mas o gradient n ta funcionando */}
                </button>   
            </div>

        </div>

    </div>
    )
}