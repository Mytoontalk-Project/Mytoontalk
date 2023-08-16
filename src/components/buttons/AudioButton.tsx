import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface AudioButtonProps {
  buttonIndex: number;
  onPress: () => void;
}

const AudioButton = ({
  buttonIndex,
  onPress,
}: AudioButtonProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{buttonIndex}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default AudioButton;
