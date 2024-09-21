import { useState } from "react";
import InputTxt from "./inputs/InputTxt";


export default function SectionHome(){
    const [pontoPartida, setPontoPartida] = useState("")
    const [pontoIda, setPontoIda] = useState("")


    return(
        <div className="h-[664px] flex justify-center items-center px-40 gap-24 border">
            <div className="flex bg-red-400 w-1/2 h-[406px]">
                <h1>teste</h1>
            </div>
            <div className="flex flex-col bg-black opacity-30 rounded-2xl w-1/2 h-[406px]  space-y-20 justify-center items-center text-white">
                <InputTxt label="Ponto de partida:" valor={pontoPartida} valorMudou={setPontoPartida} tipo="text" obrigatorio/>
                <InputTxt label="Para:" valor={pontoIda} valorMudou={setPontoIda} tipo="text" obrigatorio/>
            </div>
        </div>
    )
}