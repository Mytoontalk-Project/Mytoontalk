import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  Alert,
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import Svg, { Path } from "react-native-svg";

import DrawingBoard from "../components/DrawingBoard";
import WorkingTool from "../components/WorkingTool";
import ControlButton from "../components/buttons/ControlButton";
import AudioButton from "../components/buttons/AudioButton";
import ManualModal from "../components/ManualModal";
import COLORLIST from "../constants/color";
import { setColor } from "../store/feature/drawingBoardSlice";

export default function DrawingScreen({ navigation }) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);

  const dispatch = useDispatch();
  const data = [
    { id: "1", name: "Audio" },
    { id: "2", name: "Audio" },
    { id: "3", name: "Audio" },
    { id: "4", name: "Audio" },
    { id: "5", name: "Audio" },
    { id: "6", name: "Audio" },
    { id: "7", name: "Audio" },
    { id: "8", name: "Audio" },
    { id: "9", name: "Audio" },
    { id: "10", name: "Audio" },
    { id: "11", name: "Audio" },
    { id: "12", name: "Audio" },
    { id: "13", name: "Audio" },
    { id: "14", name: "Audio" },
  ];

  const toggleModal = () => {
    setIsShowModal(true);
  };

  const handleCurrentModal = (modal) => {
    setCurrentModal(modal);
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
                  <Path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                    fill="#000"
                  />
                </Svg>
              </Pressable>
              <View style={[styles.audioList, styles.mainColor]}>
                <FlatList
                  data={data}
                  renderItem={({ item }) => (
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
                        label={item.id}
                        onPress={() => alert("삭제")}
                      />
                    </View>
                  )}
                  numColumns={6}
                  keyExtractor={(item, index) => index.toString()}
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
                  <Path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                    fill="#000"
                  />
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
        <Text style={styles.title} adjustsFontSizeToFit numberOfLines={1}>
          오늘의 집
        </Text>
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
              <Path
                d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9L117.5 269.8c-3.5-3.8-5.5-8.7-5.5-13.8s2-10.1 5.5-13.8l99.9-107.1c4.2-4.5 10.1-7.1 16.3-7.1c12.3 0 22.3 10 22.3 22.3l0 57.7 96 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-96 0 0 57.7c0 12.3-10 22.3-22.3 22.3c-6.2 0-12.1-2.6-16.3-7.1z"
                fill="#000"
              />
            </Svg>
          </Pressable>
          <Pressable style={styles.icon} onPress={() => alert("audio")}>
            <Svg width="auto" height="100%" viewBox="0 0 640 512">
              <Path
                d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 21.2-5.1 41.1-14.2 58.7L416 300.8V96c0-53-43-96-96-96s-96 43-96 96v54.3L38.8 5.1zM344 430.4c20.4-2.8 39.7-9.1 57.3-18.2l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128v-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6v40c0 89.1 66.2 162.7 152 174.4V464H248c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H344V430.4z"
                fill="#000"
              />
            </Svg>
          </Pressable>
          <Pressable style={styles.icon} onPress={() => alert("next")}>
            <Svg width="auto" height="100%" viewBox="0 0 512 512">
              <Path
                d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1l99.9 107.1c3.5 3.8 5.5 8.7 5.5 13.8s-2 10.1-5.5 13.8L294.6 376.9c-4.2 4.5-10.1 7.1-16.3 7.1C266 384 256 374 256 361.7l0-57.7-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-57.7c0-12.3 10-22.3 22.3-22.3c6.2 0 12.1 2.6 16.3 7.1z"
                fill="#000"
              />
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
