import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";

export default function Comic({ id, label, imageUri, navigation }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.comicContainer}
        onPress={() => {
          navigation.navigate("Comic", {
            id,
          });
        }}
      >
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.image}
        />
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
    marginBottom: 10,
    height: 255,
  },
  comicContainer: {
    height: 180,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  label: {
    fontSize: 25,
    margin: 10,
    textAlign: "center",
  },
});
