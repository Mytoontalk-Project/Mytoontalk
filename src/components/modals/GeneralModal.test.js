import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import GeneralModal from "./GeneralModal";

describe("GeneralModal", () => {
  it("calls handlePress when title is '주의사항'", () => {
    const handlePress = jest.fn();
    const mockNavigation = {
      navigate: jest.fn(),
    };
    const { getByText } = render(
      <NavigationContainer>
        <GeneralModal
          title="주의사항"
          description="읽어주세요"
          isShowModal
          setIsShowModal={() => {}}
          navigation={mockNavigation}
          buttonText="저장"
          handlePress={handlePress}
        />
      </NavigationContainer>,
    );

    const button = getByText("저장");
    fireEvent.press(button);

    expect(handlePress).toHaveBeenCalled();
  });
});
