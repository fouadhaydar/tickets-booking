import React, { FC } from "react";
import {
  Container,
  PressableStyeld,
  StyledText,
  StyledView,
} from "../StyledComponents";
import { MaterialIcons } from "@expo/vector-icons";
import { useColor } from "src/hooks/useColor";

type SectionHeaderType = {
  title: string;
  handlePress: () => void;
};
const SectionHeader: FC<SectionHeaderType> = ({ title, handlePress }) => {
  const { iconColor } = useColor();
  return (
    <Container className="flex-row justify-between items-end">
      <StyledText class="text-2xl font-bold">{title}</StyledText>
      <PressableStyeld
        className="flex-row justify-center items-center gap-x-1"
        onPress={handlePress}
      >
        <StyledText class="text-[16px]">See All</StyledText>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color={iconColor}
        />
      </PressableStyeld>
    </Container>
  );
};

export default SectionHeader;
