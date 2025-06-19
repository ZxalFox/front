export interface Emotions {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  instensity: number;
}

export interface DiaryEntry {
  id: number;
  date: string;
  emotion: string;
  note: string;
  created_at: string;
  updated_at: string;
}


