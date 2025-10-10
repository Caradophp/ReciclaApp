import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<any>(null);
  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);

  function login(email: string, senha: string) {
    if (email === "admin" && senha === "123") {
      setUsuario({ nome: "Administrador", tipo: "coletor" });
      return true;
    } else if (email === "user" && senha === "123") {
      setUsuario({ nome: "Usuário", tipo: "usuario" });
      return true;
    } else {
      return false;
    }
  }

  function adicionarSolicitacao(nova: any) {
    setSolicitacoes((prev) => [...prev, nova]);
  }

  function logout() {
    setUsuario(null);
    setSolicitacoes([]);
  }

  return (
    <AppContext.Provider
      value={{ usuario, solicitacoes, login, adicionarSolicitacao, logout }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
