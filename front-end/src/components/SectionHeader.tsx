import React, { FC } from "react";
import {
  Container,
  PressableStyeld,
  StyledText,
  StyledView,
} from "../StyledComponents";
import { MaterialIcons } from "@expo/vector-icons";

type SectionHeaderType = {
  title: string;
  handlePress: () => void;
};
const SectionHeader: FC<SectionHeaderType> = ({ title, handlePress }) => {
  return (
    <Container className="flex-row justify-between items-end">
      <StyledText className="text-2xl font-bold">{title}</StyledText>
      <PressableStyeld
        className="flex-row justify-center items-center gap-x-1"
        onPress={handlePress}
      >
        <StyledText className="text-[16px]">See All</StyledText>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </PressableStyeld>
    </Container>
  );
};

export default SectionHeader;
