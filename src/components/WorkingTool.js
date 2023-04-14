import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSelector } from "react-redux";

import { selectColor } from "../store/feature/drawingBoardSlice";
import { ICONPATH, ICONCOLOR } from "../constants/icon";

export default function WorkingTool({ isShowModal, currentModal }) {
  const currentColor = useSelector(selectColor);

  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <Pressable name="pen">
          <Svg width={70} height={70} viewBox="0 0 512 512">
            <Path d={ICONPATH.PENCIL} fill={ICONCOLOR} />
          </Svg>
        </Pressable>
        <Pressable name="paint">
          <Svg width={70} height={70} viewBox="0 0 512 512">
            <Path d={ICONPATH.PAINTBRUSH} fill={ICONCOLOR} />
          </Svg>
        </Pressable>
        <Pressable
          name="color"
          onPress={() => {
            isShowModal();
            currentModal("color");
          }}
        >
          <Svg width={70} height={70} viewBox="0 0 512 512">
            <Path d={ICONPATH.PALETTE} fill={ICONCOLOR} />
            <View
              width={30}
              height={30}
              style={colorStyle(currentColor).color}
            ></View>
          </Svg>
        </Pressable>
        <Pressable
          name="home"
          onPress={() => {
            isShowModal();
            currentModal("home");
          }}
        >
          <Svg width={70} height={70} viewBox="0 0 512 512">
            <Path d={ICONPATH.BACK} fill={ICONCOLOR} />
          </Svg>
        </Pressable>
      </View>
      <View style={styles.icons}>
        <Pressable name="brush">
          <Svg width={70} height={70} viewBox="0 0 576 512">
            <Path d={ICONPATH.BRUSH} fill={ICONCOLOR} />
          </Svg>
        </Pressable>
        <Pressable name="eraser">
          <Svg width={70} height={70} viewBox="0 0 576 512">
            <Path d={ICONPATH.ERASER} fill={ICONCOLOR} />
          </Svg>
        </Pressable>
        <Pressable name="sound">
          <Svg width={70} height={70} viewBox="0 0 640 512">
            <Path d={ICONPATH.SOUND} fill={ICONCOLOR} />
          </Svg>
        </Pressable>
        <Pressable
          name="audiolist"
          onPress={() => {
            isShowModal();
            currentModal("list");
          }}
        >
          <Svg width={70} height={70} viewBox="0 0 576 512">
            <Path d={ICONPATH.LIST} fill={ICONCOLOR} />
          </Svg>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderRadius: 10,
    padding: 20,
  },
  icons: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const colorStyle = (color) =>
  StyleSheet.create({
    color: {
      position: "absolute",
      right: 0,
      top: 50,
      backgroundColor: color,
      borderRadius: "50%",
      borderWidth: 4,
    },
  });
