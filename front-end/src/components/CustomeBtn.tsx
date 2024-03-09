import React, { FC } from "react";
import { PressableStyeld, StyledText } from "../StyledComponents";
import { useColor } from "src/hooks/useColor";

type CustomeBtnTypes = {
  title: string;
  handlePress: () => void;
};

const CustomeBtn: FC<CustomeBtnTypes> = ({ title, handlePress }) => {
  const { btnColor, btnTextColor } = useColor();
  return (
    <PressableStyeld
      className="justify-center items-center rounded-full px-4 py-5"
      onPress={handlePress}
      style={{ backgroundColor: btnColor }}
    >
      <StyledText class={`font-bold text-[14px] ${btnTextColor}`}>
        {title}
      </StyledText>
    </PressableStyeld>
  );
};

export default CustomeBtn;
