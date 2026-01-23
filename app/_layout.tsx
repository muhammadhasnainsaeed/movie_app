import { Stack } from "expo-router";
import "react-native-reanimated";
import "./global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="movie/[id]"
        options={{
          headerShown: true,
          title: "Movie Details",
        }}
      />
    </Stack>
  );
}
