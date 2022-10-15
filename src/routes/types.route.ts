export type RootStackParamList = {
  Main: {
    radioName: string;
    radioStream: string;
    radioImageUrl: string;
    radioInstagram: string | undefined;
    radioFacebook: string | undefined;
    radioTwitter: string | undefined;
  };
  Alert: { title: string; message: string };
};
