export interface Recording {
  duration: number;
  file: string;
}

export interface AudioPage {
  audioData: Recording[];
}

export interface AudioDataInterface {
  page: Record<number, AudioPage>;
}
