export interface File {
  key: string;
  thumbnailUrl: string;
  name: string;
  size: number;
}

export interface Detail {
  created_at: number;
  key: string | undefined;
  expires_at: number;
  download_count: number;
  count: number;
  size: number;
  summary: string;
  thumbnailUrl: string;
  files: File[];
  sent?: {
    subject: string;
    content: string;
    emails: string[];
  };
}
