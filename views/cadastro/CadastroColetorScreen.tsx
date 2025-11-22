import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import api from '../../utils/api';

function CollectorRegistrationScreen({ onVoltar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [tipoMaterial, setTipoMaterial] = useState("");

  async function cadastarUsuario(nome: string, email: string, senha: string, tipoUsuario: string, idRua: number, numero: string, img: string) {

    await api.post("usuarios/procedure", {
        nome,
        email,
        senha,
        tipoUsuario,
        idRua,
        numero,
        img
      });
    
  }

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmarSenha || !tipoMaterial) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    await cadastarUsuario(nome, email, senha, "COLETOR", 4, "", "");

    Alert.alert("Sucesso", "Coletor cadastrado com sucesso!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Coletor</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#777"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#777"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#777"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* 🔥 BOTÃO DE VOLTAR */}
      {onVoltar && (
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={onVoltar}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default CollectorRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F2F1",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#00796B",
  },
  input: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#B2DFDB",
  },
  button: {
    backgroundColor: "#00796B",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  backButton: {
    backgroundColor: "#004D40", // cor diferente para "Voltar"
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
