import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>My comic room</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    paddingTop: 20,
    paddingLeft: 50,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
  },
  label: {
    fontSize: 40,
  },
});
