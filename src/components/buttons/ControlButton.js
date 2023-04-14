import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";

export default function ControlButton({ label, onPress, currentModal }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => {
          onPress();
          if (currentModal) {
            currentModal(label);
          }
        }}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
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
