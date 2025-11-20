import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Launch app on signup screen */}
      <Stack.Screen name="signup" options={{ headerShown: false }} />

      {/* Login screen */}
      <Stack.Screen name="login" options={{ headerShown: false }} />

      {/* Tabs layout */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Optional modal */}
      <Stack.Screen name="modal" options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  );
}
