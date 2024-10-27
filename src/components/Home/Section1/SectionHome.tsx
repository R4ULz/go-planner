import { useState } from "react";
import InputTxt from "../../inputs/InputTxt";
import BtnGradient from "../../inputs/BtnGradient";
import { Arrows, LineDestiny, Viagem } from "../../icons/index";
import axios from "axios";
import TxtHome from "./TxtHome";

export default function SectionHome() {
  const [pontoPartida, setPontoPartida] = useState("");
  const [pontoIda, setPontoIda] = useState("");
  
  const [suggestionsPartida, setSuggestionsPartida] = useState([]);
  const [suggestionsIda, setSuggestionsIda] = useState([]);

  // Função para buscar sugestões de localizações para o ponto de partida
  const fetchLocationSuggestionsPartida = async (inputValue: string) => {
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
        setSuggestionsPartida(response.data);
      } catch (error) {
        console.error("Erro ao buscar sugestões de localizações:", error);
      }
    } else {
      setSuggestionsPartida([]);
    }
  };

  // Função para buscar sugestões de localizações para o ponto de ida
  const fetchLocationSuggestionsIda = async (inputValue: string) => {
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
        setSuggestionsIda(response.data);
      } catch (error) {
        console.error("Erro ao buscar sugestões de localizações:", error);
      }
    } else {
      setSuggestionsIda([]);
    }
  };

  const handlePartidaChange = (novoValor: string) => {
    setPontoPartida(novoValor);
    fetchLocationSuggestionsPartida(novoValor);
  };
  
  const handleIdaChange = (novoValor: string) => {
    setPontoIda(novoValor);
    fetchLocationSuggestionsIda(novoValor);
  };

  const handleSuggestionClickPartida = (suggestion: any) => {
    setPontoPartida(suggestion.display_name);
    setSuggestionsPartida([]);
  };

  const handleSuggestionClickIda = (suggestion: any) => {
    setPontoIda(suggestion.display_name);
    setSuggestionsIda([]);
  };

  // Função para trocar os valores de pontoPartida e pontoIda
  const swapLocations = () => {
    const tempPartida = pontoPartida;
    setPontoPartida(pontoIda);
    setPontoIda(tempPartida);
  };

  return (
    <div className="h-[664px] flex justify-center items-center max-w-screen-xl w-full">
      <div className="flex w-2/3 h-full p-5 flex-col space-y-2 justify-center items-start">
        <TxtHome />
      </div>
      <div className="flex relative flex-col backdrop-blur-sm bg-black/20 rounded-2xl px-20 py-12 justify-center items-center text-gray-400 max-w-2xl">
        <div className="space-y-14 text-sm w-60 flex justify-start flex-col items-center ">
          <div className="relative w-full ">
            <InputTxt
              label="Ponto de partida:"
              valor={pontoPartida}
              valorMudou={handlePartidaChange}
              tipo="text"
              placeholder="Seu Local"
              obrigatorio
            />
            {suggestionsPartida.length > 0 && (
              <ul className="absolute z-10 top-full left-0 right-0 border border-zinc-300 mt-2 rounded-lg max-h-40 overflow-y-auto bg-white">
                {suggestionsPartida.map((suggestion: any, index: number) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-zinc-200"
                    onClick={() => handleSuggestionClickPartida(suggestion)}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative w-full">
            <InputTxt
              label="Para:"
              valor={pontoIda}
              valorMudou={handleIdaChange}
              tipo="text"
              placeholder="Seu Destino"
              obrigatorio
            />
            {suggestionsIda.length > 0 && (
              <ul className="absolute z-10 top-full left-0 right-0 border border-zinc-300 mt-2 rounded-lg max-h-40 overflow-y-auto bg-white">
                {suggestionsIda.map((suggestion: any, index: number) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-zinc-200"
                    onClick={() => handleSuggestionClickIda(suggestion)}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="absolute flex right-[36px] top-8">{LineDestiny}</div>
          <button onClick={swapLocations} className="absolute flex left-[36px] top-24">{Arrows}</button>
        </div>
        <hr className="mt-5 border border-white w-56" />
        <div className="mt-10 w-60">
          <BtnGradient text="Criar sua viagem" icon={Viagem} />
        </div>
      </div>
    </div>
  );
}
