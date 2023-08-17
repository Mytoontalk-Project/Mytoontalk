import React, { useState } from "react";
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
import { Audio, AVPlaybackStatusSuccess } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAppDispatch, useAppSelector } from "../hooks/useReduxHooks";
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
  setCurrentTool,
  setPenColor,
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
import { DIAMETER, RADIUSPERCENTAGE, modalContents } from "../constants/info";
import { DrawingScreenProps } from "../types/screensType";

const DrawingScreen: React.FC<DrawingScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const title = useAppSelector(selectTitle);
  const [input, setInput] = useState<string>(title);
  const [modalIndex, setModalIndex] = useState<number>(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const currentPage = useAppSelector(selectCurrentPage);
  const pageRecordings = useAppSelector(selectAudioPage)[currentPage].audioData;
  const canvasRef = useCanvasRef();

  const handlePrevModal = () => {
    setModalIndex(modalIndex - 1);
  };

  const handleNextModal = () => {
    setModalIndex(modalIndex + 1);
  };

  const toggleModal = () => {
    setIsShowModal(true);
  };

  const handleCurrentModal = (modal: string) => {
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
          Audio.RecordingOptionsPresets.HIGH_QUALITY,
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
    setRecording(null);

    if (recording) {
      await recording.stopAndUnloadAsync();

      try {
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        if (sound) {
          const playbackStatusSuccess = status as AVPlaybackStatusSuccess;
          const duration = playbackStatusSuccess.durationMillis;
          const fileUri = recording.getURI();
          const updatedRecordings = [...pageRecordings];

          updatedRecordings.push({
            duration: duration || 0,
            file: fileUri || "",
          });

          dispatch(setPageRecordings({ currentPage, updatedRecordings }));
        } else {
          alert("녹음을 종료를 하지 못했습니다");
        }
      } catch (err) {
        alert("녹음중 오류가 발생했습니다. 다시 녹음해주세요.");
      }
    }
  };

  const convertingUrl = () => {
    const image = canvasRef.current?.makeImageSnapshot();
    if (image) {
      const base64File = image.encodeToBase64();
      dispatch(setPageBase64File({ currentPage, base64File }));
    }
  };

  const handleColorPress = (item: string) => {
    dispatch(setPenColor(item));
  };

  return (
    <View style={styles.container}>
      <ManualModal
        title={modalContents[modalIndex].title}
        description={modalContents[modalIndex].description}
        setNextModal={handleNextModal}
        setPrevModal={handlePrevModal}
        modalIndex={modalIndex}
      />
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
          handlePress={() => dispatch(setCurrentTool("pen"))}
        />
      ) : currentModal === "color" ? (
        <ColorListModal
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          handlePress={handleColorPress}
        />
      ) : (
        <WidthModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
      )}
      <View style={styles.header}>
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="제목을 입력해주세요."
          style={styles.titleInput}
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
            handleCurrentModal={handleCurrentModal}
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
                  style={{
                    width: 15,
                    height: 15,
                    ...audioStyle("#FF0000").color,
                  }}
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
};

const styles = StyleSheet.create({
  page: {
    borderRadius: (DIAMETER / 2) * (RADIUSPERCENTAGE / 100),
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
  titleInput: {
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

const audioStyle = (color: string) =>
  StyleSheet.create({
    color: {
      position: "absolute",
      backgroundColor: color,
      borderRadius: (DIAMETER / 2) * (RADIUSPERCENTAGE / 100),
      right: 0,
    },
  });

export default DrawingScreen;
