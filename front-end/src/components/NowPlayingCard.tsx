import React, { FC } from "react";
import { PressableStyeld, StyledText, StyledView } from "../StyledComponents";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/NavigationType";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "../hooks/Data";
import { Image } from "react-native";

type NowPlayingCardNavigationProp = StackNavigationProp<RootStackParamList>;

type NowPlayingType = {
  Movie: Movie;
  closeModal?: () => void;
};
const NowPlayingCard: FC<NowPlayingType> = ({ Movie, closeModal }) => {
  const { navigate } = useNavigation<NowPlayingCardNavigationProp>();

  const baseImagePath = (size: string, path: string) => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  const handlePress = (id: string) => {
    navigate("details", { id });
    if (closeModal) {
      closeModal();
    }
  };

  return (
    <PressableStyeld
      className="max-w-[400px] border-solid border-gray-500 rounded-2xl border-[1px]"
      onPress={() => handlePress(Movie.id.toString())}
      style={{
        overflow: "hidden",
      }}
    >
      <Image
        source={{ uri: baseImagePath("w780", Movie.poster_path) }}
        style={{ width: 350, height: 350 }}
      />
      <StyledView className="p-3" style={{ rowGap: 8 }}>
        <StyledText class="text-xl font-bold">{Movie.title}</StyledText>
        <StyledText class="text-[14px] text-gray-500">
          {/* 2h29m • Action, adventure, sci-fi */}
          Release Date: {Movie.release_date}
        </StyledText>
        <StyledText>Rating: {Movie.vote_average} / 10</StyledText>
        <StyledText class="text-[14px] text-gray-500">
          Voter Numbers:{Movie.vote_count}
        </StyledText>
      </StyledView>
    </PressableStyeld>
  );
};

export default NowPlayingCard;
