export interface HadithItem {
  number: number;
  arab: string;
  id?: string;
}

export interface HadithCollection {
  name: string;
  slug: string;
}

export interface HadithApiResponse {
  name: string;
  id: string;
  available: number;
  requested: number;
  items: HadithItem[];
}
