import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Alert,
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Audio } from "expo-av";

import DrawingBoard from "../components/DrawingBoard";
import WorkingTool from "../components/WorkingTool";
import ControlButton from "../components/buttons/ControlButton";
import AudioButton from "../components/buttons/AudioButton";
import ManualModal from "../components/ManualModal";
import COLORLIST from "../constants/color";
import { setColor, selectTitle } from "../store/feature/drawingBoardSlice";
import { ICONPATH, ICONCOLOR } from "../constants/icon";
import {
  setRecording,
  setMessage,
  setRecordings,
  selectRecording,
  selectRecordings,
} from "../store/feature/audioSlice";

export default function DrawingScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const title = useSelector(selectTitle);
  const [input, setInput] = useState(title);
  const recording = useSelector(selectRecording);
  const recordings = useSelector(selectRecordings);

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
          description={`홈으로 나가는 버튼입니다.${"\n"}버튼을 클릭하실 경우${"\n"}지금까지의 모든 내용은 저장되지 않습니다.`}
        />
      )}
      {currentModal === "list" ? (
        <Modal
          animationType="fade"
          transparent
          visible={isShowModal}
          onRequestClose={() => {
            Alert.alert("closed.");
            setIsShowModal(!setIsShowModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={[styles.listbox, styles.mainColor]}>
                <Text style={styles.titleStyle}>녹음 리스트</Text>
              </View>
              <Pressable
                onPress={() => setIsShowModal(false)}
                style={styles.closeButton}
              >
                <Svg width={30} height={30} viewBox="0 0 384 512">
                  <Path d={ICONPATH.XMARK} fill={ICONCOLOR} />
                </Svg>
              </Pressable>
              <View style={[styles.audioList, styles.mainColor]}>
                <FlatList
                  data={recordings}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: "50%",
                        width: "14%",
                        aspectRatio: 1,
                        marginHorizontal: 7,
                        marginVertical: 11,
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <AudioButton
                        label={index + 1}
                        onPress={() => item.sound.replayAsync()}
                      />
                    </View>
                  )}
                  numColumns={6}
                  keyExtractor={(recordingLine, index) => index.toString()}
                />
              </View>
            </View>
          </View>
        </Modal>
      ) : currentModal === "home" ? (
        <Modal
          animationType="fade"
          transparent
          visible={isShowModal}
          onRequestClose={() => {
            Alert.alert("closed.");
            setIsShowModal(!isShowModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={[styles.backbox, styles.mainColor]}>
                <Text style={styles.titleStyle}>나가기</Text>
              </View>
              <Pressable
                onPress={() => setIsShowModal(false)}
                style={styles.closeButton}
              >
                <Svg width={30} height={30} viewBox="0 0 384 512">
                  <Path d={ICONPATH.XMARK} fill={ICONCOLOR} />
                </Svg>
              </Pressable>
              <View style={[styles.mainColor, styles.input]}>
                <Text style={styles.inputStyle}>
                  지금까지의 내용은 저장되지 않습니다.{"\n"}정말 나가시겠습니까?
                </Text>
              </View>
              <Pressable
                style={[styles.button, styles.mainColor]}
                onPress={() => {
                  setIsShowModal(!isShowModal);
                  navigation.navigate("Home");
                }}
              >
                <Text style={styles.textStyle}>홈</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      ) : (
        <Modal
          animationType="slide"
          transparent
          visible={isShowModal}
          onRequestClose={() => {
            Alert.alert("closed.");
            setIsShowModal(!isShowModal);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setIsShowModal(false)}>
            <View style={styles.colorModal}>
              <View style={{ flex: 1 }}></View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.colors}>
            <TouchableWithoutFeedback>
              <FlatList
                data={COLORLIST}
                renderItem={({ item }) => (
                  <Pressable
                    style={{
                      backgroundColor: item,
                      borderWidth: 1,
                      borderRadius: "50%",
                      width: "16.66%",
                      aspectRatio: 1,
                    }}
                    onPress={() => dispatch(setColor(item))}
                  />
                )}
                numColumns={6}
                keyExtractor={(item, index) => index.toString()}
              />
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      )}
      <View style={styles.header}>
        <TextInput
          value={input}
          onChangeText={(input) => setInput(input)}
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
          <Pressable style={styles.icon} onPress={() => alert("prev")}>
            <Svg width="auto" height="100%" viewBox="0 0 512 512">
              <Path d={ICONPATH.ARROW_LEFT} fill={ICONCOLOR} />
            </Svg>
          </Pressable>
          <Pressable
            style={styles.icon}
            onPress={recording ? stopRecording : startRecording}
          >
            {recording ? (
              <Svg width="auto" height="100%" viewBox="0 0 640 512">
                <Path d={ICONPATH.AUDIO_ON} fill={ICONCOLOR} />
              </Svg>
            ) : (
              <Svg width="auto" height="100%" viewBox="0 0 640 512">
                <Path d={ICONPATH.AUDIO_OFF} fill={ICONCOLOR} />
              </Svg>
            )}
          </Pressable>
          <Pressable style={styles.icon} onPress={() => alert("next")}>
            <Svg width="auto" height="100%" viewBox="0 0 512 512">
              <Path d={ICONPATH.ARROW_RIGHT} fill={ICONCOLOR} />
            </Svg>
          </Pressable>
        </View>
        <View>
          <ControlButton
            label="완성"
            onPress={() => navigation.navigate("Comic")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  colorModal: {
    flex: 1,
  },
  colors: {
    position: "absolute",
    borderRadius: 20,
    top: "20%",
    width: "20%",
    height: "60%",
    right: "22.25%",
    backgroundColor: "#DBE2EF",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    left: "15%",
  },
  manualView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: "50%",
    height: "40%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    gap: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    zIndex: 1,
    top: 30,
    right: 25,
    borderRadius: 50,
    backgroundColor: "#DBE2EF",
    padding: 5,
  },
  listbox: {
    borderRadius: 20,
    padding: 15,
    width: 300,
  },
  backbox: {
    borderRadius: 20,
    padding: 15,
    width: 300,
  },
  mainColor: {
    backgroundColor: "#DBE2EF",
  },
  audioList: {
    flex: 1,
    borderRadius: 20,
    width: "100%",
    justifyContent: "center",
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    padding: 20,
    paddingTop: 20,
  },
  inputStyle: {
    fontSize: 30,
    textAlign: "center",
    lineHeight: 50,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 80,
    height: 50,
    justifyContent: "center",
  },
});
