import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, GestureResponderEvent, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '../../context/AppContext';
import api from '../../utils/api';

function UserView() {
    const { usuario, solicitacoes, adicionarSolicitacao, recuperaIdUsuarioLogado, logout } = useApp();
    const [showModal, setShowModal] = useState(false);
    const [qtd, setQtd] = useState("");

    const [listaSolicitacoes, setListaSolicitacoes] = useState([]);

    useEffect(() => {
      carregarSolicitacoes();
    }, []);

    async function carregarSolicitacoes() {
        try {
          const idUsuario = await AsyncStorage.getItem("iduser");
          const response = await api.get(`/solicitacoes/${idUsuario}`);
          setListaSolicitacoes(response.data); // ✅ agora sim
        } catch (error) {
          console.error("Erro ao buscar solicitações:", error);
        }
      }

    async function handleNovaSolicitacao() {

      const nova = {
        quantidadeEmQuilos: qtd,
        status: 'PENDENTE',
        idUsuario: await AsyncStorage.getItem("iduser")
      };

      try {
        await adicionarSolicitacao(nova);
        setShowModal(false);
        carregarSolicitacoes();
      } catch (err) {
        console.error("Erro ao criar solicitação:", err);
      }
    }

    return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {usuario?.nome ?? 'Usuário'} 👋</Text>
      <Text style={styles.subtitle}>
        Solicite a coleta dos seus recicláveis abaixo:
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
        <Text style={styles.buttonText}>♻️ Solicitar Coleta</Text>
      </TouchableOpacity>

      <Text style={[styles.subtitle, { marginTop: 20 }]}>
        Minhas Solicitações:
      </Text>

      {/* 🔥 Aqui é onde a lista é exibida */}
      <FlatList
        data={listaSolicitacoes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemText}>
              {item.rua}, Nº {item.numero} - {item.bairro}
            </Text>
            <Text style={styles.status}>Status: {item.status} - Data: {item.data}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#555' }}>
            Nenhuma solicitação encontrada
          </Text>
        }
      />

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Digite a quantidade em quilos</Text>
            <TextInput
              style={styles.input}
              placeholder='Quantidade em quilos'
              value={qtd}
              onChangeText={setQtd}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleNovaSolicitacao}>
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UserView;

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
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#43A047',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelText: {
    marginTop: 10,
    color: '#555',
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
});
