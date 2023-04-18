import React from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  Alert,
  StyleSheet,
  View,
  Pressable,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";

import { setPenColor } from "../../store/feature/drawingBoardSlice";
import COLORLIST from "../../constants/color";

export default function ColorListModal({ isShowModal, setIsShowModal }) {
  const dispatch = useDispatch();
  return (
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
        <View style={{ flex: 1 }} />
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
                onPress={() => {
                  dispatch(setPenColor(item));
                  setIsShowModal(false);
                }}
              />
            )}
            numColumns={6}
            keyExtractor={(item, index) => index.toString()}
          />
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
});
