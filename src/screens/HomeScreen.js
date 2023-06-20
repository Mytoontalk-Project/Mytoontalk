import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import * as FileSystem from "expo-file-system";

import Header from "../components/Header";
import OpenComic from "../components/OpenComic";
import { ICONPATH, ICONCOLOR } from "../constants/icon";
import {
  createNewCanvas,
  selectTitleList,
} from "../store/feature/drawingBoardSlice";
import { createNewRecording } from "../store/feature/audioSlice";
import ComicDeleteCheckModal from "../components/modals/ComicDeleteCheckModal";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [input, setInput] = useState("");
  const [comicData, setComicData] = useState([]);
  const titleList = useSelector(selectTitleList);

  const loadComics = useCallback(async () => {
    const dirUri = `${FileSystem.documentDirectory}mytoontalk/`;
    const comicList = await FileSystem.readDirectoryAsync(dirUri);

    const newData = await Promise.all(
      comicList.map(async (id) => {
        const comicUri = `${dirUri}${id}/`;
        const [title, pageInfo] = await Promise.all([
          FileSystem.readAsStringAsync(`${comicUri}title.txt`),
          FileSystem.getInfoAsync(`${comicUri}pages/1.png`),
        ]);

        let imageUri = null;
        if (pageInfo.exists) {
          const imageBase64 = await FileSystem.readAsStringAsync(
            `${comicUri}pages/1.png`,
            { encoding: FileSystem.EncodingType.Base64 },
          );
          imageUri = `data:image/png;base64,${imageBase64}`;
        }

        const idInfo = await FileSystem.getInfoAsync(`${comicUri}`);
        const { modificationTime } = idInfo;

        return {
          id,
          title,
          hasCover: pageInfo.exists,
          imageUri,
          creationTime: modificationTime || null,
        };
      }),
    );

    newData.sort((a, b) => {
      if (a.creationTime && b.creationTime) {
        return (
          new Date(a.creationTime).getTime() -
          new Date(b.creationTime).getTime()
        );
      }
      if (!a.creationTime && b.creationTime) {
        return 1;
      }
      if (a.creationTime && !b.creationTime) {
        return -1;
      }
      return 0;
    });

    setComicData(newData);
  }, []);

  useEffect(() => {
    loadComics();
  }, [titleList]);

  const toggleModal = () => {
    setIsShowModal(!isShowModal);
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
            setIsShowModal(!isShowModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={[styles.titleBox, styles.mainColor]}>
                <Text style={styles.titleStyle}>제목</Text>
              </View>
              <Pressable
                onPress={() => setIsShowModal(false)}
                style={styles.closeButton}
              >
                <Svg width={30} height={30} viewBox="0 0 384 512">
                  <Path d={ICONPATH.XMARK} fill={ICONCOLOR.general} />
                </Svg>
              </Pressable>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholder="제목을 입력해주세요."
                multiline
                style={[styles.mainColor, styles.input]}
              />
              <Pressable
                style={[styles.button, styles.mainColor]}
                onPress={() => {
                  setIsShowModal(!isShowModal);
                  dispatch(createNewCanvas(input));
                  setInput("");
                  dispatch(createNewRecording());
                  navigation.navigate("Drawing");
                }}
              >
                <Text style={styles.textStyle}>생성</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      ) : (
        <ComicDeleteCheckModal
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          comicData={comicData}
        />
      )}
      <Header style={{ flex: 1 }} />
      <OpenComic
        style={{ flex: 1 }}
        isShowModal={toggleModal}
        currentModal={handleCurrentModal}
        navigation={navigation}
        loadedComics={comicData}
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
  titleBox: {
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
