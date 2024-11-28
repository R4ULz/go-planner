import Image from "next/image";
import { useState, useEffect } from "react";
import { Email, iconePerfil } from "../icons";
import { useUser } from "../../contexts/UserContext"; // Importa o contexto do usuário
import { canetinha } from "../icons";
import Toastify from "toastify-js";

export default function DadosPessoais({ nome, setNome, email, setEmail, foto }) {
  const { user } = useUser();
  const [imagemURL, setImagemURL] = useState('/imgs/perfil.jpg'); // Padrão inicial
  const [cpf, setCpf] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

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
        setCpf(data.user.cpf);

        // Define imagem de perfil do usuário ou imagem padrão
        setImagemURL(data.user.foto || '/imgs/perfil.jpg');
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

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('profilePic', file);
      formData.append('id', user.id); 

      try {
        const res = await fetch('/api/uploadProfilePicture', {
          method: 'POST',
          body: formData,
        });
  
        const data = await res.json();
        if (res.ok) {
          setImagemURL(data.foto); // Atualiza a URL da imagem no estado após o upload
          Toastify({
            text: "Imagem de perfil atualizada com sucesso",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
        } else {
          console.error('Erro ao atualizar imagem:', data.message);
          Toastify({
            text: "Erro ao atualizar imagem",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ce1836",
            },
        }).showToast();
        }
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
        Toastify({
          text: "Erro ao fazer upload da imagem",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
              background: "#ce1836",
          },
      }).showToast();
      }
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
          foto: foto,
          cpf: cpf,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setEditavel(false);
        Toastify({
          text: "Dados atualizados com sucesso",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
      }).showToast();      } else {
        console.error('Erro ao atualizar os dados do usuário:', data.message);
        Toastify({
          text: "Erro ao atualizar os dados do usuário",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
              background: "#ce1836",
          },
      }).showToast();      }
    } catch (error) { 
      console.error('Erro ao atualizar os dados do usuário:', error);
      Toastify({
        text: "Erro ao atualizar os dados do usuário",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#ce1836",
        },
    }).showToast();    }
  };

  return (
    <div className="bg-white w-full h-full rounded-xl border-[1px] shadow-xl border-zinc-400 flex flex-col max-w-screen-xl">
      <div className="h-full py-7 max-hd:py-5 max-hd:px-5 px-20">
        <div className="h-1/3 px-16 mb-8">
          <div className="w-1/2">
            <div className="flex items-center flex-col w-[176px] h-[176px]">
              <Image
                src={imagemURL} // URL da imagem de perfil atual
                alt="Imagem Selecionada"
                width={176}
                height={176}
                className="rounded-[100px]"
              />
              <button onClick={handleClick} className="text-zinc-700 text-center flex items-center gap-2 ">
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
              className={`relative flex items-center border rounded-xl p-4 pl-10 w-full text-zinc-700 border-gray-300 rounded-xl focus:outline-none ${editavel ? 'border-zinc-400 bg-white' : 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              disabled={!editavel}
            />
          </div>
          <div className="px-16 py-5">
            <input
              type="text"
              placeholder="Email"
              className={`relative flex items-center border rounded-xl p-4 pl-10 w-full text-zinc-700 border-gray-300 rounded-xl focus:outline-none ${editavel ? 'border-zinc-400 bg-white' : 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              value={email}
              onChange={handleEmailChange}
              disabled={!editavel}
            />
          </div>
          <div className="px-16">
            <p>
            <input
              type="text"
              placeholder="CPF"
              className={`relative flex items-center border rounded-xl p-4 pl-10 w-full text-zinc-700 border-gray-300 rounded-xl focus:outline-none 'border-zinc-400 bg-white' 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed`}
              value={cpf}
              disabled
            />
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
