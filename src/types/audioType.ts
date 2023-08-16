import { Audio } from "expo-av";

export interface Recording {
  sound: Audio.Sound;
  duration: number;
  file: string;
}

export interface AudioPage {
  audioData: Recording[];
}

export interface AudioDataInterface {
  page: Record<number, AudioPage>;
}
