import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { Provider } from "react-redux";

import DrawingPage from "./src/pages/DrawingPage";
import store from "./src/store/configureStore";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <DrawingPage />
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
