import { calendariu } from "../icons/teste";
import { canetinha } from "../icons";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

export default function DadosPrincipais({ tripData, handleUpdateTrip }) {
  const { nomeViagem, destino, dataIda, dataVolta, descricao, imagem } = tripData;

  const [suggestions, setSuggestions] = useState([]);

  // Função para buscar as sugestões da API LocationIQ
  const fetchLocationSuggestions = async (inputValue: string) => {
    if (inputValue.length > 2) {
      try {
        const response = await axios.get(
          `https://eu1.locationiq.com/v1/autocomplete.php`,
          {
            params: {
              key: process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY, // Sua chave de API
              q: inputValue,
              format: "json",
            },
          }
        );
        //aaa
        setSuggestions(response.data);
      } catch (error) {
        console.error("Erro ao buscar sugestões de localizações:", error);
      }
    } else {
      setSuggestions([]); // Limpa as sugestões se o usuário apagar o texto
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleUpdateTrip({ [name]: value });

    if (name === "destino") {
      fetchLocationSuggestions(value);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    handleUpdateTrip({ destino: suggestion.display_name });
    setSuggestions([]); // Limpa as sugestões após a seleção
  };
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageURL = URL.createObjectURL(file); // Cria um URL temporário para a imagem
      handleUpdateTrip({ imagem: imageURL }); // Atualiza o campo imagem nos dados da viagem
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSave = () => {
    sessionStorage.setItem("tripData", JSON.stringify(tripData));
    alert("Viagem salva!");
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
              name="nomeViagem"
              className="border border-zinc-300 rounded-lg p-3 focus:outline-none"
              value={nomeViagem}
              onChange={handleChange}
            />
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
            {suggestions.length > 0 && (
              <ul className="absolute z-10 top-full left-0 right-0 border border-zinc-300 mt-2 rounded-lg max-h-40 overflow-y-auto bg-white">
                {suggestions.map((suggestion: any, index: number) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-zinc-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <hr className="border-zinc-300" />
          <div className="gap-10 flex justify-between">
            <div className={`relative flex items-center w-full border rounded-xl p-3`}>
              <i className={`absolute left-3`}>{calendariu}</i>
              <input
                type="date"
                name="dataIda"
                className={`pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none`}
                value={dataIda}
                onChange={handleChange}
              />
            </div>
            <div className={`text-zinc-700 relative flex items-center border w-full rounded-xl p-3`}>
              <i className={`absolute left-3`}>{calendariu}</i>
              <input
                type="date"
                name="dataVolta"
                className={`pl-10 w-full text-zinc-700 border-none rounded-xl focus:outline-none`}
                value={dataVolta}
                onChange={handleChange}
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
                className="rounded-xl size-96"
              />
            ) : (
              <Image
                src="/imgs/rio.jpg"
                alt="Imagem Selecionada"
                width={500}
                height={500}
                className="rounded-xl size-96"
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
