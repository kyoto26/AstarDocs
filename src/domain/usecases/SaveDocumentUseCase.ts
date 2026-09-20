import { DocumentRepository } from '../repositories/DocumentRepository';

/**
 * Use case for saving a document to permanent storage.
 */
export class SaveDocumentUseCase {
  constructor(private documentRepository: DocumentRepository) {}

  /**
   * Executes the use case to save a document.
   * 
   * @param tempFilePath - The temporary path of the scanned document.
   * @returns The permanent path of the saved document.
   */
  async execute(tempFilePath: string): Promise<string> {
    return await this.documentRepository.saveDocument(tempFilePath);
  }
}
