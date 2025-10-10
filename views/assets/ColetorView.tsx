import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useApp } from '../../context/AppContext';

function ColetorView() {
  const { usuario, solicitacoes, adicionarSolicitacao, logout } = useApp();

  useEffect(() => {
    if (solicitacoes.length === 0) {
      const novaSolicitacao = {
        id: Date.now(),
        usuario: usuario?.nome || 'Desconhecido',
        endereco: 'Rua das Palmeiras, 123',
        status: 'pendente',
      };
      adicionarSolicitacao(novaSolicitacao);
    }
  }, []);

  function mudarStatus(id: number, novoStatus: string) {
    const solicitacao = solicitacoes.find((s: { id: number }) => s.id === id);
    if (solicitacao) {
      const solicitacaoAtualizada = { ...solicitacao, status: novoStatus };
      // Supondo que exista um método para atualizar a solicitação no contexto:
      if (typeof adicionarSolicitacao === 'function') {
        adicionarSolicitacao(solicitacaoAtualizada);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, coletor 👋</Text>
      <Text style={styles.subtitle}>Veja as solicitações abaixo:</Text>

      <FlatList
        data={solicitacoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemText}>📍 {item.endereco}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
            <TouchableOpacity style={styles.button} onPress={mudarStatus.bind(null, solicitacoes[0]?.id, 'coletado')}>
              <Text style={styles.buttonText}>Coletado</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ColetorView;

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
  },
  subtitle: {
    fontSize: 16,
    color: '#388E3C',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#43A047',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
    elevation: 3,
  },
  itemText: {
    fontSize: 15,
    color: '#2E7D32',
  },
  status: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
});
