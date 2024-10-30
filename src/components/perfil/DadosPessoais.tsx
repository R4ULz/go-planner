import Image from "next/image";
import { useState, useEffect } from "react";
import { Email,iconePerfil } from "../icons";
import { useUser } from "../../contexts/UserContext"; // Importa o contexto do usuário
import { canetinha } from "../icons";

export default function DadosPessoais({ nome, setNome, email, setEmail, imagem}) {
  const { user } = useUser();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    
  };


  const [imagemURL, setImagemURL] = useState(() => localStorage.getItem('imagemURL') || '/imgs/perfil.jpg');

  useEffect(() => {
    localStorage.setItem('imagemURL', imagemURL);
  }, [imagemURL]);
  

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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageURL = URL.createObjectURL(file);
      setImagemURL(imageURL);
    }
  };
  

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const [sexo, setSexo] = useState('');


  return (
    <div className="bg-white w-full h-full rounded-xl border-[1px] shadow-xl border-zinc-400 flex flex-col max-w-screen-xl">
      <div className="h-full py-7 max-hd:py-5 max-hd:px-5 px-20">
        <div className="h-1/3 px-16 mb-8">
        <div className="w-1/2">
          <div className="flex items-center flex-col w-[176px] h-[176px]">
              <Image
                src={imagemURL}
                alt="Imagem Selecionada"
                width={176}
                height={176}
                className="rounded-[100px]"
              />
            <button onClick={handleClick} className="text-zinc-700 text-center flex items-center gap-2">
              {canetinha}
              Editar Imagem
            </button>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
           </div>
          </div>
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
          <div className="px-16 py-5 max-hd:py-2 space-y-2 max-hd:space-y-2">
            <div className={`relative flex items-center border rounded-xl p-4 
              ${editavel ? 'border-zinc-400 bg-white' : 'border-gray-300 bg-gray-200'}`}>
              <i className={`absolute left-3 ${editavel ? 'text-zinc-500' : 'text-gray-500'}`}>
                {Email}
              </i>
              <input type="text" placeholder="Email:" className={`pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none 
                ${editavel ? 'bg-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`} value={email} onChange={handleEmailChange} disabled={!editavel} />
            </div>
          </div>
          <div className="px-16 py-2 space-y-2">
            <div className="flex flex-row gap-20">
              <span className="text-gray-700 font-medium">Sexo:</span>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sexo"
                  value="Masculino"
                  checked={sexo === 'Masculino'}
                  onChange={(e) => setSexo(e.target.value)}
                  className="text-blue-500 focus:ring-blue-400"
                  disabled={!editavel}
                />
                <span className="text-gray-700">Masculino</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sexo"
                  value="Feminino"
                  checked={sexo === 'Feminino'}
                  onChange={(e) => setSexo(e.target.value)}
                  className="text-blue-500 focus:ring-blue-400"
                  disabled={!editavel}
                />
                <span className="text-gray-700">Feminino</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sexo"
                  value="Não informar"
                  checked={sexo === 'Não informar'}
                  onChange={(e) => setSexo(e.target.value)}
                  className="text-blue-500 focus:ring-blue-400"
                  disabled={!editavel}
                  defaultChecked
                />
                <span className="text-gray-700">Não informar</span>
              </label>
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