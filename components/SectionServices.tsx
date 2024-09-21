import {iconeCalendario} from "./icons/Schedule"

export default function Services(){
    return(
    <div className="flex flex-row">
        <div className="flex flex-col pl-20 pt-10 w-[450px]">
            <div className="h-[150px] gap-24  w-[370px]">
                <h1 className="text-3xl">Simplicidade e práticidade <b>.</b></h1>
                <h6 className="text-xs">Mostrar as funcionalidades da nossa aplicação bem aqui.</h6>
            </div>

            <div className="h-[664px] gap-10 flex flex-col text-lg">
                <div className="border-solid border-black rounded-md s shadow-border-shadow"> {/* //Defini no arq. de config do TailWind uma variavel para "border-shadow" */}
                    <b className="p-2">
                        Convide seus amigos
                    </b>
                    <p className="pl-8">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Quaerat sit earum magnam cum ipsam voluptate distinctio 
                        asperiores odio delectus voluptatum.
                    </p>
                </div>

                <div className="border-solid border-black rounded-md s shadow-border-shadow"> {/* //Defini no arq. de config do TailWind uma variavel para "border-shadow" */}
                    <b className="p-2">
                        Convide seus amigos
                    </b>
                    <p className="pl-8">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Quaerat sit earum magnam cum ipsam voluptate distinctio 
                        asperiores odio delectus voluptatum.
                    </p>
                </div>

                <div className="border-solid border-black rounded-md s shadow-border-shadow"> {/* //Defini no arq. de config do TailWind uma variavel para "border-shadow" */}
                    <b className="p-2">
                        Convide seus amigos
                    </b>
                    <p className="pl-8">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Quaerat sit earum magnam cum ipsam voluptate distinctio 
                        asperiores odio delectus voluptatum.
                    </p>
                </div>
            </div>
        </div>


        <div className="w-[100%]">
            <div className="flex bg-laranjinha w-1/2 h-[500px] w-[884px] rounded-md ml-64 mt-48">
                <p>oi</p>
            </div>

            <div className="ml-72 mt-10">
                <button className="bg-meugrad border w-[15em] h-[3em]  rounded-xl flex flex-row text-xl items-center text-center justify-center "> 
                    {iconeCalendario} Planejar agora {/*Não sei pq mas o gradient n ta funcionando */}
                </button>   
            </div>

        </div>

    </div>
    )
}