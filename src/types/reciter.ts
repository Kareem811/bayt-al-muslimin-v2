export interface Moshaf {
  id: number;
  name: string;
  server: string;
  surah_total: number;
  moshaf_type: number;
  surah_list: string;
}

export interface Reciter {
  id: number;
  name: string;
  letter: string;
  moshaf: Moshaf[];
}

export interface RecitedSurah {
  id: number;
  name: string;
  start_page: number;
  end_page: number;
  makkia: number;
}

export interface ReciterDirectoryResponse {
  reciters: Reciter[];
  suwar: RecitedSurah[];
}
