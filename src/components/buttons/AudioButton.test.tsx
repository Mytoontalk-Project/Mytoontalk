import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import AudioButton from "./AudioButton";

describe("AudioButton test", () => {
  const buttonIndex: number = 1;
  const onPressMock = jest.fn();

  it("should display the label prop and call onPress prop when the button is pressed", () => {
    const { getByText } = render(
      <AudioButton buttonIndex={buttonIndex} onPress={onPressMock} />,
    );

    const buttonLabel = getByText(String(buttonIndex));
    expect(buttonLabel).toBeDefined();

    const button = getByText(String(buttonIndex));
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
