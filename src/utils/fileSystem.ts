import * as FileSystem from "expo-file-system";

import { DrawingPage } from "../types/drawingType";
import { AudioPage } from "../types/audioType";
import { alertMessages } from "../constants/alertMessages";

export const MYTOONTALK_DIR = `${FileSystem.documentDirectory}mytoontalk/`;

export const saveTitleToDirectory = async (title: string, id: string) => {
  try {
    const dirUri = `${MYTOONTALK_DIR}${id}`;
    const dirInfo = await FileSystem.getInfoAsync(dirUri);

    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
    }

    const titleUri = `${dirUri}/title.txt`;

    await FileSystem.writeAsStringAsync(titleUri, title, {
      encoding: FileSystem.EncodingType.UTF8,
    });
  } catch (err) {
    alert(alertMessages.fileSaveError);
  }
};

export const saveImageToDirectory = async (
  id: string,
  pages: Record<number, DrawingPage>,
) => {
  try {
    const baseDir = `${MYTOONTALK_DIR}${id}/pages/`;

    for (const pageIndex in pages) {
      const imageUri = `${baseDir}${pageIndex}.png`;
      const fileInfo = await FileSystem.getInfoAsync(imageUri);

      if (fileInfo.exists) {
        alert(alertMessages.fileSaveError);
        continue;
      }

      await FileSystem.makeDirectoryAsync(baseDir, {
        intermediates: true,
      });
      await FileSystem.writeAsStringAsync(
        imageUri,
        pages[pageIndex].base64File,
        {
          encoding: FileSystem.EncodingType.Base64,
        },
      );
    }
  } catch (err) {
    alert(alertMessages.fileSaveError);
  }
};

export const saveAudioToDirectory = async (
  id: string,
  pages: Record<number, AudioPage>,
) => {
  try {
    const baseDir = `${MYTOONTALK_DIR}${id}/pages/`;

    for (const pageIndex in pages) {
      const audioUri = `${baseDir}${pageIndex}.wav`;
      const fileInfo = await FileSystem.getInfoAsync(audioUri);
      const recordings = pages[pageIndex].audioData;
      const recording = recordings[recordings.length - 1].file;

      if (fileInfo.exists) {
        alert(alertMessages.fileExistError);
        continue;
      }

      await FileSystem.makeDirectoryAsync(baseDir, {
        intermediates: true,
      });
      await FileSystem.copyAsync({ from: recording, to: audioUri });
    }
  } catch (err) {
    alert(alertMessages.fileSaveError);
  }
};

export const deleteDirectory = async (
  id: string | null,
  titleList: string[] | undefined,
) => {
  try {
    const ids = await FileSystem.readDirectoryAsync(MYTOONTALK_DIR);
    const idIndex = id && ids.indexOf(id);
    const dirPath = `${MYTOONTALK_DIR}${id}/`;

    await FileSystem.deleteAsync(dirPath, { idempotent: true });
    const updatedTitles = titleList?.filter((_, i) => i !== idIndex);

    return updatedTitles;
  } catch (err) {
    alert(alertMessages.fileDeleteError);
  }
};
