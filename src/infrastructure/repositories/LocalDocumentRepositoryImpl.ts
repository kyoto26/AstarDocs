import RNFS from 'react-native-fs';
import { DocumentRepository } from '../../domain/repositories/DocumentRepository';

/**
 * Implementation of DocumentRepository using react-native-fs for local storage.
 */
export class LocalDocumentRepositoryImpl implements DocumentRepository {
  /**
   * Moves a file from a temporary location to the app's permanent document directory.
   * 
   * @param tempFilePath - The current temporary URI/path.
   * @returns The permanent URI of the saved file.
   */
  async saveDocument(tempFilePath: string): Promise<string> {
    try {
      const fileName = `doc_${Date.now()}.jpg`;
      const permanentPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      // Move the file to permanent storage
      await RNFS.moveFile(tempFilePath, permanentPath);

      // Return the permanent URI (using 'file://' prefix for local files)
      return `file://${permanentPath}`;
    } catch (error) {
      console.error('LocalDocumentRepositoryImpl.saveDocument error:', error);
      throw new Error('Failed to save document to local storage');
    }
  }
}
