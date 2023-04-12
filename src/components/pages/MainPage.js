import React, { useState } from "react";
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

import Header from "../Header";
import OpenComic from "../OpenComic";

export default function MainPage() {
  const [isShowTitleModal, setIsShowTitleModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [title, setTitle] = useState("");

  const toggleModal = () => {
    setIsShowTitleModal(true);
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
          visible={isShowTitleModal}
          onRequestClose={() => {
            Alert.alert("closed.");
            setIsShowTitleModal(!isShowTitleModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={[styles.titlebox, styles.buttonColor]}>
                <Text style={styles.titleStyle}>제목</Text>
              </View>
              <Pressable
                onPress={() => setIsShowTitleModal(false)}
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: 40,
                  right: 40,
                  borderRadius: 50,
                  backgroundColor: "#DBE2EF",
                  padding: 5,
                }}
              >
                <Svg width={35} height={35} viewBox="0 0 384 512">
                  <Path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                    fill="#000"
                  />
                </Svg>
              </Pressable>
              <TextInput
                value={title}
                onChangeText={(title) => setTitle(title)}
                placeholder="제목을 입력해주세요."
                multiline
                style={[styles.buttonColor, styles.input]}
              />
              <Pressable
                style={[styles.button, styles.buttonColor]}
                onPress={() => {
                  setIsShowTitleModal(!isShowTitleModal);
                  alert("drawingpage로 이동");
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
          visible={isShowTitleModal}
          onRequestClose={() => {
            Alert.alert("closed.");
            setIsShowTitleModal(!isShowTitleModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={[styles.titlebox, styles.buttonColor]}>
                <Text style={styles.titleStyle}>제목</Text>
              </View>
              <Pressable
                onPress={() => setIsShowTitleModal(false)}
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: 30,
                  right: 40,
                  borderRadius: 50,
                  backgroundColor: "#DBE2EF",
                  padding: 5,
                }}
              >
                <Svg width={35} height={35} viewBox="0 0 384 512">
                  <Path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                    fill="#000"
                  />
                </Svg>
              </Pressable>
              <TextInput
                value={title}
                onChangeText={(title) => setTitle(title)}
                placeholder="제목을 입력해주세요."
                multiline
                style={[styles.buttonColor, styles.input]}
              />
            </View>
          </View>
        </Modal>
      )}
      <Header />
      <OpenComic
        isShowTitleModal={toggleModal}
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
    gap: 30,
    alignItems: "center",
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
  buttonColor: {
    backgroundColor: "#DBE2EF",
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
});
