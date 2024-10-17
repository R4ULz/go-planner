import Image from "next/image";
import { useState, useEffect } from "react";
import { Email,iconePerfil } from "../icons";
import { useUser } from "../../contexts/UserContext"; // Importa o contexto do usuário

export default function DadosPessoais({ nome, setNome, email, setEmail}) {
  const { user } = useUser();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const [editavel, setEditavel] = useState(false)

  const habilitarEdicao = () => {
    setEditavel(true);
  }

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
        setNome(data.user.nome);
        setEmail(data.user.email);
      } else {
        console.log('Usuário não encontrado ou erro:', data.message);
      }
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário:', error);
    }
  };

  useEffect(() => {
    if (user && user.email) {
      fetchUserData(user.email);
    }
  }, [user]);

  return (
    <div className="bg-white w-full h-full rounded-xl border-[1px] shadow-xl border-zinc-400 flex flex-col">
      <div className="h-full py-7 max-hd:py-5 max-hd:px-5 px-20">
        <div className="h-1/3 px-16 mb-8">
          <Image className="rounded-full size-44 max-hd:size-36 mb-28" src="/imgs/perfil.jpg" width={176} height={176} alt="imagem de perfil"></Image>
        </div>
        <div className="h-2/3">
          <div className="px-16">
            <div className={`relative flex items-center border rounded-xl p-4 
              ${editavel ? 'border-zinc-400 bg-white' : 'border-gray-300 bg-gray-200'}`}>
              <i className={`absolute left-3 ${editavel ? 'text-zinc-500' : 'text-gray-500'}`}>
                {iconePerfil}
              </i>
              <input
                type="text"
                placeholder="Nome:"
                className={`pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none 
                ${editavel ? 'bg-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                disabled={!editavel}
              />
            </div>
          </div>
          <div className="px-16 py-2 max-hd:py-2 space-y-2 max-hd:space-y-2">
            <div className={`relative flex items-center border rounded-xl p-4 
              ${editavel ? 'border-zinc-400 bg-white' : 'border-gray-300 bg-gray-200'}`}>
              <i className={`absolute left-3 ${editavel ? 'text-zinc-500' : 'text-gray-500'}`}>
                {Email}
              </i>
              <input type="text" placeholder="Email:" className={`pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none 
                ${editavel ? 'bg-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`} value={email} onChange={handleEmailChange} disabled={!editavel} />
            </div>
          </div>
          <div className="flex px-16 mt-5">
            <button
              onClick={habilitarEdicao}
              className="border-[1px] border-laranja text-laranja px-4 py-2 rounded-xl"
            >
              Editar Informações
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}