import Image from "next/image";
import { Viagem } from "../icons";
import { useState } from "react";
import SuasViagens from "./historicoViagens/SuasViagens";
import ViagensCompartilhadas from "./historicoViagens/ViagensCompartilhadas";

export default function HistoricoViagens({ onCreateTrip }) {

    const [selectedItem, setSelectedItem] = useState("suasViagens")

    const itemSelecionado = (item) => {
        setSelectedItem(item);
    }

    const renderizarComponenteSelecionado = () =>{
        if(selectedItem === "suasViagens"){
            return <SuasViagens />
        }else if(selectedItem === "ViagensCompartilhadas"){
            return <ViagensCompartilhadas />
        }
        return null;
    }

    return (
        <div className="bg-white w-full h-full rounded-xl border-[1px] shadow-xl border-zinc-400 flex flex-col px-14 py-8">
            {/* <div className="h-full py-14 max-hd:py-5 max-hd:px-5 px-20 flex justify-center items-center flex-col space-y-10">
                <Image src={"/imgs/manutencao.png"} alt="manutencao" width={180} height={180} className="size-40 max-hd:size-20"></Image>
                <h3 className="text-3xl text-zinc-700 max-hd:text-2xl">Ainda não há viagens por aqui, gostaria de adicionar uma?</h3>
            </div> */}
            <div className="flex justify-between">
                <p className="font-bold text-2xl flex">Histórico de viagens <span className="bg-laranja w-2 h-2 rounded-full p-1 flex mt-5 ml-1"></span></p>
                <div>
                    <button
                        className=" flex gap-1 items-center font-inter justify-center bg-gradient-to-r from-rosinha to-laranja px-4 py-2 text-white rounded-xl font-bold"
                        onClick={onCreateTrip}>
                        {Viagem} Criar sua viagem
                    </button>
                </div>
            </div>
            <p className="text-zinc-400 -mt-4">Visualize e edite suas viagens aqui!</p>
            <div className="mt-3">
                <hr />
                <ul className="flex gap-10 items-center">
                    <li
                        className={`cursor-pointer flex gap-1 items-center font-bold ${selectedItem === "suasViagens" ? "text-zinc-700" : "text-zinc-400"}`}
                        onClick={() => itemSelecionado("suasViagens")}
                    >
                        <span className={`${selectedItem === "suasViagens" ? "flex flex-row bg-laranjinha w-[4px] h-[16px] rounded-full top-6" : "hidden"}`}></span>
                        Suas Viagens
                    </li>
                    <li
                        className={`cursor-pointer flex gap-1 items-center font-bold ${selectedItem === "ViagensCompartilhadas" ? "text-zinc-700" : "text-zinc-400"}`}
                        onClick={() => itemSelecionado("ViagensCompartilhadas")}
                    >
                        <span className={`${selectedItem === "ViagensCompartilhadas" ? "flex flex-row bg-laranjinha w-[4px] h-[16px] rounded-full top-6" : "hidden"}`}></span>
                        Viagens Compartilhadas
                    </li>
                </ul>
                <hr />
            </div>
            <div className=" mt-5 overflow-auto">
                {renderizarComponenteSelecionado()}
            </div>
        </div>
    )
}