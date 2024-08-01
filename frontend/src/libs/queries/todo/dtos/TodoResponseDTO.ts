export interface TodoResponseDTO {
  id: string;
  title: string;
  description: string;
  isConcluded: boolean;
  updatedAt: Date | string | null;
}
