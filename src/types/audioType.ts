import { Audio } from "expo-av";

export interface AudioData {
  [key: string]: string | number | Audio.Sound;
}

interface AudioDataByPage {
  audioData: AudioData[];
}

export interface AudioDataInterface {
  page: {
    [pageNumber: number]: AudioDataByPage;
  };
}
