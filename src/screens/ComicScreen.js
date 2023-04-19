import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSelector } from "react-redux";

import ControlButton from "../components/buttons/ControlButton";
import { ICONPATH, ICONCOLOR } from "../constants/icon";
import { selectPage, selectTitle } from "../store/feature/drawingBoardSlice";

export default function ComicScreen({ navigation }) {
  const title = useSelector(selectTitle);
  const [view, setView] = useState("preview");
  const pages = useSelector(selectPage);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} adjustsFontSizeToFit numberOfLines={1}>
          {title || "제목없음"}
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.comicbox}>
          {Object.keys(pages).map((page) => (
            <Image
              key={page}
              source={{ uri: pages[page].imageUrl }}
              style={{
                width: "49%",
                height: "45.5%",
                backgroundColor: "#ffffff",
              }}
            />
          ))}
        </View>
        <View style={styles.toolbox}>
          <Pressable
            title="audio"
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Svg width={80} height={80} viewBox="0 0 640 512">
              <Path d={ICONPATH.SOUND} fill={ICONCOLOR.general} />
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
    width: "84%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  title: {
    fontSize: 40,
  },
  comicbox: {
    borderWidth: 1,
    width: "84%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    gap: 10,
  },
  toolbox: {
    borderWidth: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
