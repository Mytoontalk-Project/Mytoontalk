import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import * as FileSystem from "expo-file-system";

import Comic from "./Comic";
import ControlButton from "./buttons/ControlButton";
import Empty from "./Empty";

export default function OpenComic({ isShowModal, currentModal, navigation }) {
  const [data, setData] = useState([]);

  const loadComics = useCallback(async () => {
    const dirUri = `${FileSystem.documentDirectory}mytoontalk/`;
    const comicList = await FileSystem.readDirectoryAsync(dirUri);

    const newData = await Promise.all(
      comicList.map(async (id) => {
        const comicUri = `${dirUri}${id}/`;
        const [title, pageInfo, creationTime] = await Promise.all([
          FileSystem.readAsStringAsync(`${comicUri}title.txt`),
          FileSystem.getInfoAsync(`${comicUri}pages/1.png`),
          FileSystem.getInfoAsync(`${comicUri}pages/1.png`, {
            creationTime: true,
          }),
        ]);

        let imageUri = null;
        if (pageInfo.exists) {
          const imageBase64 = await FileSystem.readAsStringAsync(
            `${comicUri}pages/1.png`,
            { encoding: FileSystem.EncodingType.Base64 },
          );
          imageUri = `data:image/png;base64,${imageBase64}`;
        }

        return {
          id,
          title,
          hasCover: pageInfo.exists,
          imageUri,
          creationTime: creationTime.creationTime || null,
        };
      }),
    );

    newData.sort((a, b) => a.creationTime - b.creationTime);

    setData(newData);
  }, []);

  useEffect(() => {
    loadComics();
  }, [loadComics]);

  const numColumn = 4;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {data.length === 0 ? (
          <Empty />
        ) : (
          <FlatList
            data={data}
            numColumns={numColumn}
            renderItem={({ item }) => (
              <View style={{ flex: 1 / numColumn, marginHorizontal: 10 }}>
                <Comic
                  id={item.id}
                  label={item.title}
                  imageUri={item.imageUri}
                  navigation={navigation}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
      <View style={styles.button}>
        <ControlButton
          label="생성"
          onPress={isShowModal}
          currentModal={currentModal}
        />
        <ControlButton
          label="삭제"
          onPress={isShowModal}
          currentModal={currentModal}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#DBE2EF",
  },
  button: {
    flexDirection: "row",
    gap: 20,
    marginRight: 10,
    marginTop: 20,
    justifyContent: "flex-end",
  },
});
