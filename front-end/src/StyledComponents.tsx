import { styled } from "nativewind";
import {
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FC, ReactNode } from "react";
import { useColor } from "./hooks/useColor";

type StyledTextType = { children: ReactNode; class?: string };

export const StyledText: FC<StyledTextType> = ({ children, class: style }) => {
  const { textColor } = useColor();
  const LocalStyledText = styled(Text, `${textColor}`);
  return <LocalStyledText className={style ?? ""}>{children}</LocalStyledText>;
};

export const SafeAreaViewStyled: FC<StyledTextType> = ({
  children,
  class: style,
}) => {
  const { backgroundColor } = useColor();
  const StyledSafeAreaView = styled(SafeAreaView, backgroundColor);
  return (
    <StyledSafeAreaView
      className={style}
      style={{
        width: "100%",
        height: "100%",
        marginTop: Platform.OS === "android" ? 50 : 0,
      }}
    >
      {children}
    </StyledSafeAreaView>
  );
};

export const PressableStyeld = styled(TouchableOpacity);
export const StyledView = styled(View);
export const Container = styled(View, "w-[90%] mx-auto mb-[24px]");
export const TextInputStyled = styled(TextInput);
export const ContainerView = styled(View, "flex flex-row");
export const Avatar = styled(
  View,
  "border-[1px] border-solid border-[black] rounded-full w-20 h-20 items-center justify-center overflow-hidden border-gray-500"
);
