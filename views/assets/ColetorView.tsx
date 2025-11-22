import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useApp } from '../../context/AppContext';
import CollectorRegistrationScreen from '../cadastro/CadastroColetorScreen';
import api from '../../utils/api';

function ColetorView() {
  const { usuario, solicitacoes, adicionarSolicitacao, logout } = useApp();

  const [listaSolicitacoes, setListaSolicitacoes] = useState([]);
  const [telaCadastro, setTelaCadastro] = useState(false); // 🔥 controla qual tela aparece

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  async function carregarSolicitacoes() {
    try {
      const response = await api.get(`/solicitacoes/todas`);
      setListaSolicitacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
    }
  }

  async function mudarStatus(id) {
    await api.patch(`solicitacoes/atualizar-status/${id}`);
    carregarSolicitacoes();
  }

  // 🔥 Se telaCadastro for true, renderiza o cadastro e sai daqui
  if (telaCadastro) {
    return (
      <CollectorRegistrationScreen
        onVoltar={() => setTelaCadastro(false)} // botão para voltar
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, coletor 👋</Text>
      <Text style={styles.subtitle}>Veja as solicitações abaixo:</Text>

      <FlatList
        data={listaSolicitacoes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemText}>
              {item.rua}, Nº {item.numero} - {item.bairro}
            </Text>
            <Text style={styles.status}>Status: {item.status}</Text>

            {item.status !== 'CONCLUIDA' && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => mudarStatus(Number(item.id))}
              >
                <Text style={styles.buttonText}>
                  {item.status === 'ANDAMENTO' ? 'Concluído' : 'Andamento'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#555' }}>
            Nenhuma solicitação encontrada
          </Text>
        }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => setTelaCadastro(true)} // 🔥 troca de tela aqui
      >
        <Text style={styles.buttonText}>Cadastrar coletor</Text>
      </TouchableOpacity>

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
    marginTop: 10,
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
