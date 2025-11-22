import axios from "axios";
import CookieManager from "@react-native-cookies/cookies";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { restoreCookies } from "../utils/api";
import React, { createContext, useContext, useState } from "react";
import { encode as btoa } from "base-64";
import { Alert } from "react-native";

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<any>(null);
  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);

  async function login(email: string, senha: string) {
    try {
        const credentials = btoa(`${email}:${senha}`);
        const response = await fetch("http://10.0.2.2:8080/usuarios/login", {
          method: "POST",
          headers: {
            "Authorization": `Basic ${credentials}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Falha no login. Verifique suas credenciais.");
        }

        const data = await response.json();

        // Alert.alert(data.id);
        // Salva o usuário e o header de autorização
        setUsuario(data);
        await AsyncStorage.setItem("authHeader", `Basic ${credentials}`);
        await AsyncStorage.setItem("iduser", data.id);

        console.log("Login bem-sucedido. Authorization salvo!");
        return true;
      } catch (error) {
        console.error("Erro no login:", error);
        return false;
      }
    }

  async function cadastarUsuario(nome: string, email: string, senha: string, tipo: string, idRua: bigint, numero: number, image: string) {
    try {
      const response = await fetch("http://10.0.2.2:8080/usuarios/procedure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
          tipo,
          idRua,
          numero,
          image,
        }),
      });

      if (!response.ok) throw new Error("Falha no cadastro. Tente novamente.");

      return true;

    } catch (error) {
        console.error("Erro no cadastro:", error);
    }
  }

  async function adicionarSolicitacao(nova: any) {
    try {
      const response = await api.post("/solicitacoes", nova);
      const solicitacaoCriada = response.data;
      setSolicitacoes((prev) => [...prev, solicitacaoCriada]);
    } catch (error) {
      console.error("Erro ao adicionar solicitação:", error);
    }
  }

  async function trasTodasSolicitacoes() {
    try {
      const idUsuario = Number(await AsyncStorage.getItem("iduser"));

      const response = await api.get(`/solicitacoes/${idUsuario}`);
      const solicitacoes = response.data; // é uma lista

      if (solicitacoes.length === 0) {
        Alert.alert("Nenhuma solicitação encontrada.");
        return;
      }

      // Exemplo: exibir todas em um alert
      let msg = solicitacoes.map((s: { bairro: any; rua: any; numero: any; status: any; }) => 
        `Bairro: ${s.bairro}\nRua: ${s.rua}, Nº ${s.numero}\nStatus: ${s.status}`
      ).join("\n\n");

      Alert.alert("Solicitações encontradas", msg);

    } catch (error) {
      console.error("Erro ao listar solicitações:", error);
      Alert.alert("Erro ao listar solicitações");
    }
  }

  async function atualizarSolicitacao() {
    
  }


  function logout() {
    setUsuario(null);
    setSolicitacoes([]);
    AsyncStorage.removeItem("authHeader");
  }

  async function recuperaIdUsuarioLogado() {
    const json = await AsyncStorage.getItem('iduser');
    if (!json) return 0; // nenhum usuário logado
    const usuario = JSON.parse(json);
    return usuario.id;
  }

  async function getAuthHeader() {
    const value = await AsyncStorage.getItem("authHeader");
    return value ? value : null;
  }

  return (
    <AppContext.Provider
      value={{ usuario, solicitacoes, cadastarUsuario, trasTodasSolicitacoes, login, adicionarSolicitacao, recuperaIdUsuarioLogado, logout }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

