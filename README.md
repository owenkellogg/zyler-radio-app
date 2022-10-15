# SingleRadioTemplateExpo

Single radio template expo react native app.

## Tech

React Native 0.69.4  
Expo ~46.0.7  
Typescript ~4.3.5  
React Navigation 6.x

## Setup

npm install -g expo-cli  
npm install -g eas-cli

## BuildYourApp

You must create your build profile on https://expo.dev/

npx eas-cli build --platform [os] --profile [profile]

[os] = android | ios  
[profile] = production | preview | devicePreview | development (according to eas.json file)

## UploadYourApp

npx eas-cli submit -p [os]

[os] = android | ios
