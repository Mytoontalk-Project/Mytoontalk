import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Comic from "./Comic";
import ControlButton from "./buttons/ControlButton";
import Empty from "./Empty";

const data = [
  { id: "1", name: "Comic 1" },
  { id: "2", name: "Comic 2" },
  { id: "3", name: "Comic 3" },
  { id: "4", name: "Comic 4" },
  { id: "5", name: "Comic 5" },
  { id: "6", name: "Comic 6" },
  { id: "7", name: "Comic 7" },
  { id: "8", name: "Comic 8" },
  { id: "9", name: "Comic 9" },
  { id: "10", name: "Comic 10" },
  { id: "11", name: "Comic 11" },
  { id: "12", name: "Comic 12" },
  { id: "13", name: "Comic 13" },
  { id: "14", name: "Comic 14" },
];
const numColumn = 4;

export default function OpenComic({ isShowModal, currentModal }) {
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
                <Comic label={item.name} />
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
