import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

export default function ControlButton({ label }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => alert("button")}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 50,
    right: 0,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    fontSize: 25,
    color: "#000000",
  },
});
