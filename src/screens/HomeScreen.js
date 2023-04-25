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
  FlatList,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import * as FileSystem from "expo-file-system";

import ControlButton from "../components/buttons/ControlButton";
import Header from "../components/Header";
import OpenComic from "../components/OpenComic";
import { ICONPATH, ICONCOLOR } from "../constants/icon";
import {
  createNewCanvas,
  selectTitleList,
  setTitleList,
} from "../store/feature/drawingBoardSlice";
import { createNewRecording } from "../store/feature/audioSlice";
import { deleteDirectory } from "../utils/fileSystem";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [input, setInput] = useState("");
  const titleList = useSelector(selectTitleList);
  const [fileSystem, setFileSystem] = useState([]);

  const loadComics = useCallback(async () => {
    const dirUri = `${FileSystem.documentDirectory}mytoontalk/`;
    const comicList = await FileSystem.readDirectoryAsync(dirUri);

    const newData = await Promise.all(
      comicList.map(async (id) => {
        const comicUri = `${dirUri}${id}/`;
        const [title, pageInfo, creationTime] = await Promise.all([
          FileSystem.readAsStringAsync(`${comicUri}title.txt`),
          FileSystem.getInfoAsync(`${comicUri}pages/1.png`),
          FileSystem.getInfoAsync(`${comicUri}pages/1.png`, {
            creationTime: true,
          }),
        ]);

        let imageUri = null;
        if (pageInfo.exists) {
          const imageBase64 = await FileSystem.readAsStringAsync(
            `${comicUri}pages/1.png`,
            { encoding: FileSystem.EncodingType.Base64 },
          );
          imageUri = `data:image/png;base64,${imageBase64}`;
        }

        return {
          id,
          title,
          hasCover: pageInfo.exists,
          imageUri,
          creationTime: creationTime.creationTime || null,
        };
      }),
    );

    newData.sort(
      (a, b) =>
        new Date(a.creationTime).getTime() - new Date(b.creationTime).getTime(),
    );

    setFileSystem(newData);
  }, []);

  useEffect(() => {
    loadComics();
  }, [titleList]);

  const readTitleTexts = async () => {
    try {
      const mytoontalkDir = `${FileSystem.documentDirectory}mytoontalk/`;
      const ids = await FileSystem.readDirectoryAsync(mytoontalkDir);
      const titles = [];

      for (const id of ids) {
        const titlePath = `${mytoontalkDir}${id}/title.txt`;
        const titleContent = await FileSystem.readAsStringAsync(titlePath);
        titles.push(titleContent);
      }

      dispatch(setTitleList(titles));
    } catch (err) {
      alert("네컷만화 리스트를 읽어올 수 없습니다.");
    }
  };

  useEffect(() => {
    readTitleTexts();
  }, []);

  const toggleModal = () => {
    setIsShowModal(true);
  };

  const handleCurrentModal = (modal) => {
    setCurrentModal(modal);
  };

  const handleDeleteDirectory = async (index) => {
    const deletedTitleList = await deleteDirectory(index, titleList);
    dispatch(setTitleList(deletedTitleList));
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
                  setInput("");
                  dispatch(createNewCanvas(input));
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
                <Text style={styles.titleStyle}>네컷만화 리스트</Text>
              </View>
              <Pressable
                onPress={() => setIsShowModal(false)}
                style={styles.closeButton}
              >
                <Svg width={30} height={30} viewBox="0 0 384 512">
                  <Path d={ICONPATH.XMARK} fill={ICONCOLOR.general} />
                </Svg>
              </Pressable>
              <View style={[styles.comicList, styles.mainColor]}>
                <FlatList
                  data={titleList}
                  renderItem={({ item, index }) => (
                    <View style={styles.comic}>
                      <Text style={{ fontSize: 25, flex: 1 }}>{item}</Text>
                      <ControlButton
                        label="삭제"
                        onPress={() => {
                          handleDeleteDirectory(index);
                        }}
                      />
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
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
        navigation={navigation}
        loadedComics={fileSystem}
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
