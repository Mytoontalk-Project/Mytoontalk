import React, { useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";
import uuid from "react-native-uuid";

import ControlButton from "../components/buttons/ControlButton";
import { ICONPATH, ICONCOLOR } from "../constants/icon";
import {
  selectImagePage,
  selectTitle,
  pushTitleList,
} from "../store/feature/drawingBoardSlice";
import { selectAudioPage } from "../store/feature/audioSlice";
import {
  saveAudioToDirectory,
  saveImageToDirectory,
  saveTitleToDirectory,
} from "../utils/fileSystem";
import GeneralModal from "../components/modals/GeneralModal";

export default function PreviewScreen({ navigation }) {
  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const title = useSelector(selectTitle);
  const audioPages = useSelector(selectAudioPage);
  const imagePages = useSelector(selectImagePage);
  const lastRecording = useRef(null);

  const [memorySize, setMemorySize] = useState(0);
  const kilobytes = memorySize / 1024;
  const megabytes = kilobytes / 1024;

  const checkMemorySize = async () => {
    let audioTotalSize = 0;
    let imageTotalSize = 0;

    for (const page in audioPages) {
      const recordings = audioPages[page].audioData;
      const recording = recordings[recordings.length - 1];
      const recordingUri = recording.file;
      const recordingResponse = await fetch(recordingUri);
      const recordingBlob = await recordingResponse.blob();
      audioTotalSize += recordingBlob.size;
    }
    for (const page in imagePages) {
      const image = imagePages[page].base64File;
      const imageUri = `data:image/png;base64,${image}`;
      const imageResponse = await fetch(imageUri);
      const imageBlob = await imageResponse.blob();
      imageTotalSize += imageBlob.size;
    }
    const sizeSum = audioTotalSize + imageTotalSize;
    setMemorySize(sizeSum);
  };

  const makedirectoryToFileSystem = async (id) => {
    const displayTitle = title || "제목없음";
    await saveTitleToDirectory(displayTitle, id);
    await saveImageToDirectory(id, imagePages);
    await saveAudioToDirectory(id, audioPages);
    dispatch(pushTitleList(displayTitle));
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
        await new Promise((resolve) =>
          setTimeout(resolve, recording.duration + 500),
        );
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
      {isShowModal && (
        <GeneralModal
          title="주의사항"
          description={`총 파일 크기는 ${megabytes.toFixed(2,)} MB (${kilobytes.toFixed(2,)} KB) 입니다.${"\n"} 만화를 저장하시겠습니까?`}
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          buttonText="저장"
          navigation={navigation}
          handlePress={() => makedirectoryToFileSystem(uuid.v4())}
        />
      )}
      <View style={styles.header}>
        <Text style={styles.title} adjustsFontSizeToFit numberOfLines={1}>
          {title || "제목없음"}
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.comicbox}>
          {Object.keys(imagePages).map((page) => (
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
                  uri: `data:image/png;base64,${imagePages[page].base64File}`,
                }}
              />
            </Pressable>
          ))}
        </View>
        <View style={styles.toolbox}>
          <TouchableOpacity
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
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <ControlButton
              label="수정"
              onPress={() => navigation.navigate("Drawing")}
            />
            <ControlButton
              label="저장"
              onPress={() => {
                checkMemorySize();
                setIsShowModal(true);
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
