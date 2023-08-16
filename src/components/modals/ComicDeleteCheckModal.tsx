import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import Svg, { Path } from "react-native-svg";

import Empty from "../Empty";
import ControlButton from "../buttons/ControlButton";
import { deleteDirectory } from "../../utils/fileSystem";
import {
  selectTitleList,
  setTitleList,
} from "../../store/feature/drawingBoardSlice";
import { ICONPATH, ICONCOLOR } from "../../constants/icon";
import { LoadedComicsData } from "../../types/screensType";

interface ComicDeleteCheckModalProps {
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => void;
  comicData: LoadedComicsData[];
}

const ComicDeleteCheckModal = ({
  isShowModal,
  setIsShowModal,
  comicData,
}: ComicDeleteCheckModalProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [showDeleteComic, setShowDeleteComic] = useState<boolean>(false);
  const [selectedComicId, setSelectedComicId] = useState<string | null>(null);
  const titleList = useAppSelector(selectTitleList);

  const handleDeleteDirectory = async (id: string | null) => {
    const deletedTitleList = await deleteDirectory(id, titleList);
    dispatch(setTitleList(deletedTitleList));
  };

  return (
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
            {comicData.length === 0 ? (
              <Empty />
            ) : (
              <FlatList
                data={comicData}
                renderItem={({ item }) => (
                  <View style={styles.comic}>
                    <Text style={{ fontSize: 25, flex: 1 }}>{item.title}</Text>
                    <ControlButton
                      label="삭제"
                      onPress={() => {
                        setSelectedComicId(item.id);
                        setShowDeleteComic(true);
                      }}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent
        visible={showDeleteComic}
        onRequestClose={() => {
          Alert.alert("closed.");
          setShowDeleteComic(!showDeleteComic);
        }}
      >
        <View style={styles.deleteCenteredView}>
          <View style={styles.deleteModalCheckView}>
            <Pressable
              onPress={() => setShowDeleteComic(false)}
              style={styles.closeButton}
            >
              <Svg width={25} height={25} viewBox="0 0 384 512">
                <Path d={ICONPATH.XMARK} fill={ICONCOLOR.general} />
              </Svg>
            </Pressable>
            <View style={styles.deleteCheckContent}>
              <Text style={{ color: "red", fontSize: 20 }}>
                정말로 만화를 삭제하시겠습니까?
              </Text>
              <ControlButton
                label="삭제"
                onPress={() => {
                  handleDeleteDirectory(selectedComicId);
                  setShowDeleteComic(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  deleteCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteModalCheckView: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    top: "28%",
    width: "50%",
    height: "15%",
    padding: 20,
    alignItems: "center",
  },
  deleteCheckContent: {
    flex: 1,
    fontSize: 30,
    borderRadius: 20,
    width: "100%",
    padding: 20,
    backgroundColor: "#DBE2EF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
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

export default ComicDeleteCheckModal;
