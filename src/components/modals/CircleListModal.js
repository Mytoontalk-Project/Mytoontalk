import React, { useState } from "react";
import {
  Modal,
  Alert,
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";

import { ICONPATH, ICONCOLOR } from "../../constants/icon";
import AudioButton from "../buttons/AudioButton";
import { selectAudioPage } from "../../store/feature/audioSlice";
import {
  setCurrentTool,
  selectCurrentPage,
} from "../../store/feature/drawingBoardSlice";

export default function CircleListModal({
  title,
  isShowModal,
  setIsShowModal,
}) {
  const dispatch = useDispatch();
  const [playingIndex, setPlayingIndex] = useState(null);
  const currentPage = useSelector(selectCurrentPage);
  const recordings = useSelector(selectAudioPage)[currentPage].audioData;

  const handlePlayAudio = (index, sound) => {
    sound.replayAsync();
    setPlayingIndex(index);
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setPlayingIndex(null);
      }
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isShowModal}
      onRequestClose={async () => {
        Alert.alert("closed.");
        setIsShowModal(!setIsShowModal);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.listbox, styles.mainColor]}>
            <Text style={styles.titleStyle}>{title}</Text>
          </View>
          <Pressable
            testID="close-button"
            onPress={() => {
              setIsShowModal(false);
              dispatch(setCurrentTool("pen"));
            }}
            style={styles.closeButton}
          >
            <Svg width={30} height={30} viewBox="0 0 384 512">
              <Path d={ICONPATH.XMARK} fill={ICONCOLOR.general} />
            </Svg>
          </Pressable>
          <View style={[styles.audioList, styles.mainColor]}>
            <FlatList
              data={recordings}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    borderWidth: playingIndex === index ? 2 : 1,
                    borderRadius: "50%",
                    borderColor: playingIndex === index ? "#77037B" : null,
                    width: "14%",
                    aspectRatio: 1,
                    marginHorizontal: 7,
                    marginVertical: 11,
                    backgroundColor: "#ffffff",
                  }}
                >
                  <AudioButton
                    label={index + 1}
                    onPress={() => handlePlayAudio(index, item.sound)}
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
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    left: "15%",
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
  listbox: {
    borderRadius: 20,
    padding: 15,
    width: 300,
  },
  mainColor: {
    backgroundColor: "#DBE2EF",
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
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
  audioList: {
    flex: 1,
    borderRadius: 20,
    width: "100%",
    justifyContent: "center",
  },
});
