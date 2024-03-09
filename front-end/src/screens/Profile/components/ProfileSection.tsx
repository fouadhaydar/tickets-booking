import { Pressable } from "react-native";
import React, { FC } from "react";
import { styled, useColorScheme } from "nativewind";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { StyledText, StyledView } from "../../../StyledComponents";
import { useColor } from "src/hooks/useColor";
const ContainerPressable = styled(Pressable, "flex flex-row");

type ProfileSectionTypes = {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  dark?: boolean;
  navigate?: () => void;
};

const ProfileSection: FC<ProfileSectionTypes> = ({
  title,
  iconName,
  dark,
  navigate,
}) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { iconColor } = useColor();

  return (
    <ContainerPressable
      className="justify-between px-5 gap-5 w-full"
      onPress={navigate}
    >
      <StyledView
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
      >
        <Ionicons name={iconName} size={24} color={iconColor} />
        <StyledText class="text-base font-bold dark:text-white">
          {title}
        </StyledText>
      </StyledView>
      {!dark ? (
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color={iconColor}
        />
      ) : (
        <MaterialIcons
          name={`${colorScheme === "dark" ? "dark-mode" : "light-mode"}`}
          size={24}
          color={iconColor}
          onPress={toggleColorScheme}
        />
      )}
    </ContainerPressable>
  );
};

export default ProfileSection;
