import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ControlButton({ label, onPress, currentModal }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress();
        if (currentModal) {
          currentModal(label);
        }
      }}
    >
      <View style={styles.button}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </View>
    </TouchableOpacity>
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
    fontWeight: "bold",
    fontSize: 25,
  },
});
