import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

import DrawingBoard from "../DrawingBoard";
import WorkingTool from "../WorkingTool";
import ControlButton from "../buttons/ControlButton";

export default function DrawingPage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} adjustsFontSizeToFit numberOfLines={1}>
          제목
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <DrawingBoard />
        <WorkingTool />
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.pageMoveButton}>
          <Pressable onPress={() => alert("prev")}>
            <Svg width={50} height={50} viewBox="0 0 512 512">
              <Path
                d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9L117.5 269.8c-3.5-3.8-5.5-8.7-5.5-13.8s2-10.1 5.5-13.8l99.9-107.1c4.2-4.5 10.1-7.1 16.3-7.1c12.3 0 22.3 10 22.3 22.3l0 57.7 96 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32l-96 0 0 57.7c0 12.3-10 22.3-22.3 22.3c-6.2 0-12.1-2.6-16.3-7.1z"
                fill="#000"
              />
            </Svg>
          </Pressable>
          <Pressable onPress={() => alert("audio")}>
            <Svg width={50} height={50} viewBox="0 0 640 512">
              <Path
                d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 21.2-5.1 41.1-14.2 58.7L416 300.8V96c0-53-43-96-96-96s-96 43-96 96v54.3L38.8 5.1zM344 430.4c20.4-2.8 39.7-9.1 57.3-18.2l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128v-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6v40c0 89.1 66.2 162.7 152 174.4V464H248c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H344V430.4z"
                fill="#000"
              />
            </Svg>
          </Pressable>
          <Pressable onPress={() => alert("next")}>
            <Svg width={50} height={50} viewBox="0 0 512 512">
              <Path
                d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1l99.9 107.1c3.5 3.8 5.5 8.7 5.5 13.8s-2 10.1-5.5 13.8L294.6 376.9c-4.2 4.5-10.1 7.1-16.3 7.1C266 384 256 374 256 361.7l0-57.7-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-57.7c0-12.3 10-22.3 22.3-22.3c6.2 0 12.1 2.6 16.3 7.1z"
                fill="#000"
              />
            </Svg>
          </Pressable>
        </View>
        <View>
          <ControlButton label="완성" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#DBE2EF",
  },
  header: {
    width: "74%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    paddingBottom: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pageMoveButton: {
    width: "74%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
