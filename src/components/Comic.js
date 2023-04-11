import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";

export default function Comic({ label }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.comicContainer} onPress={() => alert("comic")}>
        <Image style={styles.image} />
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    height: 230,
    marginBottom: 20,
  },
  comicContainer: {
    width: 200,
    height: 180,
    borderWidth: 2,
    alignItems: "center",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  label: {
    fontSize: 20,
    margin: 10,
  },
});
