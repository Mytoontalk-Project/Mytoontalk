import React from "react";
import { Modal, Alert, StyleSheet, View, Text, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

import { ICONPATH, ICONCOLOR } from "../../constants/icon";

export default function GeneralModal({
  title,
  description,
  isShowModal,
  setIsShowModal,
  navigation,
  buttonText,
}) {
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
          <View style={[styles.backbox, styles.mainColor]}>
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
          <View style={[styles.mainColor, styles.description]}>
            <Text style={styles.descriptionStyle}>{description}</Text>
          </View>
          <Pressable
            style={[styles.button, styles.mainColor]}
            onPress={() => {
              setIsShowModal(!isShowModal);
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.textStyle}>{buttonText}</Text>
          </Pressable>
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
  backbox: {
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
  description: {
    flex: 1,
    borderRadius: 20,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    padding: 20,
    paddingTop: 20,
  },
  descriptionStyle: {
    fontSize: 25,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 80,
    height: 50,
    justifyContent: "center",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },
});
