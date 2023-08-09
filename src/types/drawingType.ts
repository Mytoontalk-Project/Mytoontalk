export interface DrawingData {
  [key: string]: string | number;
}

export interface DrawingPage {
  drawingData: DrawingData[];
  redoData: DrawingData[];
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
  page: {
    [pageNumber: number]: DrawingPage;
  };
}
