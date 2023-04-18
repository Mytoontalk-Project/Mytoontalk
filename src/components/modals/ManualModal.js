import React, { useState } from "react";
import {
  Modal,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Svg, { Path } from "react-native-svg";

import { ICONPATH, ICONCOLOR } from "../../constants/icon";

export default function ManualModal({ title, description, setCurrentModal }) {
  const [isShowModal, setIsShowModal] = useState(true);

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
      <View style={styles.manualView}>
        <View style={styles.modalView}>
          <View style={[styles.listbox, styles.mainColor]}>
            <Text style={styles.titleStyle}>{title}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsShowModal(false);
              if (setCurrentModal) {
                setCurrentModal("next");
              }
            }}
            style={styles.closeButton}
          >
            <Svg width={30} height={30} viewBox="0 0 384 512">
              <Path d={ICONPATH.XMARK} fill={ICONCOLOR.general} />
            </Svg>
          </TouchableOpacity>
          <View style={[styles.mainColor, styles.input]}>
            <Text style={styles.inputStyle}>{description}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  mainColor: {
    backgroundColor: "#DBE2EF",
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
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
    fontSize: 25,
    textAlign: "center",
    lineHeight: 50,
  },
});
