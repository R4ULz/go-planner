import React, { useState, useEffect } from "react";
import { calendariu } from "../icons/teste";
import { canetinha } from "../icons";

export default function DadosPrincipais({ setTripId }) {
  const [nomeViagem, setNomeViagem] = useState("");
  const [destino, setDestino] = useState("");
  const [dataIda, setDataIda] = useState("");
  const [dataVolta, setDataVolta] = useState("");
  const [descricao, setDescricao] = useState("");

  // Carregar dados do localStorage ao carregar o componente
  useEffect(() => {
    const savedTrip = localStorage.getItem("viagem");
    if (savedTrip) {
      const tripData = JSON.parse(savedTrip);
      setNomeViagem(tripData.titulo);
      setDestino(tripData.destino);
      setDataIda(tripData.dataInicio);
      setDataVolta(tripData.fimViagem);
      setDescricao(tripData.descricao);
    }
  }, []);

  // Função para salvar a viagem no localStorage
  const handleSaveLocal = () => {
    const tripData = {
      titulo: nomeViagem,
      destino,
      dataInicio: dataIda,
      fimViagem: dataVolta,
      descricao,
      atividades: [],
    };
    localStorage.setItem("viagem", JSON.stringify(tripData));
    alert("Viagem salva localmente!");
  };

  // Função para enviar a viagem ao servidor
  const handleSendToServer = async () => {
    const tripData = {
      titulo: nomeViagem,
      destino,
      dataInicio: dataIda,
      fimViagem: dataVolta,
      descricao,
      atividades: [],
    };
    try {
      const response = await fetch("/api/createTrip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Viagem enviada ao servidor com sucesso!");
        localStorage.removeItem("viagem"); // Limpa o localStorage após salvar no servidor
        setTripId(data.data);
      } else {
        alert("Erro ao enviar a viagem: " + data.error);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao enviar a viagem.");
    }
  };

  return (
    <div className="w-full">
      <div>
        <h1 className="text-xl font-bold font-inter">
          Dados Principais
          <span className="size-[5px] inline-block rounded-full bg-rosinha ml-1"></span>
        </h1>
      </div>
      <div className="flex justify-between">
        <div className="mt-8 space-y-7 w-1/2">
          <div className="flex flex-col">
            <label className="text-zinc-700 font-inter pl-1">Nome da sua viagem:</label>
            <input
              type="text"
              className="border border-zinc-300 rounded-lg p-3 focus:outline-none"
              value={nomeViagem}
              onChange={(e) => setNomeViagem(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-zinc-700 font-inter pl-1">Destino:</label>
            <input
              type="text"
              className="border border-zinc-300 rounded-lg p-3 focus:outline-none"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            />
          </div>
          <hr className="border-zinc-300" />
          <div className="gap-10 flex justify-between">
            <div className={`relative flex items-center w-full border rounded-xl p-3`}>
              <i className={`absolute left-3`}>{calendariu}</i>
              <input
                type="date"
                className={`pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none`}
                value={dataIda}
                onChange={(e) => setDataIda(e.target.value)}
              />
            </div>
            <div className={`text-zinc-700 relative flex items-center border w-full rounded-xl p-3`}>
              <i className={`absolute left-3`}>{calendariu}</i>
              <input
                type="date"
                className={`pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none`}
                value={dataVolta}
                onChange={(e) => setDataVolta(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="text-zinc-700 font-inter pl-1">Descrição:</label>
            <textarea
              className="h-32 w-full rounded-xl border resize-none focus:outline-none px-2"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex items-center flex-col">
            <hr className="size-80 bg-zinc-700 rounded-xl" />
            <button>
              <p className="text-zinc-700 text-center flex items-center gap-2">
                {canetinha}Editar Imagem
              </p>
            </button>
          </div>
          <div className="space-x-10 flex justify-center pt-24">
            <button className="bg-rosinha text-white font-inter text-xl px-5 py-1 rounded-lg">
              Cancelar
            </button>
            <button
              className="bg-laranja text-white font-inter text-xl px-5 py-1 rounded-lg"
              onClick={handleSaveLocal}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
