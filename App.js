import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";

import MainPage from "./src/components/pages/MainPage";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MainPage />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
