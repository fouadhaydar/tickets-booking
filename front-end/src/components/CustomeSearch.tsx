import React, { FC } from "react";
import { StyledView, TextInputStyled } from "../StyledComponents";
import { Ionicons } from "@expo/vector-icons";
import { useColor } from "src/hooks/useColor";

const CustomeInput: FC<{ icon: "search" }> = ({ icon }) => {
  const { iconColor } = useColor();
  return (
    <StyledView className="rounded-full w-full border-[1px] border-solid border-gray-500 px-4 py-4 text-[16px] flex flex-row justify-between">
      <TextInputStyled className="w-[90%] h-full mr-auto" />
      <Ionicons name={icon} color={iconColor} size={24} />
    </StyledView>
  );
};

export default CustomeInput;
