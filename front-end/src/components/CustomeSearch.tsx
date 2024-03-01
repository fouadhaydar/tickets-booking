import React, { FC } from "react";
import { StyledView, TextInputStyled } from "../StyledComponents";
import { Ionicons } from "@expo/vector-icons";

const CustomeInput: FC<{ icon: "search" }> = ({ icon }) => {
  return (
    <StyledView className="rounded-full w-full border-[1px] border-solid px-4 py-4 text-[16px] flex flex-row justify-between">
      <TextInputStyled className="w-[90%] h-full mr-auto" />
      <Ionicons name={icon} color={"black"} size={24} />
    </StyledView>
  );
};

export default CustomeInput;
