import { useState } from "react";
import InputTxt from "./inputs/InputTxt";
import BtnGradient from "./inputs/BtnGradient";
import { Arrows, LineDestiny } from "./icons";
import TxtHome from "./TxtHome";


export default function SectionHome(){
    const [pontoPartida, setPontoPartida] = useState("")
    const [pontoIda, setPontoIda] = useState("")


    return(
        <div className="h-[664px] flex justify-center items-center px-40 w-full">
            <div className="flex w-1/2 h-[406px] p-5 w-full flex-col space-y-2">
                <TxtHome />
            </div>
            <div className="flex flex-col bg-black/20 rounded-2xl w-1/2 h-[406px] justify-center items-center text-gray-400">
                <div className="space-y-14 relative -top-10 text-sm w-full flex justify-center flex-col items-center">
                    <InputTxt label="Ponto de partida:" valor={pontoPartida} valorMudou={setPontoPartida} tipo="text" placeholder="Seu Local" obrigatorio/>
                    <InputTxt label="Para:" valor={pontoIda} valorMudou={setPontoIda} tipo="text" placeholder="Seu Destino" obrigatorio/>
                    <div className="absolute flex right-[12px]">
                        {LineDestiny}
                    </div>
                    <div className="absolute flex left-[12px] top-14">
                        {Arrows}
                    </div>
                </div>
                    <span className="relative border border-white w-56"></span>
                <div className="mt-10">
                    <BtnGradient text="Criar sua viagem"/>
                </div>
            </div>
        </div>
    )
}