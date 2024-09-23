import BtnGradient from "@/components/inputs/BtnGradient";
import InputTxt from "@/components/inputs/InputTxt";
import TxtHome from "@/components/TxtHome";
import { useState } from "react";

export default function Login(){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    return (
        <div className="bg-hero-login w-screen h-screen bg-cover bg-center flex">
            <div className="w-1/2 h-full bg-black/35 rounded-lg flex flex-col justify-center items-center">
                <div className="w-1/2">
                    <InputTxt label="" placeholder="Email:" valor={email} valorMudou={setEmail} tipo="text" obrigatorio/>
                    <InputTxt label="" placeholder="Senha:" valor={senha} valorMudou={setSenha} tipo="password" obrigatorio/>
                <div className="mt-10">
                    <BtnGradient text="Criar sua viagem"/>
                </div>
                </div>
            </div>
            <div className="flex justify-center items-center w-1/2 p-20">
                <TxtHome />
            </div>
        </div>
    )
}