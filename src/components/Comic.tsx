import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/screensType";

interface OwnProps {
  id: string;
  label: string;
  imageUri: string | null;
  navigation: NativeStackNavigationProp<RootStackParamList, "Comic" | "Home">;
}

const Comic: React.FC<OwnProps> = ({ id, label, imageUri, navigation }) => {
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
        {imageUri ? (
          <Image
            source={{
              uri: imageUri,
            }}
            style={styles.image}
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        <Text numberOfLines={2} style={styles.label}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

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
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#dddddd",
  },
  label: {
    fontSize: 25,
    margin: 10,
    textAlign: "center",
  },
});

export default Comic;
