import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Canvas, Path } from "@shopify/react-native-skia";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import {
  selectCurrentTool,
  selectEraserColor,
  selectEraserWidth,
  selectPenColor,
  selectPenWidth,
} from "../store/feature/drawingBoardSlice";

export default function DrawingBoard() {
  const [paths, setPaths] = useState([]);
  const currentTool = useSelector(selectCurrentTool);
  const penColor = useSelector(selectPenColor);
  const penWidth = useSelector(selectPenWidth);
  const eraserColor = useSelector(selectEraserColor);
  const eraserWidth = useSelector(selectEraserWidth);

  const pan = Gesture.Pan()
    .onStart((g) => {
      const newPaths = [...paths];
      const { currentColor, currentWidth } =
        currentTool === "pen"
          ? { currentColor: penColor, currentWidth: penWidth }
          : { currentColor: eraserColor, currentWidth: eraserWidth };

      newPaths[paths.length] = {
        id: Date.now(),
        segments: [],
        color: currentColor,
        penWidth: currentWidth,
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
          {paths.map((p) => (
            <Path
              key={p.id}
              path={p.segments.join(" ")}
              strokeWidth={p.penWidth}
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
  },
});
