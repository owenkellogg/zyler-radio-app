import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../routes/types.route';

export const showAlert = (
  navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>,
  title: string,
  message: string
) => {
  navigation.navigate('Alert', {
    title,
    message,
  });
};

export enum StatusEnum {
  PLAYING = 'playing',
  PAUSED = 'paused',
  STOPPED = 'stopped',
  BUFFERING = 'buffering',
}

export const sleep = async (time: number) => {
  await new Promise((resolve) => setTimeout(resolve, time));
};
