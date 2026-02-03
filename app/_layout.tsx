import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
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
    </>
  );
}
