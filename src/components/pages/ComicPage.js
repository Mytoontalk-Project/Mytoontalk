import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

import DrawingBoard from "../DrawingBoard";
import ControlButton from "../buttons/ControlButton";

export default function ComicPage() {
  const view = "preview";
  const label = "저장";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} adjustsFontSizeToFit numberOfLines={1}>
          제목
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        {view === "preview" ? (
          <View style={styles.comicbox}>
            <View style={{ width: 500, height: 350 }}>
              <DrawingBoard />
            </View>
            <View style={{ width: 500, height: 350 }}>
              <DrawingBoard />
            </View>
            <View style={{ width: 500, height: 350 }}>
              <DrawingBoard />
            </View>
            <View style={{ width: 500, height: 350 }}>
              <DrawingBoard />
            </View>
          </View>
        ) : (
          <View style={styles.comicbox}>
            <View
              style={{ width: 500, height: 350, backgroundColor: "#ffffff" }}
            ></View>
            <View
              style={{ vwidth: 500, height: 350, backgroundColor: "#ffffff" }}
            ></View>
            <View
              style={{ width: 500, height: 350, backgroundColor: "#ffffff" }}
            ></View>
            <View
              style={{ width: 500, height: 350, backgroundColor: "#ffffff" }}
            ></View>
          </View>
        )}
        <View style={styles.toolbox}>
          <Pressable
            title="audio"
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Svg width={80} height={80} viewBox="0 0 640 512">
              <Path
                d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"
                fill="#000"
              />
            </Svg>
          </Pressable>
          <View style={{ flexDirection: "row", gap: 20 }}>
            {view === "preview" ? <ControlButton label="수정" /> : null}
            <ControlButton label={label} />
          </View>
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
  bodyContainer: {
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
  },
  header: {
    borderWidth: 1,
    flex: 1 / 7,
    width: "79%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
  },
  comicbox: {
    width: "79%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    gap: 20,
  },
  toolbox: {
    borderWidth: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
