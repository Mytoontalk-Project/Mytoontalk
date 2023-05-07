import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import store from "../../store/configureStore";
import CircleListModal from "./CircleListModal";
import AudioButton from "../buttons/AudioButton";

describe("CircleListModal test", () => {
  const mockData = {
    title: "Test Title",
    isShowModal: true,
    setIsShowModal: jest.fn(),
  };
  const mockDispatch = jest.fn();
  const mockUseSelector = jest.fn();
  const mockHandlePlayAudio = jest.fn();

  jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
    useSelector: (selector) => mockUseSelector(selector),
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should be rendered correctly", () => {
    mockUseSelector.mockReturnValue({
      audioData: [
        {
          sound: {
            replayAsync: jest.fn(),
            setOnPlaybackStatusUpdate: jest.fn(),
          },
        },
        {
          sound: {
            replayAsync: jest.fn(),
            setOnPlaybackStatusUpdate: jest.fn(),
          },
        },
      ],
    });

    const { getByText } = render(
      <Provider store={store}>
        <CircleListModal {...mockData} />
      </Provider>,
    );

    expect(getByText(mockData.title)).toBeTruthy();
    expect(mockUseSelector().audioData.length).toEqual(2);
  });

  it("closes modal when close button is pressed", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CircleListModal {...mockData} />
      </Provider>,
    );
    const closeButton = getByTestId("close-button");
    fireEvent.press(closeButton);

    expect(mockData.setIsShowModal).toHaveBeenCalledWith(false);
  });
});