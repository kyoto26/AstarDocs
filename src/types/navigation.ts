import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  DocumentScanner: undefined;
  DocumentViewer: { documentId: string };
  Settings: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DocumentScannerScreenProps = NativeStackScreenProps<RootStackParamList, 'DocumentScanner'>;
export type DocumentViewerScreenProps = NativeStackScreenProps<RootStackParamList, 'DocumentViewer'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;
