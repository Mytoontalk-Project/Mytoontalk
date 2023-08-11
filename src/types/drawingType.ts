export interface DrawingSegment {
  color: string;
  penWidth: number;
  segments: string[];
};

export interface DrawingPage {
  drawingData: DrawingSegment[];
  redoData: DrawingSegment[];
  base64File: string;
}

export interface DrawingBoardData {
  title: string;
  titleList: string[];
  currentPage: number;
  currentTool: string;
  pen: {
    width: number;
    color: string;
  };
  eraser: {
    width: number;
    color: string;
  };
  page: Record<number, DrawingPage>
}
