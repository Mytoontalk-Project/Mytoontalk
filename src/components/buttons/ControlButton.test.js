import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ControlButton from "./ControlButton";

describe("ControlButton", () => {
  it("calls onPress and currentModal functions when button is pressed with label argument", () => {
    const label = "Test Label";
    const onPressMock = jest.fn();
    const currentModalMock = jest.fn();

    const { getByText } = render(
      <ControlButton
        label={label}
        onPress={onPressMock}
        currentModal={currentModalMock}
      />,
    );

    const button = getByText(label);
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
    expect(currentModalMock).toHaveBeenCalledWith(label);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls onPress function when button is pressed without currentModal", () => {
    const label = "Test Label";
    const onPressMock = jest.fn();

    const { getByText } = render(
      <ControlButton label={label} onPress={onPressMock} />,
    );

    const button = getByText(label);
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });
});
