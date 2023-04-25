import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useCanvasRef } from "@shopify/react-native-skia";
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
  setCurrentPage,
  setPageBase64File,
} from "../store/feature/drawingBoardSlice";
import { ICONPATH, ICONCOLOR } from "../constants/icon";
import {
  selectAudioPage,
  setPageRecordings,
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
  const currentPage = useSelector(selectCurrentPage);
  const [recording, setRecording] = useState(null);
  const pageRecordings = useSelector(selectAudioPage)[currentPage].audioData;
  const canvasRef = useCanvasRef();

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

        setRecording(recording);
      } else {
        alert("앱에서 마이크에 액세스할 수 있는 권한을 부여하십시오.");
      }
    } catch (err) {
      alert("녹음을 시작하지 못했습니다");
    }
  };

  const stopRecording = async () => {
    setRecording(undefined);

    await recording.stopAndUnloadAsync();

    const updatedRecordings = [...pageRecordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound,
      duration: status.durationMillis,
      file: recording.getURI(),
    });

    dispatch(setPageRecordings({ currentPage, updatedRecordings }));
  };

  const convertingUrl = () => {
    const image = canvasRef.current?.makeImageSnapshot();
    if (image) {
      const base64File = image.encodeToBase64();
      dispatch(setPageBase64File({ currentPage, base64File }));
    }
  };

  return (
    <View style={styles.container}>
      <ManualModal
        title="선 굵기"
        description={`펜이나 지우개를 꾹~ 누르시면${"\n"}굵기를 조절할 수 있는 창이 나타납니다.`}
        setCurrentModal={handleCurrentModal}
        nextModal="recording"
      />
      {currentModal === "recording" && (
        <ManualModal
          title="녹음"
          description={`녹음 버튼을 누르면 바로 녹음이 시작됩니다.${"\n"}재녹음을 원하시면 녹음 버튼을 다시 눌러주세요.`}
          setCurrentModal={handleCurrentModal}
          nextModal="recordingList"
        />
      )}
      {currentModal === "recordingList" && (
        <ManualModal
          title="녹음 목록"
          description={`해당 페이지의 모든 녹음들을 들을 수 있습니다.${"\n"}각 번호를 누르면 녹음이 재생됩니다.`}
          setCurrentModal={handleCurrentModal}
          nextModal="next"
        />
      )}
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
          <DrawingBoard canvasRef={canvasRef} />
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
          <TouchableOpacity
            style={styles.icon}
            onPress={async () => {
              if (currentPage > 1) {
                dispatch(setCurrentPage(currentPage - 1));
                convertingUrl();
              }
            }}
          >
            <Svg width="auto" height="100%" viewBox="0 0 512 512">
              <Path
                d={ICONPATH.ARROW_LEFT}
                fill={currentPage === 1 ? ICONCOLOR.main : ICONCOLOR.general}
              />
            </Svg>
          </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.icon}
            onPress={async () => {
              if (currentPage < 4) {
                dispatch(setCurrentPage(currentPage + 1));
                convertingUrl();
              }
            }}
          >
            <Svg width="auto" height="100%" viewBox="0 0 512 512">
              <Path
                d={ICONPATH.ARROW_RIGHT}
                fill={currentPage === 4 ? ICONCOLOR.main : ICONCOLOR.general}
              />
            </Svg>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.page}>
            <Text style={{ fontSize: 40, textAlign: "center" }}>
              {currentPage}
            </Text>
          </View>
          <ControlButton
            label="완성"
            onPress={() => {
              dispatch(setTitle(input));
              convertingUrl();
              navigation.navigate("Preview");
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
