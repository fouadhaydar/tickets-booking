import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootStackNavigator from "src/Navigation";

const queryClient = new QueryClient();

export default function App() {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaProvider>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      <QueryClientProvider client={queryClient}>
        <RootStackNavigator />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
