import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Comic from "./Comic";
import ControlButton from "./buttons/ControlButton";

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
const numColumns = 4;

function ItemSeparator() {
  return <View style={{ height: 20 }} />;
}

export default function OpenComic() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={{ flex: 1 / numColumns }}>
            <Comic label={item.name} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparator}
      />
      <View style={styles.button}>
        <ControlButton label="생성" />
        <ControlButton label="삭제" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 50,
    backgroundColor: "#DBE2EF",
  },
  button: {
    marginTop: 30,
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-end",
  },
});
