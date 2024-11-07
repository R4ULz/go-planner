import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { canetinha } from "../icons";

export default function EditarDadosPrincipais({ tripData }) {
  const [formData, setFormData] = useState({
    nomeViagem: "",
    partida: "",
    destino: "",
    DataIda: "",
    DataRetorno: "",
    descricao: "",
    imagem: "/imgs/rio.jpg",
  });

  const [suggestionsPartida, setSuggestionsPartida] = useState<any[]>([]);
  const [suggestionsDestino, setSuggestionsDestino] = useState<any[]>([]);

  // Sincroniza formData com tripData ao montar o componente ou atualizar tripData
  useEffect(() => {
    if (tripData) {
      setFormData({
        nomeViagem: tripData.nomeViagem || "",
        partida: tripData.partida || "",
        destino: tripData.destino || "",
        DataIda: tripData.DataIda || "",
        DataRetorno: tripData.DataRetorno || "",
        descricao: tripData.descricao || "",
        imagem: tripData.imagem || "/imgs/rio.jpg",
      });
    }
  }, [tripData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageURL = URL.createObjectURL(file);
      setFormData((prevData) => ({ ...prevData, imagem: imageURL }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.nomeViagem || !formData.partida || !formData.destino || !formData.DataIda || !formData.DataRetorno) {
      Toastify({
        text: 'Todos os campos são obrigatórios!',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        style: { background: "#ce1836" },
      }).showToast();
      return;
    }

    try {
      await axios.put(`/api/trip/${tripData._id}`, formData);
      Toastify({
        text: 'Viagem atualizada com sucesso!',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
      }).showToast();
    } catch (error) {
      console.error("Erro ao atualizar viagem:", error);
      Toastify({
        text: 'Erro ao atualizar viagem. Tente novamente!',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        style: { background: "#ce1836" },
      }).showToast();
    }
  };

  return (
    <div className="w-full max-w-screen-xl">
      <h1 className="text-xl font-bold font-inter">Editar Dados da Viagem</h1>
      <div className="flex justify-between max-hd:gap-20">
        <div className="mt-8 space-y-7 w-1/2">
          <div className="flex flex-col">
            <label className="text-zinc-700 font-inter pl-1">Nome da sua viagem:</label>
            <input
              type="text"
              name="nomeViagem"
              value={formData.nomeViagem}
              onChange={handleChange}
              className="border border-zinc-300 rounded-lg p-3 focus:outline-none"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-zinc-700 font-inter pl-1">Ponto de Partida:</label>
            <input
              type="text"
              name="partida"
              value={formData.partida}
              onChange={handleChange}
              className="border border-zinc-300 rounded-lg p-3 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-zinc-700 font-inter pl-1">Destino:</label>
            <input
              type="text"
              name="destino"
              value={formData.destino}
              onChange={handleChange}
              className="border border-zinc-300 rounded-lg p-3 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-zinc-700 font-inter pl-1">Descrição:</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="border border-zinc-300 rounded-lg p-3 focus:outline-none resize-none"
            />
          </div>

          <div className="flex gap-6">
            <input
              type="date"
              name="DataIda"
              value={formData.DataIda}
              onChange={handleChange}
              className="border border-zinc-300 rounded-lg p-3 focus:outline-none"
            />
            <input
              type="date"
              name="DataRetorno"
              value={formData.DataRetorno}
              min={formData.DataIda}
              onChange={handleChange}
              className="border border-zinc-300 rounded-lg p-3 focus:outline-none"
            />
          </div>
          
          <button onClick={handleSubmit} className="bg-laranja text-white px-5 py-2 rounded-lg">
            Atualizar Viagem
          </button>
        </div>

        <div className="w-1/2">
          <div className="flex flex-col items-center">
            <Image
              src={formData.imagem}
              alt="Imagem Selecionada"
              width={500}
              height={500}
              className="rounded-xl size-96 max-hd:size-80"
            />
            <button onClick={() => document.getElementById("fileInput")?.click()} className="text-zinc-700 flex gap-2">
              {canetinha} Editar Imagem
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
    </div>
  );
}
