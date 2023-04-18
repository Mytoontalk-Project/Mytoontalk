import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import Svg, { Path } from "react-native-svg";

import ControlButton from "../components/buttons/ControlButton";
import Header from "../components/Header";
import OpenComic from "../components/OpenComic";
import { ICONPATH, ICONCOLOR } from "../constants/icon";
import { setTitle } from "../store/feature/drawingBoardSlice";
import { setRecordings } from "../store/feature/audioSlice";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isShowModal, setIsShoweModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [input, setInput] = useState("");

  const toggleModal = () => {
    setIsShoweModal(true);
  };

  const handleCurrentModal = (modal) => {
    setCurrentModal(modal);
  };

  return (
    <View style={styles.container}>
      {currentModal === "생성" ? (
        <Modal
          animationType="fade"
          transparent
          visible={isShowModal}
          onRequestClose={() => {
            Alert.alert("closed.");
            setIsShoweModal(!isShowModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={[styles.titlebox, styles.mainColor]}>
                <Text style={styles.titleStyle}>제목</Text>
              </View>
              <Pressable
                onPress={() => setIsShoweModal(false)}
                style={styles.closeButton}
              >
                <Svg width={30} height={30} viewBox="0 0 384 512">
                  <Path d={ICONPATH.XMARK} fill={ICONCOLOR} />
                </Svg>
              </Pressable>
              <TextInput
                value={input}
                onChangeText={(input) => setInput(input)}
                placeholder="제목을 입력해주세요."
                multiline
                style={[styles.mainColor, styles.input]}
              />
              <Pressable
                style={[styles.button, styles.mainColor]}
                onPress={() => {
                  setIsShoweModal(!isShowModal);
                  dispatch(setTitle(input));
                  setInput("");
                  dispatch(setRecordings([]));
                  navigation.navigate("Drawing");
                }}
              >
                <Text style={styles.textStyle}>생성</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      ) : (
        <Modal
          animationType="fade"
          transparent
          visible={isShowModal}
          onRequestClose={() => {
            Alert.alert("closed.");
            setIsShoweModal(!isShowModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={[styles.titlebox, styles.mainColor]}>
                <Text style={styles.titleStyle}>네컷만화 리스트</Text>
              </View>
              <Pressable
                onPress={() => setIsShoweModal(false)}
                style={styles.closeButton}
              >
                <Svg width={30} height={30} viewBox="0 0 384 512">
                  <Path d={ICONPATH.XMARK} fill={ICONCOLOR} />
                </Svg>
              </Pressable>
              <View style={[styles.comicList, styles.mainColor]}>
                <View style={styles.comic}>
                  <Text style={{ fontSize: 25, flex: 1 }}>짱구는 못말려</Text>
                  <ControlButton label="삭제" onPress={() => alert("삭제")} />
                </View>
                <View style={styles.comic}>
                  <Text style={{ fontSize: 25, flex: 1 }}>오늘의 일기</Text>
                  <ControlButton label="삭제" onPress={() => alert("삭제")} />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
      <Header style={{ flex: 1 }} />
      <OpenComic
        style={{ flex: 1 }}
        isShowModal={toggleModal}
        currentModal={handleCurrentModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
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
    shadowOpacity: 0.25,
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
  titlebox: {
    borderRadius: 20,
    padding: 15,
    width: 300,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 80,
    height: 50,
    justifyContent: "center",
  },
  mainColor: {
    backgroundColor: "#DBE2EF",
  },
  comicList: {
    flex: 1,
    fontSize: 30,
    borderRadius: 20,
    width: "100%",
    padding: 20,
  },
  input: {
    flex: 1,
    fontSize: 30,
    borderRadius: 20,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    padding: 20,
    paddingTop: 20,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  comic: {
    flexDirection: "row",
    alignContent: "space-between",
    gap: 20,
    marginBottom: 20,
    alignItems: "center",
  },
});
