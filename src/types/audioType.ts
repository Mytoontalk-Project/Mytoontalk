export interface AudioData {
  [key: string]: any;
}

interface AudioDataByPage {
  audioData: AudioData[];
}

export interface AudioDataInterface {
  page: {
    [pageNumber: number]: AudioDataByPage;
  };
}
