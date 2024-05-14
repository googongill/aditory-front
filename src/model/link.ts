export interface Link {
  linkId: number;
  title: string;
  summary: number;
  categoryState: boolean;
  createdAt: Date;
  lastModifiedAt: Date;
  url?: string;
  categoryId?: number;
  autoComplete?: boolean;
}
