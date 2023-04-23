import React, { useState, useCallback, useRef } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";
import uuid from "react-native-uuid";

import ControlButton from "../components/buttons/ControlButton";
import { ICONPATH, ICONCOLOR } from "../constants/icon";
import { selectPage, selectTitle } from "../store/feature/drawingBoardSlice";
import { selectAudioPage } from "../store/feature/audioSlice";
import { saveImageToDirectory, saveToonTalk } from "../utils/fileSystem";

export default function PreviewScreen({ navigation }) {
  const [selectedPage, setSelectedPage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const title = useSelector(selectTitle);
  const audioPages = useSelector(selectAudioPage);
  const pages = useSelector(selectPage);
  const lastRecording = useRef(null);

  const makedirectoryToFileSystem = async (id) => {
    const displayTitle = title || "제목없음";
    await saveToonTalk(displayTitle, id);
    await saveImageToDirectory(id, pages);
  };

  const handleAudioPress = useCallback(async () => {
    for (const page in audioPages) {
      setSelectedPage(page);
      const recordings = audioPages[page].audioData;
      const recording = recordings[recordings.length - 1];
      if (recording) {
        const sound = new Audio.Sound();
        await sound.loadAsync({ uri: recording.file });
        await sound.replayAsync();
        setIsPlaying(true);
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
        await new Promise((resolve) => setTimeout(resolve, recording.duration));
      }
    }
  }, [audioPages]);

  const handleImagePress = useCallback(
    async (page) => {
      const recordings = audioPages[page].audioData;
      const recording = recordings[recordings.length - 1];
      if (lastRecording.current) {
        await lastRecording.current.stopAsync();
      }
      if (recording) {
        const sound = new Audio.Sound();
        await sound.loadAsync({ uri: recording.file });
        await sound.replayAsync();
        setIsPlaying(true);
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
        lastRecording.current = sound;
      }
      setSelectedPage(page);
    },
    [audioPages],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} adjustsFontSizeToFit numberOfLines={1}>
          {title || "제목없음"}
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.comicbox}>
          {Object.keys(pages).map((page) => (
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
                source={{
                  uri: `data:image/png;base64,${pages[page].base64File}`,
                }}
              />
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
            onPress={handleAudioPress}
          >
            <Svg width={80} height={80} viewBox="0 0 640 512">
              <Path d={ICONPATH.SOUND} fill={ICONCOLOR.general} />
            </Svg>
          </Pressable>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <ControlButton
              label="수정"
              onPress={() => navigation.navigate("Drawing")}
            />
            <ControlButton
              label="저장"
              onPress={() => {
                navigation.navigate("Home");
                makedirectoryToFileSystem(uuid.v4());
              }}
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
