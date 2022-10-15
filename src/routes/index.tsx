import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { RootStackParamList } from './types.route';
import AlertScreen from '../screens/Alert.screen';
import MainScreen from '../screens/Main.screen';
import {
  IS_STATION,
  RADIO_NAME,
  RADIO_STREAM_URL,
  LOGO_IMAGE_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  TWITTER_URL,
} from '../utils/constants.util';

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false, presentation: 'modal' }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureDirection: 'horizontal-inverted',
        }}
        initialParams={{
          radioName: IS_STATION ? undefined : RADIO_NAME,
          radioStream: IS_STATION ? undefined : RADIO_STREAM_URL,
          radioImageUrl: IS_STATION ? undefined : LOGO_IMAGE_URL,
          radioInstagram: IS_STATION ? undefined : INSTAGRAM_URL,
          radioFacebook: IS_STATION ? undefined : FACEBOOK_URL,
          radioTwitter: IS_STATION ? undefined : TWITTER_URL,
        }}
      />
      <Stack.Screen
        name="Alert"
        component={AlertScreen}
        options={{
          ...TransitionPresets.ModalFadeTransition,
          presentation: 'transparentModal',
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
