import React,{createContext, useState, useContext, ReactNode} from "react";

interface Viagem{
    titulo: string;
    partida: string;
    destino: string;
    dataInicio: string;
    fimViagem: string;
    atividades: Atividade[];
    amigos:string[];
    imagem: string | null;
}

interface Atividade{
    nome: string;
    data: string;
    horario: string;
}

interface ViagemContextProps{
    viagem: Viagem;
    setViagem:(viagem:Viagem) => void
}

const ViagemContext = createContext<ViagemContextProps | undefined>(undefined);

export const ViagemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [viagem, setViagem] = useState<Viagem>({
      titulo: '',
      partida: '',
      destino: '',
      dataInicio: '',
      fimViagem: '',
      atividades: [],
      amigos: [],
      imagem:null,
    });

    return (
        <ViagemContext.Provider value={{ viagem, setViagem }}>
          {children}
        </ViagemContext.Provider>
    );
};

export const useViagem = (): ViagemContextProps => {
    const context = useContext(ViagemContext);
    if (!context) {
      throw new Error('useViagem deve ser usado dentro de um ViagemProvider');
    }
    return context;
  };