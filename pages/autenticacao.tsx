import BtnGradient from "@/components/inputs/BtnGradient";
import InputTxt from "@/components/inputs/InputTxt";
import TxtHome from "@/components/TxtHome";
import { useState } from "react";

export default function Login(){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nome, setNome] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [erro, setErro] = useState(null);
    const [modo, setModo] = useState<"login" | "cadastro">("login");

    function submeter(){
        if (modo === "login"){
            console.log("login")
        }else {
        console.log("cadastro")
        }
    }

     function SenhasIguais(){
        if(senha !== confirmarSenha){
            alert("Senha nao é igual")
            return;
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        SenhasIguais();
        const userData = { nome, email, senha };
        const res = await fetch('/api/cadastrar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        const result = await res.json();
        // Trate a resposta aqui
      };
      

    return (
        <div className="bg-hero-login w-screen h-screen bg-cover bg-center flex">
            {modo === "login" 
            ?
                <div className="w-full h-full flex">
                    <div className="w-1/2 h-full bg-black/35 rounded-r-3xl flex flex-col justify-center items-center">
                        <div className="w-1/2">
                            <InputTxt label="" placeholder="Email:" valor={email} valorMudou={setEmail} tipo="text" obrigatorio />
                            <InputTxt label="" placeholder="Senha:" valor={senha} valorMudou={setSenha} tipo="password" obrigatorio />
                            <div className="mt-10">
                                <BtnGradient text="Criar sua viagem" />
                            </div>
                            <p className="text-white">Novo por aqui?<a onClick={() => setModo("cadastro")} className="text-blue-500 hover:text-blue-700 cursor-pointer">Crie uma conta Gratuitamente</a></p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-1/2 p-20">
                        <TxtHome />
                    </div>
                </div>
            :
                <div className="w-full h-full flex">
                    <div className="flex justify-center items-center w-1/2 p-20">
                        <TxtHome />
                    </div>
                    <div className="w-1/2 h-full bg-black/35 rounded-l-3xl flex flex-col justify-center items-center">
                        <div className="w-1/2">
                            <InputTxt label="" placeholder="Nome" valor={nome} valorMudou={setNome} tipo="text" obrigatorio />
                            <InputTxt label="" placeholder="Email:" valor={email} valorMudou={setEmail} tipo="email" obrigatorio />
                            <InputTxt label="" placeholder="Senha:" valor={senha} valorMudou={setSenha} tipo="password" obrigatorio />
                            <InputTxt label="" placeholder="Senha:" valor={confirmarSenha} valorMudou={setConfirmarSenha} tipo="password" obrigatorio />

                            <div className="mt-10">
                                <button className="text-white" onClick={handleSubmit}>Crie sua conta</button>
                            </div>
                            <p className="text-white">Já tem conta?<a onClick={() => setModo("login")} className="text-blue-500 hover:text-blue-700 cursor-pointer"> Faça login</a></p>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    )
}