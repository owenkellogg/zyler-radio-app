import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BarIndicator } from 'react-native-indicators';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

import { RootStackParamList } from '../routes/types.route';
import colorsStyle from '../styles/colors.style';
import Text from '../components/Text.component';
import Pressable from '../components/Pressable.component';
import { showAlert, StatusEnum } from '../utils/global.util';
import { language } from '../languages';
import metricsStyle from '../styles/metrics.style';

type MainNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
type MainRouteProp = RouteProp<RootStackParamList, 'Main'>;
type MainProps = { navigation: MainNavigationProp; route: MainRouteProp };

export default function MainScreen({ navigation, route }: MainProps) {
  const {
    radioName,
    radioStream,
    radioImageUrl,
    radioInstagram,
    radioFacebook,
    radioTwitter,
  } = route.params;
  const { main } = language;

  const [status, setStatus] = useState(StatusEnum.STOPPED as StatusEnum);
  const [sound, setSound] = useState({} as Audio.Sound);

  const handleBackButton = () => {
    return true; // OVERRIDE BACK BUTTON EVENTO PADRAO
  };

  useFocusEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton
    );
    return () => subscription.remove();
  });

  useEffect(() => {
    async function setAudio() {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });
    }
    setAudio();
    return sound.unloadAsync != null
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    setStatus(StatusEnum.BUFFERING);
    const { sound } = await Audio.Sound.createAsync({ uri: radioStream });
    setSound(sound);
    setStatus(StatusEnum.PLAYING);
    await sound.playAsync();
  };

  const stopSound = async () => {
    if (sound.unloadAsync != null) {
      sound.unloadAsync();
      setStatus(StatusEnum.STOPPED);
    }
  };

  const onPressAction = async () => {
    if (status === StatusEnum.STOPPED || status === StatusEnum.PAUSED) {
      playSound();
    } else if (status === StatusEnum.PLAYING) {
      stopSound();
    }
  };

  const onPressSocial = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        showAlert(navigation, main.socialErrorTitle, main.socialErrorMessage);
      } else {
        Linking.openURL(url);
      }
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorsStyle.greys[4],
      justifyContent: 'center',
      alignItems: 'center',
    },
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      height:
        metricsStyle.height +
        (StatusBar.currentHeight != null ? StatusBar.currentHeight : 0),
      width: metricsStyle.width,
    },
    text: {
      fontSize: 32,
      color: colorsStyle.greys[0],
    },
    image: {
      marginTop: 24,
      height: 200,
      width: 200,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: colorsStyle.greys[0],
    },
    button: {
      paddingLeft: status === StatusEnum.BUFFERING ? 0 : 4,
      marginTop: 24,
      height: 80,
      width: 80,
      backgroundColor: colorsStyle.absolutes.transparent,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
      borderWidth: 4,
      borderColor: colorsStyle.greys[0],
    },
    statusText: {
      marginTop: 24,
      fontSize: 16,
      color: colorsStyle.greys[0],
    },
    barsContainer: {
      position: 'absolute',
      bottom: -22,
    },
    indicator: {
      flex: 0,
    },
    socialContainer: {
      marginTop: 24,
      height: 36,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    socialIconContainer: {
      marginHorizontal: 4,
      height: 36,
      width: 36,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          colorsStyle.absolutes.black,
          colorsStyle.absolutes.transparent,
        ]}
        style={styles.gradient}
        start={{ x: 0, y: 0.05 }}
        end={{ x: 0, y: 0.45 }}
      />
      <LinearGradient
        colors={[colorsStyle.absolutes.transparent, colorsStyle.greys[3]]}
        style={styles.gradient}
        start={{ x: 0, y: 0.9 }}
        end={{ x: 0, y: 1.3 }}
      />
      <Text style={styles.text}>{radioName}</Text>
      <Image
        style={styles.image}
        source={{ uri: radioImageUrl }}
        resizeMode="contain"
      />
      <Pressable
        onPress={onPressAction}
        style={styles.button}
        disabled={status === StatusEnum.BUFFERING}
      >
        {(status === StatusEnum.STOPPED || status === StatusEnum.PAUSED) && (
          <Ionicons name="play" size={48} color={colorsStyle.greys[0]} />
        )}
        {status === StatusEnum.PLAYING && (
          <Ionicons name="pause" size={48} color={colorsStyle.greys[0]} />
        )}
        {status === StatusEnum.BUFFERING && (
          <ActivityIndicator size="large" color={colorsStyle.greys[0]} />
        )}
      </Pressable>
      <Text style={styles.statusText}>
        {status === StatusEnum.STOPPED
          ? main.stopped
          : status === StatusEnum.PAUSED
          ? main.paused
          : status === StatusEnum.BUFFERING
          ? main.buffering
          : main.playing}
      </Text>
      {status === StatusEnum.PLAYING && (
        <View style={styles.barsContainer}>
          <BarIndicator
            color={colorsStyle.greys[0]}
            count={5}
            size={44}
            style={styles.indicator}
          />
        </View>
      )}
      <View style={styles.socialContainer}>
        {radioInstagram != null && (
          <Pressable
            style={styles.socialIconContainer}
            onPress={() => onPressSocial(radioInstagram)}
          >
            <Ionicons
              name="logo-instagram"
              size={32}
              color={colorsStyle.greys[0]}
            />
          </Pressable>
        )}
        {radioFacebook != null && (
          <Pressable
            style={styles.socialIconContainer}
            onPress={() => onPressSocial(radioFacebook)}
          >
            <Ionicons
              name="logo-facebook"
              size={32}
              color={colorsStyle.greys[0]}
            />
          </Pressable>
        )}
        {radioTwitter != null && (
          <Pressable
            style={styles.socialIconContainer}
            onPress={() => onPressSocial(radioTwitter)}
          >
            <Ionicons
              name="logo-twitter"
              size={32}
              color={colorsStyle.greys[0]}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
