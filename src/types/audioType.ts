import { Audio } from "expo-av";

export interface AudioData {
  [key: string]: string | number | Audio.Sound | string[];
}

export interface Recording {
  sound: Audio.Sound;
  duration: number;
  file: string;
}

export interface AudioDataInterface {
  page: Record<number, { audioData: Recording[] }>;
}
