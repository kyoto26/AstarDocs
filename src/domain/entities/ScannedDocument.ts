export interface ScannedPage {
  id: string;
  imagePath: string;
  width: number;
  height: number;
  createdAt: Date;
}

export interface ScannedDocument {
  id: string;
  title: string;
  pages: ScannedPage[];
  createdAt: Date;
  updatedAt: Date;
}
