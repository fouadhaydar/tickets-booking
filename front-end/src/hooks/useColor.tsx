import { useColorScheme } from "nativewind";
import { theme } from "src/screens/Profile/color";

export const useColor = () => {
  const { colorScheme } = useColorScheme();
  const { backgroundColor, btnColor, btnTextColor, iconColor, textColor } =
    theme(colorScheme);
  return { backgroundColor, btnColor, btnTextColor, iconColor, textColor };
};
