import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Definição do tipo User
interface User {
  foto: any;
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  amigos: string[];
}

interface UserContextProps {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (userData: User, token: string) => {
    setUser(userData); 
    setToken(token);   
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null); // Remove as informações do usuário ao deslogar
    setToken(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');   
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedToken = sessionStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
