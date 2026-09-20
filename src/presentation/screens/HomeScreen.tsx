import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HomeScreenProps } from '../../types/navigation';

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation: _navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AstarDocs</Text>
      <Text style={styles.subtitle}>Escáner de documentos On-Device y Privado</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('Iniciar escáner')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Escanear Documento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
