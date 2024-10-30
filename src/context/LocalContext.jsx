/* eslint-disable */
import { createContext } from "react";
import { useApiLocal } from "../hooks/useApiLocal";

export const LocalContext = createContext();
export const LocalContextProvider = ({ children }) => {
  const { locais, atividadesDisponiveis,loading, setLoading, error, setError } = useApiLocal();

  return (
    <LocalContext.Provider
      value={{
        locais,
        atividadesDisponiveis,
        loading,
        setLoading,
        error,
        setError
      }}>
      {children}
    </LocalContext.Provider>
  );
};
