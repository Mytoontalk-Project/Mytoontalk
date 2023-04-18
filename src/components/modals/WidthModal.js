import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Alert,
  StyleSheet,
  View,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";

import {
  selectCurrentTool,
  selectEraserColor,
  selectPenColor,
  setEraserWidth,
  setPenWidth,
} from "../../store/feature/drawingBoardSlice";

export default function WidthModal({ isShowModal, setIsShowModal }) {
  const dispatch = useDispatch();
  const currentTool = useSelector(selectCurrentTool);
  const penColor = useSelector(selectPenColor);
  const eraserColor = useSelector(selectEraserColor);
  const penWidth = [3, 6, 9, 12, 15, 18, 21, 24, 27];
  const eraserWidth = [5, 9, 15, 19, 23, 27, 31, 35, 39];
  const widths = currentTool === "pen" ? penWidth : eraserWidth;

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
      <View style={styles.widths}>
        {widths.map((width) => (
          <Pressable
            key={width}
            onPress={() => {
              currentTool === "pen"
                ? dispatch(setPenWidth(width))
                : dispatch(setEraserWidth(width));
              setIsShowModal(false);
            }}
            style={styles.widthBox}
          >
            <View
              style={
                currentTool === "pen"
                  ? penWidthStyle(width, penColor).pen
                  : penWidthStyle(width, eraserColor).eraser
              }
            />
          </Pressable>
        ))}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  widths: {
    position: "absolute",
    borderRadius: 20,
    top: "20%",
    width: "7%",
    height: "60%",
    right: "22.25%",
    backgroundColor: "#DBE2EF",
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
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  widthBox: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

const penWidthStyle = (y, color) =>
  StyleSheet.create({
    pen: {
      backgroundColor: "#000000",
      width: y + 20,
      height: y,
      borderRadius: "50%",
    },
    eraser: {
      backgroundColor: color,
      width: y,
      height: y,
      borderRadius: "50%",
    },
  });
