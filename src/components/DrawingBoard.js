import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Canvas, Path } from "@shopify/react-native-skia";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import { selectColor } from "../store/feature/drawingBoardSlice";

export default function DrawingBoard() {
  const [paths, setPaths] = useState([]);
  const currentColor = useSelector(selectColor);

  const pan = Gesture.Pan()
    .onStart((g) => {
      const newPaths = [...paths];
      newPaths[paths.length] = {
        segments: [],
        color: currentColor,
      };
      newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
      setPaths(newPaths);
    })
    .onUpdate((g) => {
      const index = paths.length - 1;
      const newPaths = [...paths];
      if (newPaths?.[index]?.segments) {
        newPaths[index].segments.push(`L ${g.x} ${g.y}`);
        setPaths(newPaths);
      }
    })
    .minDistance(1);


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <Canvas style={styles.canvas}>
          {paths.map((p, index) => (
            <Path
              key={index}
              path={p.segments.join(" ")}
              strokeWidth={5}
              style="stroke"
              strokeJoin="round"
              strokeCap="round"
              color={p.color}
            />
          ))}
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
  },
});
