import Image from "next/image";
import { useState, useEffect } from "react";
import { Email, iconePerfil } from "../icons";
import { useUser } from "../../contexts/UserContext"; // Importa o contexto do usuário
import { canetinha } from "../icons";

export default function DadosPessoais({ nome, setNome, email, setEmail }) {
  const { user } = useUser();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const [imagemURL, setImagemURL] = useState(localStorage.getItem('imagemURL') || '/imgs/perfil.jpg');

  useEffect(() => {
    localStorage.setItem('imagemURL', imagemURL);
  }, [imagemURL]);

  const [editavel, setEditavel] = useState(false);

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

  const handleImageChange = (event) => {
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

  const [nomeOriginal, setNomeOriginal] = useState(nome);
  const [emailOriginal, setEmailOriginal] = useState(email);

  const habilitarEdicao = () => {
    setEditavel(true);
    setNomeOriginal(nome);
    setEmailOriginal(email);
  };

  const cancelarEdicao = () => {
    setNome(nomeOriginal);
    setEmail(emailOriginal);
    setEditavel(false);
  };

  const salvarEdicao = async () => {
    try {
      const res = await fetch('/api/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id, 
          novoEmail: email,
          nome: nome,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setEditavel(false);
        alert('Dados atualizados com sucesso');
      } else {
        console.error('Erro ao atualizar os dados do usuário:', data.message);
        alert('Erro ao atualizar os dados do usuário');
      }
    } catch (error) { 
      console.error('Erro ao atualizar os dados do usuário:', error);
      alert('Erro ao atualizar os dados do usuário');
    }
  };

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
              <button onClick={() => document.getElementById("fileInput").click()} className="text-zinc-700 text-center flex items-center gap-2 " >
                {canetinha}
                Editar Imagem
              </button>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                disabled={!editavel}
              />
            </div>
          </div>
        </div>
        <div className="h-2/3">
          <div className="px-16">
            <input
              type="text"
              placeholder="Nome"
              className={`relative flex items-center border rounded-xl p-4 pl-10 w-full text-zinc-700 border-gray-300  rounded-xl focus:outline-none 
              ${editavel ? 'border-zinc-400 bg-white' : 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              disabled={!editavel}
            />
          </div>
          <div className="px-16 py-5">
            <input
              type="text"
              placeholder="Email"
              className={`relative flex items-center border rounded-xl p-4 pl-10 w-full text-zinc-700 border-gray-300 rounded-xl focus:outline-none 
              ${editavel ? 'border-zinc-400 bg-white' : 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              value={email}
              onChange={handleEmailChange}
              disabled={!editavel}
            />
          </div>

          <div className="px-16 py-5">
            <p>
              Campo reservado para mostrar dados como CPF e RG
            </p>
          </div>

          <div className="flex px-16 mt-5 gap-4">
            {!editavel ? (
              <button
                onClick={habilitarEdicao}
                className="border-[1px] border-laranja text-laranja px-4 py-2 rounded-xl"
              >
                Editar Informações
              </button>
            ) : (
              <>
                <button
                  onClick={cancelarEdicao}
                  className="bg-rosinha text-white font-bold py-2 rounded-xl w-24"
                >
                  Cancelar
                </button>

                <button
                  onClick={salvarEdicao}
                  className="bg-laranjinha text-white font-bold py-2 rounded-xl w-80"
                >
                  Salvar Informações
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
