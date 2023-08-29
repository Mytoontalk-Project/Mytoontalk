import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import * as FileSystem from "expo-file-system";
import { AVPlaybackStatusSuccess } from "expo-av";

import ControlButton from "../components/buttons/ControlButton";
import { ICONPATH, ICONCOLOR } from "../constants/icon";
import useAudioPlay from "../hooks/useAudioPaly";
import { ComicScreenProps } from "../types/screensType";
import { ALERTMESSAGES } from "../constants/alertMessages";

const ComicScreen: React.FC<ComicScreenProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const { isPlaying, playAudio, stopAudio, getStatus } = useAudioPlay();
  const [title, setTitle] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const [audios, setAudios] = useState<string[]>([]);
  const dirUri = `${FileSystem.documentDirectory}mytoontalk/${id}`;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [titleContent, pagesList] = await Promise.all([
          FileSystem.readAsStringAsync(`${dirUri}/title.txt`),
          FileSystem.readDirectoryAsync(`${dirUri}/pages`),
        ]);

        const imageList = pagesList
          .filter((page) => page.endsWith(".png"))
          .sort();
        const audioList = pagesList
          .filter((page) => page.endsWith(".wav"))
          .sort();
        setTitle(titleContent);
        setImages(imageList);
        setAudios(audioList);
      } catch (err) {
        alert(ALERTMESSAGES.FILELOAD_ERROR);
      }
    };
    loadData();
  }, []);

  const handleAudioPress = async () => {
    try {
      for (const page of audios) {
        const filterPage = Number(page.slice(0, 1));
        setSelectedPage(filterPage);

        if (page) {
          await playAudio(`file://${dirUri}/pages/${page}`);
          const status = await getStatus();
          const playbackStatusSuccess = status as AVPlaybackStatusSuccess;
          const duration = playbackStatusSuccess.durationMillis;
          if (typeof duration === "number") {
            await new Promise((resolve) => setTimeout(resolve, duration + 500));
          }
        }
      }
    } catch (err) {
      alert(ALERTMESSAGES.AUDIOLOAD_ERROR);
    }
  };

  const handleImagePress = async (page: number) => {
    const recording = audios[page - 1];
    try {
      await stopAudio();
      if (recording) {
        await playAudio(`file://${dirUri}/pages/${recording}`);
      }
      setSelectedPage(page);
    } catch (err) {
      alert(ALERTMESSAGES.AUDIOLOAD_ERROR);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} adjustsFontSizeToFit numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.comicbox}>
          {images.map((image) => {
            const page = Number(image.slice(0, 1));
            return (
              <Pressable
                key={page}
                onPress={() => handleImagePress(page)}
                style={[
                  styles.image,
                  selectedPage === page && isPlaying && styles.selectedImage,
                ]}
              >
                <Image
                  style={{ flex: 1 }}
                  source={{ uri: `file://${dirUri}/pages/${image}` }}
                />
              </Pressable>
            );
          })}
        </View>
        <View style={styles.toolbox}>
          <Pressable
            style={{
              flex: 1,
              justifyContent: "center",
            }}
            onPress={handleAudioPress}
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
};

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

export default ComicScreen;
