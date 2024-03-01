import { styled } from "nativewind";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export const PressableStyeld = styled(TouchableOpacity);
export const StyledText = styled(Text);
export const StyledView = styled(View);
export const Container = styled(View, "w-[90%] mx-auto mb-[24px]");
export const TextInputStyled = styled(TextInput);
export const ContainerView = styled(View, "flex flex-row");
export const Avatar = styled(
  View,
  "border-[1px] border-solid border-[black] rounded-full w-20 h-20 items-center justify-center"
);
