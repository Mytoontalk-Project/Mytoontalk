import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSelector } from "react-redux";

import DrawingBoard from "../components/DrawingBoard";
import ControlButton from "../components/buttons/ControlButton";
import { ICONPATH, ICONCOLOR } from "../constants/icon";
import { selectTitle } from "../store/feature/drawingBoardSlice";

export default function ComicScreen({ navigation }) {
  const title = useSelector(selectTitle);
  const [view, setView] = useState("preview");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} adjustsFontSizeToFit numberOfLines={1}>
          {title || "제목없음"}
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        {view === "preview" ? (
          <View style={styles.comicbox}>
            <View style={{ width: "48%", height: "48%" }}>
              <DrawingBoard />
            </View>
            <View style={{ width: "48%", height: "48%" }}>
              <DrawingBoard />
            </View>
            <View style={{ width: "48%", height: "48%" }}>
              <DrawingBoard />
            </View>
            <View style={{ width: "48%", height: "48%" }}>
              <DrawingBoard />
            </View>
          </View>
        ) : (
          <View style={styles.comicbox}>
            <View
              style={{
                width: "48%",
                height: "48%",
                backgroundColor: "#ffffff",
              }}
            ></View>
            <View
              style={{
                width: "48%",
                height: "48%",
                backgroundColor: "#ffffff",
              }}
            ></View>
            <View
              style={{
                width: "48%",
                height: "48%",
                backgroundColor: "#ffffff",
              }}
            ></View>
            <View
              style={{
                width: "48%",
                height: "48%",
                backgroundColor: "#ffffff",
              }}
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
              <Path d={ICONPATH.SOUND} fill={ICONCOLOR} />
            </Svg>
          </Pressable>
          <View style={{ flexDirection: "row", gap: 20 }}>
            {view === "preview" ? (
              <>
                <ControlButton
                  label="수정"
                  onPress={() => navigation.navigate("Drawing")}
                />
                <ControlButton label="저장" onPress={() => setView("comic")} />
              </>
            ) : (
              <ControlButton
                label="나가기"
                onPress={() => navigation.navigate("Home")}
              />
            )}
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
    flex: 1,
    flexDirection: "row",
  },
  header: {
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
    gap: 10,
  },
  toolbox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
