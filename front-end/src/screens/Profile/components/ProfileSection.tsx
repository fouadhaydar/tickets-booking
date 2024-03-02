import { Pressable, View } from "react-native";
import React, { FC } from "react";
import { styled, useColorScheme } from "nativewind";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { StyledText, StyledView } from "../../../StyledComponents";

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
  return (
    <ContainerPressable
      className="justify-between px-5 gap-5 w-full"
      onPress={navigate}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Ionicons name={iconName} size={24} color="black" />
        <StyledText className="text-base font-bold">{title}</StyledText>
      </View>
      {!dark ? (
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      ) : (
        <MaterialIcons
          name={`${colorScheme === "dark" ? "dark-mode" : "light-mode"}`}
          size={24}
          color="black"
          onPress={toggleColorScheme}
        />
      )}
    </ContainerPressable>
  );
};

export default ProfileSection;
