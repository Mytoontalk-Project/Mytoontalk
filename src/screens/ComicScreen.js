import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

import ControlButton from "../components/buttons/ControlButton";
import { ICONPATH, ICONCOLOR } from "../constants/icon";
import { selectAudioPage } from "../store/feature/audioSlice";

export default function ComicScreen({ navigation, route }) {
  const { id, rerender } = route.params;
  const dirUri = `${FileSystem.documentDirectory}mytoontalk/${id}`;
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState([]);
  const [images, setImages] = useState([]);

  const loadData = async () => {
    const [titleContent, pagesList] = await Promise.all([
      FileSystem.readAsStringAsync(`${dirUri}/title.txt`),
      FileSystem.readDirectoryAsync(`${dirUri}/pages`),
    ]);
    setTitle(titleContent);
    setPages(pagesList);

    const pageImages = await Promise.all(
      pages.map(async (page) => {
        const pageUri = `${dirUri}/pages/${page}`;
        const pageInfo = await FileSystem.getInfoAsync(pageUri);

        if (pageInfo.exists) {
          const imageBase64 = await FileSystem.readAsStringAsync(pageUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          return `data:image/png;base64,${imageBase64}`;
        }

        return null;
      }),
    );
    setImages(pageImages);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} adjustsFontSizeToFit numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.comicbox}>
          {images.map((image) => (
            <Pressable
              key={image}
              // onPress={() => handleImagePress(index)}
              style={[
                styles.image,
                // selectedPage === index && isPlaying && styles.selectedImage,
              ]}
            >
              <Image style={{ flex: 1 }} source={{ uri: image }} />
            </Pressable>
          ))}
        </View>
        <View style={styles.toolbox}>
          <Pressable
            title="audio"
            style={{
              flex: 1,
              justifyContent: "center",
            }}
            // onPress={handleAudioPress}
          >
            <Svg width={80} height={80} viewBox="0 0 640 512">
              <Path d={ICONPATH.SOUND} fill={ICONCOLOR.general} />
            </Svg>
          </Pressable>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <ControlButton
              label="나가기"
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#DBE2EF",
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "row",
  },
  header: {
    flex: 1 / 7,
    width: "84%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
  },
  comicbox: {
    width: "84%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    gap: 10,
  },
  toolbox: {
    height: "97%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    width: "49%",
    height: "45.5%",
    backgroundColor: "#ffffff",
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: "#77037B",
  },
});
