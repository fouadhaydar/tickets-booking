import React, { FC } from "react";
import { PressableStyeld, StyledText } from "../StyledComponents";

type CustomeBtnTypes = {
  title: string;
  handlePress: () => void;
};

const CustomeBtn: FC<CustomeBtnTypes> = ({ title, handlePress }) => {
  return (
    <PressableStyeld
      className="bg-black justify-center items-center rounded-full px-4 py-5"
      onPress={handlePress}
    >
      <StyledText className="text-white font-bold text-[14px]">
        {title}
      </StyledText>
    </PressableStyeld>
  );
};

export default CustomeBtn;
