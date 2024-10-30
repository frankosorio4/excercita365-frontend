/* eslint-disable */
import { createContext } from "react";
import { useApiUsuario } from "../hooks/useApiUsuario";

export const UsuariosContext = createContext();
export const UsuariosContextProvider = ({ children }) => {

  const { usuarios, loading, setLoading, error, setError } = useApiUsuario();

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        loading,
        setLoading,
        error,
        setError
      }}>
      {children}
    </UsuariosContext.Provider>
  );
};
