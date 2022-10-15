import React from 'react';
import {
  Platform,
  StyleSheet,
  Text as TextReactNative,
  TextProps,
} from 'react-native';

import colorsStyle from '../styles/colors.style';

const Text = (props: TextProps) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: 12,
      color: colorsStyle.greys[4],
      textAlign: 'center',
      fontFamily: 'Tajawal_400Regular',
    },
  });

  return (
    <TextReactNative
      style={[styles.text, props.style]}
      allowFontScaling={false}
    >
      {props.children}
    </TextReactNative>
  );
};

export default Text;
