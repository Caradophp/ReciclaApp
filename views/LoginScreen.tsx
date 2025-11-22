import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import HomeScreen from './HomeScreen';

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { usuario, login } = useApp();

  if (usuario) {
    return <HomeScreen />;
  }

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    const sucesso = await login(email, senha);

    if (!sucesso) {
      Alert.alert("Erro", "Usuário ou senha inválidos!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Recicla App ♻️</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#88A7A5"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#88A7A5"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#C8E6C9",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 16,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    width: "100%",
    backgroundColor: "#F1F8E9",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#C5E1A5",
  },

  button: {
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
