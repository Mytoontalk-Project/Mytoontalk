import React from "react";
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
import { useSelector } from "react-redux";

import { ICONPATH, ICONCOLOR } from "../../constants/icon";
import AudioButton from "../buttons/AudioButton";
import { selectRecordings } from "../../store/feature/audioSlice";

export default function CircleListModal({
  title,
  isShowModal,
  setIsShowModal,
}) {
  const recordings = useSelector(selectRecordings);

  return (
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
            <Text style={styles.titleStyle}>{title}</Text>
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
