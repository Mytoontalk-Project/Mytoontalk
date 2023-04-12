import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function AudioButton({ label, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 85,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
