import { Image, ScrollView } from "react-native";
import { FC } from "react";
import {
  Container,
  SafeAreaViewStyled,
  StyledText,
  StyledView,
} from "../../StyledComponents";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigation/NavigationType";
import { RouteProp } from "@react-navigation/native";
import ReviewCard from "./components/ReviewCard";
import CustomeBtn from "../../components/CustomeBtn";
import { useFetchData } from "src/hooks/useFetchMovies";
import { Credits, MovieDetail } from "src/hooks/Data";
import { REACT_APP_API_BASE_URL } from "@env";
import { baseImagePath } from "src/utils/util";
import { FlatList } from "react-native-gesture-handler";
import CrewCard from "./components/CastCard";

type DetailsCardNavigationProp = StackNavigationProp<RootStackParamList>;
// to get access of the route from react navigation
type DetailsScreenRoutProp = RouteProp<RootStackParamList, "details">;

type DetailsType = {
  navigation: DetailsCardNavigationProp;
  route: DetailsScreenRoutProp;
};
const Details: FC<DetailsType> = ({ navigation, route }) => {
  const { data, isError } = useFetchData<MovieDetail>(
    `${REACT_APP_API_BASE_URL}/movie/${route.params.id}?language=en-US`,
    `Details-${route.params.id}`
  );
  const {
    data: crewAndCast,
    isError: noCrew,
    isFetched: crewFetched,
  } = useFetchData<Credits>(
    `${REACT_APP_API_BASE_URL}/movie/${route.params.id}/credits?language=en-US`,
    `cast&crew-${route.params.id}`
  );
  let sortedCrewAndCast;
  if (crewAndCast && crewFetched) {
    sortedCrewAndCast = [...crewAndCast.cast];
    sortedCrewAndCast.sort((a, b) => b.popularity - a.popularity);
  }

  if (isError) {
    return (
      <SafeAreaViewStyled>
        <StyledText>Some error was append</StyledText>
      </SafeAreaViewStyled>
    );
  } else {
    const ReviewData = {
      title: data?.title || "",
      time: data?.runtime || 0,
      date: data?.release_date || "",
      voteCount: data?.vote_count || "",
      review: data?.vote_average || "No Review Yet",
      trailerUrl: data?.video || "",
    };
    return (
      <SafeAreaViewStyled>
        <ScrollView>
          <StyledView>
            <StyledView>
              <Image
                source={{
                  uri: baseImagePath("w780", data?.poster_path || ""),
                }}
                style={{
                  width: "100%",
                  height: 500,
                }}
              />
            </StyledView>
          </StyledView>
          <Container className="gap-y-5 mt-[24px]">
            <ReviewCard {...ReviewData} />
            <StyledView
              style={{
                rowGap: 4,
              }}
            >
              <StyledView
                className="flex-row"
                style={{
                  rowGap: 4,
                }}
              >
                <StyledText class="font-bold">Movie Genre: </StyledText>
                {data?.genres.map((genre, index) => {
                  return (
                    <StyledText class="text-gray-700" key={genre.id}>
                      {genre.name}
                      {index !== data.genres.length - 1 ? "," : "."}
                    </StyledText>
                  );
                })}
              </StyledView>
              <StyledText class="text-gray-700 font-bold">
                Censorship:{" "}
                <StyledText class="font-bold text-black "> 13 + </StyledText>
              </StyledText>
              <StyledText class="font-bold text-blackflex-row">
                Spoken Languages:{" "}
                {data?.spoken_languages.map((lan, index) => (
                  <StyledText class=" font-normal text-gray-700" key={lan.name}>
                    {" "}
                    {lan.name}
                    {index !== data.spoken_languages.length - 1 ? "," : "."}
                  </StyledText>
                ))}
              </StyledText>
            </StyledView>
            <StyledView className="gap-y-2">
              <StyledText class="font-bold text-xl">Overview</StyledText>
              <StyledText>{data?.overview}</StyledText>
            </StyledView>
            <StyledView className="gap-y-2">
              <StyledText class="font-bold text-xl">
                Top Popular Cast
              </StyledText>
              {crewAndCast && (
                <FlatList
                  data={sortedCrewAndCast?.slice(0, 5)}
                  renderItem={({ item }) => {
                    return (
                      <CrewCard
                        profile_path={item.profile_path}
                        name={item.name}
                      />
                    );
                  }}
                  initialNumToRender={10}
                  horizontal={true}
                  keyExtractor={(item) => item.name}
                  showsHorizontalScrollIndicator={false}
                />
              )}
            </StyledView>
            <StyledView className="gap-y-2">
              <StyledText class="font-bold text-xl">Directores</StyledText>
              <StyledView>
                {crewAndCast && (
                  <FlatList
                    data={crewAndCast.crew}
                    renderItem={({ item }) => {
                      if (item.job.includes("Director"))
                        return (
                          <CrewCard
                            profile_path={item.profile_path}
                            name={item.name}
                            job={item.job}
                          />
                        );
                      else return <></>;
                    }}
                    initialNumToRender={10}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.name.concat(item.job)}
                  />
                )}
              </StyledView>
            </StyledView>
            <StyledView>
              <CustomeBtn
                title={"Select a Seat"}
                handlePress={() => {
                  navigation.navigate("selectSeats", { id: route.params.id });
                }}
              />
            </StyledView>
          </Container>
        </ScrollView>
      </SafeAreaViewStyled>
    );
  }
};

export default Details;
