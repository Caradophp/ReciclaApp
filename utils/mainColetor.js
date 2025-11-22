import React, { useState } from "react";
import ColetorView from "./ColetorView";
import CollectorRegistrationScreen from "../cadastro/CadastroColetorScreen";

export default function MainColetor() {
  const [tela, setTela] = useState("lista");

  function abrirCadastro() {
    setTela("cadastro");
  }

  function voltar() {
    setTela("lista");
  }

  if (tela === "cadastro") {
    return <CollectorRegistrationScreen onVoltar={voltar} />;
  }

  return <ColetorView onAbrirCadastro={abrirCadastro} />;
}
