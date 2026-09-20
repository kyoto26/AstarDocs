import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { DocumentScannerScreenProps } from '../../types/navigation';
import { SaveDocumentUseCase } from '../../domain/usecases/SaveDocumentUseCase';
import { LocalDocumentRepositoryImpl } from '../../infrastructure/repositories/LocalDocumentRepositoryImpl';

export const DocumentScannerScreen: React.FC<DocumentScannerScreenProps> = ({ navigation }) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  /**
   * Initialize SaveDocumentUseCase with its implementation.
   * In a real-world app, this would be managed by a Dependency Injection container.
   */
  const saveDocumentUseCase = useMemo(() => {
    const repository = new LocalDocumentRepositoryImpl();
    return new SaveDocumentUseCase(repository);
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  /**
   * Captures a photo and saves it to permanent local storage.
   */
  const takePhoto = async (): Promise<void> => {
    try {
      if (camera.current == null) {
        return;
      }

      const photo = await camera.current.takePhoto({
        flash: 'off',
        enableShutterSound: false,
      });

      console.log('Temporary photo path:', photo.path);

      // Save the document permanently using the use case
      const permanentPath = await saveDocumentUseCase.execute(photo.path);
      console.log('Permanent document path:', permanentPath);
      
    } catch (error) {
      console.error('Error during photo capture or save:', error);
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Solicitando permisos de cámara...</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se detectó un dispositivo de cámara posterior.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.shutterButton}
          onPress={takePhoto}
          activeOpacity={0.7}
        >
          <View style={styles.shutterInner} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 20,
  },
  errorText: {
    color: '#F8FAFC',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  overlay: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  shutterButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 20,
  },
  cancelButtonText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
});
