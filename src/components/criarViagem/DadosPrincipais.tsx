import { calendariu } from "../icons/teste";
import { canetinha } from "../icons";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export default function DadosPrincipais({ tripData, handleUpdateTrip, onSaveTrip, }) {
  const { nomeViagem, destino, descricao, imagem, partida } = tripData;
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [suggestionsPartida, setSuggestionsPartida] = useState<any[]>([]);
  const [suggestionsDestino, setSuggestionsDestino] = useState<any[]>([]);
  const [DataIda, setDataIda] = useState(tripData.DataIda || '');
  const [DataRetorno, setDataRetorno] = useState(tripData.DataRetorno || '');

  useEffect(() => {
    console.log("Dados de tripData em Dados Principais:", tripData);
  }, [tripData]);

  // Função para buscar as sugestões da API LocationIQ
  const fetchLocationSuggestions = async (inputValue: string, type: string) => {
    if (inputValue.length > 2) {
      try {
        const response = await axios.get(
          `https://eu1.locationiq.com/v1/autocomplete.php`,
          {
            params: {
              key: process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY,
              q: inputValue,
              format: "json",
            },
          }
        );
        
        if (type === "partida") {
          setSuggestionsPartida(response.data);
        } else if (type === "destino") {
          setSuggestionsDestino(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar sugestões de localizações:", error);
      }
    } else {
      if (type === "partida") {
        setSuggestionsPartida([]);
      } else if (type === "destino") {
        setSuggestionsDestino([]);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleUpdateTrip({ [name]: value });

    if (name === "destino") {
      fetchLocationSuggestions(value, "destino");
    } else if (name === "partida") {
      fetchLocationSuggestions(value, "partida");
    }
  };

  const handleSuggestionClick = (suggestion: any, type: string) => {
    if (type === "partida") {
      handleUpdateTrip({ partida: suggestion.display_name });
      setSuggestionsPartida([]);
    } else if (type === "destino") {
      handleUpdateTrip({ destino: suggestion.display_name });
      setSuggestionsDestino([]);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagemFile(file);
      const imageURL = URL.createObjectURL(file);
      handleUpdateTrip({ imagem: imageURL });
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSave = () => {
    // Atualizar tripData com DataIda e DataRetorno
    handleUpdateTrip({ DataIda, DataRetorno });

    if(!tripData.nomeViagem || !tripData.partida || !tripData.destino || !DataIda || !DataRetorno){
      Toastify({
        text: 'Os campos da viagem precisam estar preenchidos',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style:{
          background: "#ce1836",
        }
      }).showToast();

    } else {
      sessionStorage.setItem("tripData", JSON.stringify(tripData));
      onSaveTrip();
      Toastify({
        text: 'Viagem Salva!',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style:{
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    }
  };
  

  return (
    <div className="w-full max-w-screen-xl">
      <div>
        <h1 className="text-xl font-bold font-inter">
          Dados Principais
          <span className="size-[5px] inline-block rounded-full bg-rosinha ml-1"></span>
        </h1>
      </div>
      <div className="flex justify-between max-hd:gap-20">
        <div className="mt-8 space-y-7 w-1/2">
          <div className="flex flex-col">
            <label className="text-zinc-700 font-inter pl-1">Nome da sua viagem:</label>
            <input
              type="text"
              name="nomeViagem"
              className="border border-zinc-300 rounded-lg p-3 focus:outline-none"
              value={nomeViagem}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col relative">
            <label className="text-zinc-700 font-inter pl-1">Ponto de Partida:</label>
            <input
              type="text"
              name="partida"
              className="border border-zinc-300 rounded-lg p-3 focus:outline-none"
              value={partida}
              onChange={handleChange}
              autoComplete="off"
            />
            {suggestionsPartida.length > 0 && (
              <ul className="absolute z-10 top-full left-0 right-0 border border-zinc-300 mt-2 rounded-lg max-h-40 overflow-y-auto bg-white">
                {suggestionsPartida.map((suggestion: any, index: number) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-zinc-200"
                    onClick={() => handleSuggestionClick(suggestion, "partida")}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-col relative">
            <label className="text-zinc-700 font-inter pl-1">Destino:</label>
            <input
              type="text"
              name="destino"
              className="border border-zinc-300 rounded-lg p-3 focus:outline-none"
              value={destino}
              onChange={handleChange}
              autoComplete="off"
            />
            {suggestionsDestino.length > 0 && (
              <ul className="absolute z-10 top-full left-0 right-0 border border-zinc-300 mt-2 rounded-lg max-h-40 overflow-y-auto bg-white">
                {suggestionsDestino.map((suggestion: any, index: number) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-zinc-200"
                    onClick={() => handleSuggestionClick(suggestion, "destino")}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <hr className="border-zinc-300" />
          <div className="gap-6 flex justify-between">
            <div className={`relative flex items-center w-full border rounded-xl p-3`}>
              <i className={`absolute left-3`}>{calendariu}</i>
              <input
                type="date"
                name="DataIda"
                className={`pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none`}
                value={DataIda}
                onChange={e => setDataIda(e.target.value)}
              />
            </div>
            <div className={`text-zinc-700 relative flex items-center border w-full rounded-xl p-3`}>
              <i className={`absolute left-3`}>{calendariu}</i>
              <input
                type="date"
                name="DataRetorno"
                className={`pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none`}
                value={DataRetorno}
                min={DataIda}
                onChange={e => setDataRetorno(e.target.value)}
                disabled={!DataIda}
              />
            </div>
          </div>
          <div>
            <label className="text-zinc-700 font-inter pl-1">Descrição:</label>
            <textarea
              name="descricao"
              className="h-32 w-full rounded-xl border resize-none focus:outline-none px-2"
              value={descricao}
              onChange={handleChange}
            ></textarea>
             <div className="space-x-10 flex justify-end pt-6">
            <button
              className="bg-laranja text-white font-inter px-5 py-2 rounded-lg"
              onClick={handleSave}
            >
              Salvar Viagem
            </button>
          </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex items-center flex-col">
            {imagem ? (
              <Image
                src={imagem}
                alt="Imagem Selecionada"
                width={500}
                height={500}
                className="rounded-xl size-96 max-hd:size-80"
              />
            ) : (
              <Image
                src="/imgs/rio.jpg"
                alt="Imagem Selecionada"
                width={500}
                height={500}
                className="rounded-xl size-96 max-hd:size-80"
              />
            )}
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
    </div>
  );
}
