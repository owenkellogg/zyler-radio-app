type AppType = {
  loading: string;
};

type AlertType = {
  close: string;
};

type MainType = {
  stopped: string;
  paused: string;
  buffering: string;
  playing: string;
  socialErrorTitle: string;
  socialErrorMessage: string;
};

export type LanguageType = {
  app: AppType;
  alert: AlertType;
  main: MainType;
};
