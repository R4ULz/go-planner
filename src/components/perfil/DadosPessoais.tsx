import Image from "next/image";
import { useState, useEffect } from "react";
import { Email, IconeCadeado, iconePerfil } from "../icons";
import { useUser } from "../../contexts/UserContext"; // Importa o contexto do usuário

export default function DadosPessoais({ nome, setNome, email, setEmail, setSenha, setConfirmSenha }) {
    const { user } = useUser();

    const handleNomeChange = (event) => {
        setNome(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
    };
    
    const handleConfirmSenhaChange = (event) => {
        setConfirmSenha(event.target.value);
    };

    const fetchUserData = async (email) => {
        try {
          const res = await fetch('/api/getUserByEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
    
          const data = await res.json();
    
          if (res.ok) {
            // Preenche os dados nos inputs
            setNome(data.user.nome);
            setEmail(data.user.email);
          } else {
            console.log('Usuário não encontrado ou erro:', data.message);
          }
        } catch (error) {
          console.error('Erro ao buscar os dados do usuário:', error);
        }
      };
    
      // Carrega os dados do usuário quando o componente for montado
      useEffect(() => {
        if (user && user.email) {
          fetchUserData(user.email); // Busca os dados do usuário usando o email
        }
      }, [user]);

    return (
        <div className="bg-white w-full h-full rounded-xl border-[1px] shadow-xl border-zinc-400 flex flex-col">
            <div className="h-full -space-y-12 py-14 max-hd:py-5 max-hd:px-5 px-20">
                <div className="h-1/3 px-16">
                        <Image className="rounded-full size-44 max-hd:size-24 mb-28" src="/imgs/perfil.jpg" width={176} height={176} alt="imagem de perfil"></Image>
                </div>
                <div className="h-2/3">
                    <div className="px-16">
                        <div className="relative flex items-center border border-zinc-400 rounded-xl p-4">
                            <i className="absolute left-3 text-zinc-500">
                                {iconePerfil}
                            </i>
                            <input type="text" placeholder="Nome:" className="pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none" value={nome} onChange={(event) => setNome(event.target.value)} />
                        </div>
                    </div>
                    <div className="px-16 py-2 max-hd:py-2 space-y-2 max-hd:space-y-2">
                        <div className="relative flex items-center border border-zinc-400 rounded-xl p-4">
                            <i className="absolute left-3 text-zinc-500">
                                {Email}
                            </i>
                            <input type="text" placeholder="Email:" className="pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none" value={email} onChange={handleEmailChange}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}