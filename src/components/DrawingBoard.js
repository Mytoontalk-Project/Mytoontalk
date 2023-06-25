import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Canvas, Path } from "@shopify/react-native-skia";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrentPage,
  selectCurrentTool,
  selectEraserColor,
  selectEraserWidth,
  selectImagePage,
  selectPenColor,
  selectPenWidth,
  setPagePath,
} from "../store/feature/drawingBoardSlice";

export default function DrawingBoard({ canvasRef }) {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const pagePaths = useSelector(selectImagePage)[currentPage].drawingData;
  const [paths, setPaths] = useState(pagePaths);
  const currentTool = useSelector(selectCurrentTool);
  const penColor = useSelector(selectPenColor);
  const penWidth = useSelector(selectPenWidth);
  const eraserColor = useSelector(selectEraserColor);
  const eraserWidth = useSelector(selectEraserWidth);

  useEffect(() => {
    setPaths(pagePaths);
  }, [currentPage, pagePaths]);

  const pan = Gesture.Pan()
    .onStart((g) => {
      const { currentColor, currentWidth } =
        currentTool === "pen"
          ? { currentColor: penColor, currentWidth: penWidth }
          : { currentColor: eraserColor, currentWidth: eraserWidth };

      setPaths(prevPaths => [
        ...prevPaths,
        {
          segments: [`M ${g.x} ${g.y}`],
          color: currentColor,
          penWidth: currentWidth,
        }
      ]);
    })
    .onUpdate((g) => {
      setPaths(prevPaths => {
        const updatedPaths = [...prevPaths];
        const lastIndex = updatedPaths.length - 1;
        if (updatedPaths[lastIndex]?.segments) {
          updatedPaths[lastIndex].segments.push(`L ${g.x} ${g.y}`);
        }
        return updatedPaths;
      });
    })
    .onEnd(() => {
      dispatch(setPagePath({ currentPage, paths }));
    })
    .minDistance(1);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <Canvas style={styles.canvas} ref={canvasRef}>
          {paths?.map((p, i) => (
            <Path
              key={`page${currentPage}${i}path`}
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
