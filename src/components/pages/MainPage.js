import React from "react";
import { StyleSheet, View } from "react-native";

import Header from "../Header";
import OpenComic from "../OpenComic";

export default function MainPage() {
  return (
    <View style={styles.container}>
      <Header />
      <OpenComic />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
