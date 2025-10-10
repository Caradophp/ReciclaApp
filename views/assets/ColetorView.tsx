import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { useApp } from '../../context/AppContext';

function ColetorView() {
    const {solicitacoes, logout } = useApp();
    return (<View style={styles.container}>
        <Text style={styles.title}>Olá, coletor 👋</Text>
        <Text style={styles.subtitle}>Você é um coletor. Veja as solicitações abaixo:</Text>
    
        <FlatList
        
            data={solicitacoes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.card}>
                  <Text style={styles.itemText}>
                    📍 {item.endereco}
                  </Text>
                  <Text style={styles.status}>Status: {item.status}</Text>
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
});
