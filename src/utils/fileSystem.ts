import * as FileSystem from "expo-file-system";

import { DrawingPage } from "../types/drawingType";
import { AudioPage } from "../types/audioType";

export const saveTitleToDirectory = async (title: string, id: string) => {
  try {
    const dirUri = `${FileSystem.documentDirectory}mytoontalk/${id}`;
    const dirInfo = await FileSystem.getInfoAsync(dirUri);

    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
    }

    const titleUri = `${dirUri}/title.txt`;
    await FileSystem.writeAsStringAsync(titleUri, title, {
      encoding: FileSystem.EncodingType.UTF8,
    });
  } catch (err) {
    alert("파일에 저장할 수 없습니다.");
  }
};

export const saveImageToDirectory = async (
  id: string,
  pages: Record<number, DrawingPage>,
) => {
  try {
    const baseDir = `${FileSystem.documentDirectory}mytoontalk/${id}/pages/`;

    for (const page of Object.keys(pages)) {
      const imageUri = `${baseDir}${page}.png`;
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      const pageNumber = Number(page);

      if (!fileInfo.exists) {
        await FileSystem.makeDirectoryAsync(baseDir, {
          intermediates: true,
        });
        await FileSystem.writeAsStringAsync(
          imageUri,
          pages[pageNumber].base64File,
          {
            encoding: FileSystem.EncodingType.Base64,
          },
        );
      } else {
        alert("이미 파일이 존재합니다.");
      }
    }
  } catch (err) {
    alert("이미지 파일에 저장할 수 없습니다.");
  }
};

export const saveAudioToDirectory = async (
  id: string,
  pages: Record<number, AudioPage>,
) => {
  try {
    const baseDir = `${FileSystem.documentDirectory}mytoontalk/${id}/pages/`;

    for (const page of Object.keys(pages).map(Number)) {
      const audioUri = `${baseDir}${page}.wav`;
      const fileInfo = await FileSystem.getInfoAsync(audioUri);
      const recordings = pages[page].audioData;
      const recording = recordings[recordings.length - 1].file;

      if (!fileInfo.exists) {
        await FileSystem.makeDirectoryAsync(baseDir, {
          intermediates: true,
        });
        await FileSystem.copyAsync({ from: recording, to: audioUri });
      } else {
        alert("이미 파일이 존재합니다.");
      }
    }
  } catch (err) {
    alert("오디오 파일에 저장할 수 없습니다.");
  }
};

export const deleteDirectory = async (
  id: string | null,
  titleList: string[] | undefined,
) => {
  try {
    const mytoontalkDir = `${FileSystem.documentDirectory}mytoontalk/`;
    const ids = await FileSystem.readDirectoryAsync(mytoontalkDir);
    const idIndex = id && ids.indexOf(id);
    const dirPath = `${mytoontalkDir}${id}/`;

    await FileSystem.deleteAsync(dirPath, { idempotent: true });
    const updatedTitles = titleList?.filter((_, i) => i !== idIndex);

    return updatedTitles;
  } catch (err) {
    alert("파일을 삭제할 수 없습니다.");
  }
};
