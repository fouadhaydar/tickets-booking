import { SafeAreaProvider } from "react-native-safe-area-context";
import RootStackNavigator from "src/Navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <RootStackNavigator />
    </SafeAreaProvider>
  );
}
