import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Tajawal_200ExtraLight,
  Tajawal_300Light,
  Tajawal_400Regular,
  Tajawal_500Medium,
  Tajawal_700Bold,
  Tajawal_800ExtraBold,
  Tajawal_900Black,
} from '@expo-google-fonts/tajawal';
import { Asset } from 'expo-asset';

import colorsStyle from './src/styles/colors.style';
import Navigation from './src/routes';
import Text from './src/components/Text.component';
import { language } from './src/languages';
import { LOGO_IMAGE_URL } from './src/utils/constants.util';

export default function App() {
  const { app } = language;

  let [fontsLoaded] = useFonts({
    Tajawal_200ExtraLight,
    Tajawal_300Light,
    Tajawal_400Regular,
    Tajawal_500Medium,
    Tajawal_700Bold,
    Tajawal_800ExtraBold,
    Tajawal_900Black,
  });

  let [appReady, setAppReady] = useState(false);

  let cacheResources = () => {
    const images: string[] = [LOGO_IMAGE_URL];
    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };

  useEffect(() => {
    const loadResources = async () => {
      await cacheResources();
      if (fontsLoaded) {
        setAppReady(true);
      }
    };
    loadResources();
  }, [fontsLoaded]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorsStyle.greys[4],
    },
    splashContainer: {
      flex: 1,
      backgroundColor: colorsStyle.greys[4],
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      marginTop: 12,
      fontSize: 16,
      color: colorsStyle.greys[0],
    },
  });

  return (
    <SafeAreaProvider>
      <StatusBar hidden={true} style="dark" backgroundColor={colorsStyle.absolutes.black} />
      {appReady ? (
        <View style={styles.container}>
          <Navigation />
        </View>
      ) : (
        <View style={styles.splashContainer}>
          <ActivityIndicator size="large" color={colorsStyle.greys[0]} />
          <Text style={styles.text}>{app.loading}</Text>
        </View>
      )}
    </SafeAreaProvider>
  );
}
