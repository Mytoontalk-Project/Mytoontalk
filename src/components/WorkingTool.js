import React from "react";
import { Pressable, StyleSheet, View, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";

import {
  selectCurrentPage,
  selectCurrentTool,
  selectPenColor,
  setCurrentTool,
  selectPage,
  setPathUndo,
  setPathRedo,
} from "../store/feature/drawingBoardSlice";
import { ICONPATH, ICONCOLOR } from "../constants/icon";
import { selectAudioPage } from "../store/feature/audioSlice";

export default function WorkingTool({ isShowModal, currentModal }) {
  const dispatch = useDispatch();
  const penColor = useSelector(selectPenColor);
  const currentPage = useSelector(selectCurrentPage);
  const recordings = useSelector(selectAudioPage)[currentPage].audioData;
  const currentRecording = recordings[recordings.length - 1];
  const currentTool = useSelector(selectCurrentTool);
  const pagePaths = useSelector(selectPage)[currentPage].drawingData;
  const redoPaths = useSelector(selectPage)[currentPage].redoData;

  const movePathUndo = () => {
    if (pagePaths.length) {
      const lastPath = pagePaths[pagePaths.length - 1];
      const restPaths = pagePaths.slice(0, pagePaths.length - 1);

      dispatch(setPathUndo({ currentPage, restPaths, lastPath }));
    }
  };

  const movePathRedo = () => {
    if (redoPaths.length) {
      const lastPath = redoPaths[redoPaths.length - 1];
      const restPaths = redoPaths.slice(0, redoPaths.length - 1);

      dispatch(setPathRedo({ currentPage, lastPath, restPaths }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <Pressable
          name="pen"
          onPress={() => {
            currentModal("width");
            dispatch(setCurrentTool("pen"));
          }}
          onLongPress={() => {
            isShowModal();
            currentModal("width");
            dispatch(setCurrentTool("pen"));
          }}
        >
          <Svg width={70} height={70} viewBox="0 0 512 512">
            <Path
              d={ICONPATH.PENCIL}
              fill={currentTool === "pen" ? ICONCOLOR.pen : ICONCOLOR.general}
            />
          </Svg>
        </Pressable>
        <Pressable
          name="color"
          onPress={() => {
            isShowModal();
            dispatch(setCurrentTool("pen"));
            currentModal("color");
          }}
        >
          <Svg width={70} height={70} viewBox="0 0 512 512">
            <Path d={ICONPATH.PALETTE} fill={ICONCOLOR.general} />
            <View width={30} height={30} style={colorStyle(penColor).color} />
          </Svg>
        </Pressable>
        <TouchableOpacity name="undo" onPress={movePathUndo}>
          <Svg width={70} height={70} viewBox="0 0 512 512">
            <Path d={ICONPATH.UNDO} fill={ICONCOLOR.general} />
          </Svg>
        </TouchableOpacity>
        <Pressable
          name="home"
          onPress={() => {
            isShowModal();
            currentModal("home");
            dispatch(setCurrentTool("home"));
          }}
        >
          <Svg width={70} height={70} viewBox="0 0 512 512">
            <Path
              d={ICONPATH.BACK}
              fill={currentTool === "home" ? ICONCOLOR.home : ICONCOLOR.general}
            />
          </Svg>
        </Pressable>
      </View>
      <View style={styles.icons}>
        <Pressable
          name="eraser"
          onPress={() => {
            currentModal("width");
            dispatch(setCurrentTool("eraser"));
          }}
          onLongPress={() => {
            isShowModal();
            currentModal("width");
            dispatch(setCurrentTool("eraser"));
          }}
        >
          <Svg width={70} height={70} viewBox="0 0 576 512">
            <Path
              d={ICONPATH.ERASER}
              fill={
                currentTool === "eraser" ? ICONCOLOR.eraser : ICONCOLOR.general
              }
            />
          </Svg>
        </Pressable>
        <Pressable
          name="sound"
          onPress={async () => {
            if (currentRecording) dispatch(setCurrentTool("sound"));
            await currentRecording?.sound.replayAsync();
            currentRecording?.sound.setOnPlaybackStatusUpdate((status) => {
              if (status.didJustFinish) {
                dispatch(setCurrentTool("pen"));
              }
            });
          }}
        >
          <Svg width={70} height={70} viewBox="0 0 640 512">
            <Path
              d={ICONPATH.SOUND}
              fill={
                currentTool === "sound" ? ICONCOLOR.sound : ICONCOLOR.general
              }
            />
          </Svg>
        </Pressable>
        <TouchableOpacity name="redo" onPress={movePathRedo}>
          <Svg width={70} height={70} viewBox="0 0 512 512">
            <Path d={ICONPATH.REDO} fill={ICONCOLOR.general} />
          </Svg>
        </TouchableOpacity>
        <Pressable
          name="audioList"
          onPress={() => {
            isShowModal();
            currentModal("list");
            dispatch(setCurrentTool("audioList"));
          }}
        >
          <Svg width={70} height={70} viewBox="0 0 576 512">
            <Path
              d={ICONPATH.LIST}
              fill={
                currentTool === "audioList" ? ICONCOLOR.list : ICONCOLOR.general
              }
            />
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
