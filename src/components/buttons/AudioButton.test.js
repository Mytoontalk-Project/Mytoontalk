import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import AudioButton from "./AudioButton";

describe("AudioButton test", () => {
  const label = "Play";
  const onPressMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display the label prop and call onPress prop when the button is pressed", () => {
    const { getByText } = render(
      <AudioButton label={label} onPress={onPressMock} />,
    );

    const buttonLabel = getByText(label);
    expect(buttonLabel).toBeDefined();

    const button = getByText(label);
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });
});
