import { useState } from "react";
import InputTxt from "../../inputs/InputTxt";
import { Arrows, LineDestiny, Viagem } from "../../icons/index";
import axios from "axios";
import TxtHome from "./TxtHome";

export default function SectionHome({pontoPartida, pontoDestino, onPartidaChange, onDestinoChange, onCreateTrip}) {

  const [suggestionsPartida, setSuggestionsPartida] = useState([]);
  const [suggestionsDestino, setSuggestionsDestino] = useState([]);

  // Função para buscar sugestões de localizações para o ponto de partida
  const fetchLocationSuggestions = async (inputValue: string, tipo: "partida" | "destino") => {
    if (inputValue.length > 2) {
      try {
        const response = await axios.get(`https://eu1.locationiq.com/v1/autocomplete.php`, {
          params: {
            key: process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY,
            q: inputValue,
            format: "json",
          },
        });
        tipo === "partida" ? setSuggestionsPartida(response.data) : setSuggestionsDestino(response.data);
      } catch (error) {
        console.error("Erro ao buscar sugestões de localizações:", error);
      }
    } else {
      tipo === "partida" ? setSuggestionsPartida([]) : setSuggestionsDestino([]);
    }
  };
  
  const handleSuggestionClickPartida = (suggestion: any) => {
    onPartidaChange(suggestion.display_name);
    setSuggestionsPartida([]);
  };

  const handleSuggestionClickDestino = (suggestion: any) => {
    onDestinoChange(suggestion.display_name);
    setSuggestionsDestino([]);
  };

  // Função para trocar os valores de pontoPartida e pontoIda
  const swapLocations = () => {
    onPartidaChange(pontoDestino);
    onDestinoChange(pontoPartida);
  };

  return (
    <section className="h-[400px] md:h-[664px] flex-col md:flex-row max-w-screen-xl w-full flex justify-between items-center ">
      <div className="flex md:w-2/3 gap-20 h-full p-5 flex-col space-y-2 md:justify-center items-start">
        <TxtHome />
        <button 
            className="w-[250px] md:hidden flex gap-1 items-center font-inter justify-center bg-gradient-to-r from-rosinha to-laranja px-3 py-2 text-white rounded-xl font-bold "
            onClick={onCreateTrip}>
              {Viagem} Criar sua viagem
            </button>
      </div>
      <div className="flex md:relative flex-col backdrop-blur-sm bg-black/40 rounded-2xl md:px-20 md:py-12 px-3 justify-center items-center text-gray-400 w-[260px] md:w-[450px]">
        <div className="space-y-6 hidden md:block w-full flex justify-start flex-col items-center ">
          <div className="relative w-full ">
            <InputTxt
              label="Ponto de partida:"
              valor={pontoPartida}
              valorMudou={(e) =>{
                const valor = e.target.value
                onPartidaChange(valor)
                fetchLocationSuggestions(valor, "partida")
              }}
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
              valor={pontoDestino}
              valorMudou={(e) =>{
                const valor = e.target.value
                onDestinoChange(valor)
                fetchLocationSuggestions(valor, "destino")
              }}
              tipo="text"
              placeholder="Seu Destino"
              obrigatorio
            />
            {suggestionsDestino.length > 0 && (
              <ul className="absolute z-10 top-full left-0 right-0 border border-zinc-300 mt-2 rounded-lg max-h-40 overflow-y-auto bg-white">
                {suggestionsDestino.map((suggestion: any, index: number) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-zinc-200"
                    onClick={() => handleSuggestionClickDestino(suggestion)}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="hidden md:block md:absolute md:right-[36px] md:top-[68px]">{LineDestiny}</div>
          <button onClick={swapLocations} className="hidden md:block md:absolute md:left-[36px] md:top-32">{Arrows}</button>
        </div>
        <hr className="hidden md:block mt-10 border-b- border-zinc-600 w-full" />
        <div className="md:mt-8 flex justify-center items-center w-full">
          <button 
            className="w-full hidden md:inline-flex flex gap-1 items-center font-inter justify-center bg-gradient-to-r from-rosinha to-laranja px-7 py-3 text-white rounded-xl font-bold "
            onClick={onCreateTrip}>
              {Viagem} Criar sua viagem
            </button>
        </div>
      </div>
    </section>
  );
}
