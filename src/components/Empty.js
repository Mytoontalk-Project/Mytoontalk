import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Empty() {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>네컷만화가 없습니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    fontSize: 24,
    color: "#769FCD",
  },
});
