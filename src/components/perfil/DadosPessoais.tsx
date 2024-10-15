import Image from "next/image";
import { useState } from "react";
import { Email, IconeCadeado, iconePerfil } from "../icons";

export default function DadosPessoais() {
    const [nome, setNome] = useState("")
    const handleNomeChange = (event) => {
        setNome(event.target.value);
    };

    const [email, setEmail] = useState("")
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const [senha, setSenha] = useState("")
    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
    };

    const [confirmSenha, setConfirmSenha] = useState("")
    const handleConfirmSenhaChange = (event) => {
        setConfirmSenha(event.target.value);
    };

    return (
        <div className="bg-white w-full h-full rounded-xl border-[1px] shadow-xl border-zinc-400 flex flex-col">
            <div className="h-full py-14 max-hd:py-5 max-hd:px-5 px-20">
                <div className="h-1/3 px-16">
                        <Image className="rounded-full size-40 max-hd:size-24 mb-28" src="/imgs/perfil.jpg" width={176} height={176} alt="imagem de perfil"></Image>
                </div>
                <div className="h-2/3">
                    <div className="px-16">
                        <div className="relative flex items-center border border-zinc-400 rounded-xl p-2">
                            <i className="absolute left-3 text-zinc-500">
                                {iconePerfil}
                            </i>
                            <input type="text" placeholder="Nome:" className="pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none" value={nome} onChange={handleNomeChange}/>
                        </div>
                    </div>
                    <div className="w-1/2 px-16 py-2 max-hd:py-2 space-y-2 max-hd:space-y-2">
                        <div className="relative flex items-center border border-zinc-400 rounded-xl p-2">
                            <i className="absolute left-3 text-zinc-500">
                                {Email}
                            </i>
                            <input type="text" placeholder="Email:" className="pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none" value={email} onChange={handleEmailChange}/>
                        </div>
                        <div className="relative flex items-center border border-zinc-400 rounded-xl p-2">
                            <i className="absolute left-3 text-zinc-500">
                                {IconeCadeado}
                            </i>
                            <input type="text" placeholder="Senha:" className="pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none" value={senha} onChange={handleSenhaChange}/>
                        </div>
                        <div className="relative flex items-center border border-zinc-400 rounded-xl p-2">
                            <i className="absolute left-3 text-zinc-500">
                                {IconeCadeado}
                            </i>
                            <input type="text" placeholder="Confirmar Senha:" className="pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none" value={confirmSenha} onChange={handleConfirmSenhaChange}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}