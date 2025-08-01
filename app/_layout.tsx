import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { GlobalListProvider } from '@/global/GlobalListProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalListProvider>
      <Stack >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="searchmusic" options={{ headerShown: false }} />
        <Stack.Screen name="addlinks" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
     <StatusBar style="dark" />
    </GlobalListProvider>
  );
}

