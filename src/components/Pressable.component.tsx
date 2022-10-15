import React from 'react';
import {
  Pressable as PressableReactNative,
  PressableProps,
} from 'react-native';

import colorsStyle from '../styles/colors.style';

const Pressable = (props: PressableProps) => {
  return (
    <PressableReactNative
      android_ripple={{
        color: colorsStyle.opacity.white25,
        borderless: false,
        radius: 18,
      }}
      {...props}
    >
      {props.children}
    </PressableReactNative>
  );
};

export default Pressable;
