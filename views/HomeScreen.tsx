import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';

import { useApp } from '../context/AppContext';
import ColetorView from './assets/ColetorView';
import UserView from './assets/UserView';

export default function HomeScreen() {
  const { usuario, solicitacoes, adicionarSolicitacao, logout } = useApp();
  const [showModal, setShowModal] = useState(false);

  function handleNovaSolicitacao() {
    const nova = {
      id: Date.now(),
      usuario: usuario?.nome,
      endereco: 'Rua das Palmeiras, 123',
      status: 'pendente',
    };
    adicionarSolicitacao(nova);
    setShowModal(false);
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Erro: usuário não encontrado</Text>
      </View>
    );
  }

  if (usuario.tipo === 'COLETOR') {
    return ColetorView();
  }

  return UserView();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 10,
  }
});
