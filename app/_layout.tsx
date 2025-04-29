import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import './globals.css'

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
    <StatusBar hidden={true}/>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: 'Movies' }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}