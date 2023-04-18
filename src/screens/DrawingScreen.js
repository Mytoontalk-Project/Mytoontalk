import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import DrawingBoard from "../components/DrawingBoard";
import WorkingTool from "../components/WorkingTool";
import ControlButton from "../components/buttons/ControlButton";
import ManualModal from "../components/modals/ManualModal";
import {
  selectTitle,
  selectCurrentPage,
  setTitle,
} from "../store/feature/drawingBoardSlice";
import { ICONPATH, ICONCOLOR } from "../constants/icon";
import {
  setRecording,
  setMessage,
  setRecordings,
  selectRecording,
  selectRecordings,
} from "../store/feature/audioSlice";
import CircleListModal from "../components/modals/CircleListModal";
import GeneralModal from "../components/modals/GeneralModal";
import ColorListModal from "../components/modals/ColorListModal";
import WidthModal from "../components/modals/WidthModal";

export default function DrawingScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const title = useSelector(selectTitle);
  const [input, setInput] = useState(title);
  const recording = useSelector(selectRecording);
  const recordings = useSelector(selectRecordings);
  const page = useSelector(selectCurrentPage);

  const toggleModal = () => {
    setIsShowModal(true);
  };

  const handleCurrentModal = (modal) => {
    setCurrentModal(modal);
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        );

        dispatch(setRecording(recording));
      } else {
        dispatch(
          setMessage("앱에서 마이크에 액세스할 수 있는 권한을 부여하십시오."),
        );
      }
    } catch (err) {
      console.error("녹음을 시작하지 못했습니다", err);
    }
  };

  const stopRecording = async () => {
    dispatch(setRecording(undefined));

    await recording.stopAndUnloadAsync();

    const updatedRecordings = [...recordings];
    const { sound } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound,
      file: recording.getURI(),
    });

    dispatch(setRecordings(updatedRecordings));
  };

  return (
    <View style={styles.container}>
      <ManualModal
        title="녹음"
        description={`녹음 버튼을 누르면 바로 녹음이 시작됩니다.${"\n"}재녹음을 원하시면 녹음 버튼을 다시 눌러주세요.`}
        setCurrentModal={handleCurrentModal}
      />
      {currentModal === "next" && (
        <ManualModal
          title="나가기"
          description={`홈으로 나가는 버튼입니다.${"\n"}버튼을 클릭하실 경우에는${"\n"}지금까지의 모든 내용은 저장되지 않습니다.`}
        />
      )}
      {currentModal === "list" ? (
        <CircleListModal
          title="녹음 목록"
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
        />
      ) : currentModal === "home" ? (
        <GeneralModal
          title="나가기"
          description={`지금까지의 내용은 저장되지 않습니다.${"\n"}정말 나가시겠습니까?`}
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          buttonText="홈"
          navigation={navigation}
        />
      ) : currentModal === "color" ? (
        <ColorListModal
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
        />
      ) : (
        <WidthModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
      )}
      <View style={styles.header}>
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="제목을 입력해주세요."
          style={styles.title}
          adjustsFontSizeToFit
          numberOfLines={1}
        />
      </View>
      <View style={styles.bodyContainer}>
        <View style={{ flex: 1 }}>
          <DrawingBoard />
        </View>
        <View style={{ flex: 1 / 4 }}>
          <WorkingTool
            isShowModal={toggleModal}
            currentModal={handleCurrentModal}
          />
        </View>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.pageMoveButton}>
          <Pressable style={styles.icon}>
            <Svg width="auto" height="100%" viewBox="0 0 512 512">
              <Path d={ICONPATH.ARROW_LEFT} fill={ICONCOLOR} />
            </Svg>
          </Pressable>
          <Pressable
            style={styles.icon}
            onPress={recording ? stopRecording : startRecording}
          >
            {recording ? (
              <>
                <MaterialCommunityIcons
                  name="microphone"
                  size={57}
                  color="black"
                />
                <View
                  width={15}
                  height={15}
                  style={audioStyle("#FF0000").color}
                />
              </>
            ) : (
              <MaterialCommunityIcons
                name="microphone-off"
                size={57}
                color="black"
              />
            )}
          </Pressable>
          <Pressable style={styles.icon}>
            <Svg width="auto" height="100%" viewBox="0 0 512 512">
              <Path d={ICONPATH.ARROW_RIGHT} fill={ICONCOLOR} />
            </Svg>
          </Pressable>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.page}>
            <Text style={{ fontSize: 40, textAlign: "center" }}>{page}</Text>
          </View>
          <ControlButton
            label="완성"
            onPress={() => {
              dispatch(setTitle(input));
              navigation.navigate("Comic");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    borderRadius: "50%",
    width: 50,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#DBE2EF",
  },
  header: {
    width: "79%",
    flex: 1 / 7,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    paddingBottom: 20,
  },
  footerContainer: {
    flex: 1 / 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 20,
  },
  pageMoveButton: {
    width: "79%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    flex: 1 / 15,
  },
});

const audioStyle = (color) =>
  StyleSheet.create({
    color: {
      position: "absolute",
      backgroundColor: color,
      borderRadius: "50%",
      right: 0,
    },
  });
