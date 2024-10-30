import Image from "next/image";
import { Viagem } from "../icons";

export default function HistoricoViagens({onCreateTrip}) {
    return (
        <div className="bg-white w-full h-full rounded-xl border-[1px] shadow-xl border-zinc-400 flex flex-col">
            <div className="h-full py-14 max-hd:py-5 max-hd:px-5 px-20 flex justify-center items-center flex-col space-y-10">
                <Image src={"/imgs/manutencao.png"} alt="manutencao" width={180} height={180} className="size-40 max-hd:size-20"></Image>
                <h3 className="text-3xl text-zinc-700 max-hd:text-2xl">Ainda não há viagens por aqui, gostaria de adicionar uma?</h3>
                <button
                    className=" flex gap-1 items-center font-inter justify-center bg-gradient-to-r from-rosinha to-laranja px-7 py-3 text-white rounded-xl font-bold "
                    onClick={onCreateTrip}>
                    {Viagem} Criar sua viagem
                </button>
            </div>
        </div>
    )
}