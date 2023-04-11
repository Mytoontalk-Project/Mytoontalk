import React from "react";
import { StyleSheet, View } from "react-native";

export default function DrawingBoard() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
