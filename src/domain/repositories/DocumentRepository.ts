/**
 * Repository interface for document-related operations.
 */
export interface DocumentRepository {
  /**
   * Saves a document from a temporary file path to a permanent location.
   * 
   * @param tempFilePath - The current temporary URI/path of the document.
   * @returns A promise that resolves to the new permanent URI of the document.
   */
  saveDocument(tempFilePath: string): Promise<string>;
}
