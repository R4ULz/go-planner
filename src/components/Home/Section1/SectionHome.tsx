import { useState } from "react";
import InputTxt from "../../inputs/InputTxt";
import BtnGradient from "../../inputs/BtnGradient";
import { Arrows, LineDestiny, Viagem } from "../../icons/index";
import TxtHome from "./TxtHome";


export default function SectionHome(){
    const [pontoPartida, setPontoPartida] = useState("")
    const [pontoIda, setPontoIda] = useState("")


    return(
        <div className="h-[664px] flex justify-center items-center max-w-screen-xl w-full">
            <div className="flex w-2/3 h-full p-5 flex-col space-y-2 justify-center items-start">
                <TxtHome />
            </div>
            <div className="flex relative flex-col backdrop-blur-sm bg-black/20 rounded-2xl w-1/3 h-2/3 justify-center items-center text-gray-400 max-w-2xl">
                <div className="space-y-14 text-sm w-60 flex justify-start flex-col items-center">
                    <InputTxt label="Ponto de partida:" valor={pontoPartida} valorMudou={setPontoPartida} tipo="text" placeholder="Seu Local" obrigatorio/>
                    <InputTxt label="Para:" valor={pontoIda} valorMudou={setPontoIda} tipo="text" placeholder="Seu Destino" obrigatorio/>
                    <div className="absolute flex right-[12px]">
                        {LineDestiny}
                    </div>
                    <div className="absolute flex left-[12px] top-24">
                        {Arrows}
                    </div>
                </div>
                    <hr className="mt-5 border border-white w-56"/>
                <div className="mt-10 w-60">
                    <BtnGradient text="Criar sua viagem" icon={Viagem}/>
                </div>
            </div>
        </div>
    )
}