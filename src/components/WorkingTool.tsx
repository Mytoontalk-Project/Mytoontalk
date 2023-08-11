import React from "react";
import { Pressable, StyleSheet, View, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";

import { useAppSelector, useAppDispatch } from "../hooks/useReduxHooks";
import {
  selectCurrentPage,
  selectCurrentTool,
  selectPenColor,
  setCurrentTool,
  selectImagePage,
  setPathUndo,
  setPathRedo,
} from "../store/feature/drawingBoardSlice";
import { ICONPATH, ICONCOLOR } from "../constants/icon";
import { selectAudioPage } from "../store/feature/audioSlice";
import { DIAMETER, RADIUSPERCENTAGE } from "../constants/info";

interface WorkingToolProps {
  isShowModal: () => void;
  handleCurrentModal: (modal: string) => void;
}

const WorkingTool = ({
  isShowModal,
  handleCurrentModal,
}: WorkingToolProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const penColor = useAppSelector(selectPenColor);
  const currentPage = useAppSelector(selectCurrentPage);
  const recordings = useAppSelector(selectAudioPage)[currentPage].audioData;
  const currentRecording = recordings[recordings.length - 1];
  const currentTool = useAppSelector(selectCurrentTool);
  const pagePaths = useAppSelector(selectImagePage)[currentPage].drawingData;
  const redoPaths = useAppSelector(selectImagePage)[currentPage].redoData;

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
          data-name="pen"
          onPress={() => {
            handleCurrentModal("width");
            dispatch(setCurrentTool("pen"));
          }}
          onLongPress={() => {
            isShowModal();
            handleCurrentModal("width");
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
          data-name="color"
          onPress={() => {
            isShowModal();
            dispatch(setCurrentTool("pen"));
            handleCurrentModal("color");
          }}
        >
          <Svg width={70} height={70} viewBox="0 0 512 512">
            <Path d={ICONPATH.PALETTE} fill={ICONCOLOR.general} />
            <View style={colorStyle(penColor).color} />
          </Svg>
        </Pressable>
        <TouchableOpacity data-name="undo" onPress={movePathUndo}>
          <Svg width={70} height={70} viewBox="0 0 512 512">
            <Path d={ICONPATH.UNDO} fill={ICONCOLOR.general} />
          </Svg>
        </TouchableOpacity>
        <Pressable
          data-name="home"
          onPress={() => {
            isShowModal();
            handleCurrentModal("home");
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
          data-name="eraser"
          onPress={() => {
            handleCurrentModal("width");
            dispatch(setCurrentTool("eraser"));
          }}
          onLongPress={() => {
            isShowModal();
            handleCurrentModal("width");
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
          data-name="sound"
          onPress={async () => {
            if (currentRecording) dispatch(setCurrentTool("sound"));
            await currentRecording?.sound.replayAsync();
            currentRecording?.sound.setOnPlaybackStatusUpdate(
              (status: AVPlaybackStatus) => {
                const playbackStatusSuccess = status as AVPlaybackStatusSuccess;
                if (playbackStatusSuccess.didJustFinish && playbackStatusSuccess.isLoaded) {
                  dispatch(setCurrentTool("pen"));
                }
              },
            );
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
        <TouchableOpacity data-name="redo" onPress={movePathRedo}>
          <Svg width={70} height={70} viewBox="0 0 512 512">
            <Path d={ICONPATH.REDO} fill={ICONCOLOR.general} />
          </Svg>
        </TouchableOpacity>
        <Pressable
          data-name="audioList"
          onPress={() => {
            isShowModal();
            handleCurrentModal("list");
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
};

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

const colorStyle = (color: string) =>
  StyleSheet.create({
    color: {
      position: "absolute",
      right: 0,
      top: 50,
      width: 30,
      height: 30,
      backgroundColor: color,
      borderRadius: (DIAMETER / 2) * (RADIUSPERCENTAGE / 100),
      borderWidth: 4,
    },
  });

export default WorkingTool;
