import React, { FC, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { PressableStyeld, StyledText, StyledView } from "../StyledComponents";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamList,
  RootTabParamsLits,
} from "../Navigation/NavigationType";
import { useNavigation } from "@react-navigation/native";
import { baseImagePath } from "src/utils/util";
import { FlatList, Image } from "react-native";
import { Genres, Movie } from "../hooks/Data";
import { useFetchData } from "src/hooks/useFetchMovies";
import { REACT_APP_API_BASE_URL } from "@env";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useColor } from "src/hooks/useColor";

type MovieCardTypeNavigationProp =
  | StackNavigationProp<RootStackParamList>
  | BottomTabNavigationProp<RootTabParamsLits>;

type MovieCardType = {
  Movie: Movie;
  id: string;
};

const MovieCard: FC<MovieCardType> = ({ id, Movie }) => {
  const navigation = useNavigation<MovieCardTypeNavigationProp>();
  const [fav, setFav] = useState(false);
  const [genersNames, setGenersNames] = useState<string[]>([]);
  const { iconColor } = useColor();

  const { data: genres } = useFetchData<Genres>(
    `${REACT_APP_API_BASE_URL}/genre/movie/list?language=en`,
    "genres"
  );

  const handlePress = (id: string) => {
    const nav = navigation as StackNavigationProp<RootStackParamList>;
    nav.navigate("details", { id });
  };
  const getGenersNames = () => {
    let arr = [];
    const movieGeneresIds = Movie.genre_ids;
    const allGeners = genres!.genres;

    for (let i = 0; i < movieGeneresIds.length; i++) {
      for (let j = 0; j < allGeners.length; j++) {
        const genre = allGeners[j];

        if (genre.id == movieGeneresIds[i]) {
          arr.push(genre.name);
        }
      }
    }
    return arr;
  };
  useEffect(() => {
    if (Movie && genres) setGenersNames(() => getGenersNames());
  }, [genres, Movie]);

  return (
    <PressableStyeld
      className=" flex-1 mb-[15px] border-solid border-gray-500 rounded-2xl border-[1px] overflow-hidden"
      onPress={() => handlePress(id)}
      style={{
        position: "relative",
      }}
    >
      <Image
        source={{ uri: baseImagePath("w780", Movie.poster_path) }}
        style={{ width: 300, height: 300 }}
      />
      <Ionicons
        name={fav ? "heart" : "heart-outline"}
        size={24}
        color={"red"}
        style={{
          left: "85%",
          top: 20,
          position: "absolute",
        }}
        onPress={() => setFav((prev) => !prev)}
      />
      <StyledView
        className=" p-3 "
        style={{
          rowGap: 12,
        }}
      >
        <StyledText class="text-[14px] font-bold">{Movie.title}</StyledText>
        <StyledView
          className="flex-row items-center"
          style={{
            columnGap: 8,
          }}
        >
          <Ionicons name="calendar" size={14} color={iconColor} />
          <StyledText class="text-[12px] text-gray-500">
            {Movie.release_date}
          </StyledText>
        </StyledView>
        <StyledView className="flex-row">
          <StyledView
            className="flex-row items-start "
            style={{
              columnGap: 8,
            }}
          >
            <Ionicons name="videocam" size={16} color={iconColor} />
            {genersNames.length > 0 && (
              <FlatList
                data={genersNames}
                renderItem={({ item, index }) => (
                  <StyledText class="text-[14px] text-gray-500">
                    {item}
                    {index < genersNames.length - 1 ? ", " : "."}
                  </StyledText>
                )}
                keyExtractor={(item) => item}
                scrollEnabled={false}
                numColumns={4}
              />
            )}
          </StyledView>
        </StyledView>
      </StyledView>
    </PressableStyeld>
  );
};

export default MovieCard;
