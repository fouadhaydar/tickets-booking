export type RootStackParamList = {
  Main: undefined;
  tickets: undefined;
  details: { id: string };
  welcome: undefined;
  selectSeats: { id: string };
  stripe: undefined;
};

export type RootTabParamsLits = {
  home: undefined;
  movies: { comingSoon: boolean } | undefined;
  profile: undefined;
  favorites: undefined;
};
