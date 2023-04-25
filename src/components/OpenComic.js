import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Comic from "./Comic";
import ControlButton from "./buttons/ControlButton";
import Empty from "./Empty";

export default function OpenComic({
  isShowModal,
  currentModal,
  navigation,
  loadedComics,
}) {
  const numColumn = 4;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {loadedComics.length === 0 ? (
          <Empty />
        ) : (
          <FlatList
            data={loadedComics}
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
