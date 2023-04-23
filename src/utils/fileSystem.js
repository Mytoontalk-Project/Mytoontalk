import * as FileSystem from "expo-file-system";

export const makeDirectoryToFileSystem = async (id) => {
  try {
    const fileUri = `${FileSystem.documentDirectory}mytoontalk/${id}`;
    const directoryInfo = await FileSystem.getInfoAsync(fileUri);
    if (!directoryInfo.exists) {
      await FileSystem.makeDirectoryAsync(fileUri, {
        intermediates: true,
      });
      console.log("파일 생성 성공");
      return;
    }
    console.log("파일이 이미 존재함");
  } catch (err) {
    console.log(err);
  }
};

export const saveImageToDirectory = async (id, pages) => {
  try {
    const baseDir = `${FileSystem.documentDirectory}mytoontalk/${id}/pages/`;
    for (const page of Object.keys(pages)) {
      const imageUri = `${baseDir}${page}.png`;
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      if (!fileInfo.exists) {
        await FileSystem.makeDirectoryAsync(baseDir, {
          intermediates: true,
        });
        await FileSystem.writeAsStringAsync(imageUri, pages[page].base64File, {
          encoding: FileSystem.EncodingType.Base64,
        });
        console.log(`${imageUri} saved successfully`);
      } else {
        console.log(`${imageUri} already exists`);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteDirectory = async (id) => {
  try {
    const fileUri = `${FileSystem.documentDirectory}mytoontalk/${id}`;
    await FileSystem.deleteAsync(fileUri);
    console.log("폴더 삭제 성공");
  } catch (err) {
    console.log(err);
  }
};

export const saveToonTalk = async (title, id) => {
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

    console.log("제목 저장 성공");
  } catch (err) {
    console.log(err);
  }
};
