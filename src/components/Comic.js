import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";

export default function Comic({ label }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.comicContainer} onPress={() => alert("comic")}>
        <Image style={styles.image} />
        <Text numberOfLines={2} style={styles.label}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    marginBottom: 20,
  },
  comicContainer: {
    height: 220,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  label: {
    fontSize: 25,
    margin: 10,
    textAlign: "center",
  },
});
