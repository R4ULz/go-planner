import React, { createContext, useState, useContext, ReactNode } from 'react';
import Atividade from "./TripContext"

interface AtividadesContextProps {
  atividades: Atividade[];
  setAtividades: (atividades: Atividade[]) => void;
}

const AtividadesContext = createContext<AtividadesContextProps | undefined>(undefined);

export const AtividadesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [atividades, setAtividades] = useState<Atividade[]>([]);

  return (
    <AtividadesContext.Provider value={{ atividades, setAtividades }}>
      {children}
    </AtividadesContext.Provider>
  );
};

export const useAtividades = (): AtividadesContextProps => {
  const context = useContext(AtividadesContext);
  if (!context) {
    throw new Error('useAtividades deve ser usado dentro de um AtividadesProvider');
  }
  return context;
};
