import React, { FC, useEffect } from "react";
import { useColorScheme } from "nativewind";
import { Container, StyledText, StyledView } from "../../StyledComponents";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  RootStackParamList,
  RootTabParamsLits,
} from "../../Navigation/NavigationType";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, SafeAreaView, ScrollView, Text } from "react-native";
import CustomeInput from "../../components/CustomeSearch";
import SectionHeader from "../../components/SectionHeader";
import NowPlayingCard from "../../components/NowPlayingCard";
import MovieCard from "../../components/MovieCard";
import { useFetchData } from "../../hooks/useFetchMovies";
import { Platform } from "react-native";
import { REACT_APP_API_BASE_URL } from "@env";
import { Data } from "src/hooks/Data";

type HomeScreenNavigationProp =
  | StackNavigationProp<RootStackParamList>
  | BottomTabNavigationProp<RootTabParamsLits>;

type HomeType = {
  navigation: HomeScreenNavigationProp;
};

const Home: FC<HomeType> = ({ navigation }) => {
  const { data, isFetching, isError, isFetched, refetch } = useFetchData<Data>(
    `${REACT_APP_API_BASE_URL}/movie/now_playing?language=en-US&page=1`,
    "Now playing"
  );
  const {
    data: upcomming,
    isFetching: isfetching,
    isError: iserror,
    isFetched: isfetched,
    refetch: refetchUpcomming,
  } = useFetchData<Data>(
    `${REACT_APP_API_BASE_URL}/movie/upcoming?language=en-US&page=1`,
    "upcomming"
  );
  if (data?.results?.length === 0) {
    console.log(data?.results?.length);
    refetch();
  }
  if (upcomming?.results?.length === 0) {
    refetchUpcomming();
  }
  if (isFetching) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  if (isError) {
    return (
      <SafeAreaView>
        <Text>Error</Text>
      </SafeAreaView>
    );
  }

  if (isFetched) {
    return (
      <SafeAreaView
        style={{
          marginTop: Platform.OS === "android" ? 50 : 0,
        }}
      >
        <ScrollView>
          <Container className="flex flex-row justify-between items-end">
            <StyledView className="pt-3">
              <StyledText>Hi, User</StyledText>
              <StyledText className="text-3xl font-bold">
                Welcome Back
              </StyledText>
            </StyledView>
            <StyledView>
              <Ionicons
                name="notifications"
                size={30}
                color="black"
                style={{ marginBottom: 5 }}
              />
            </StyledView>
          </Container>
          <Container>
            <CustomeInput icon="search" />
          </Container>
          <SectionHeader
            title={"Now Playing"}
            handlePress={() => {
              const nav =
                navigation as BottomTabNavigationProp<RootTabParamsLits>;
              nav.navigate("movies");
            }}
          />
          <StyledView className="w-[90%] mx-auto mb-5">
            {data?.results && (
              <FlatList
                data={data.results!.splice(0, 10)}
                renderItem={(movie) => <NowPlayingCard Movie={movie.item} />}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                  <StyledView style={{ width: 15 }} />
                )}
              />
            )}
          </StyledView>
          <SectionHeader
            title={"Comming Soon"}
            handlePress={() => {
              const nav =
                navigation as BottomTabNavigationProp<RootTabParamsLits>;
              nav.navigate("movies", { comingSoon: true });
            }}
          />
          <StyledView className="w-[90%] mx-auto">
            {upcomming?.results && (
              <FlatList
                data={upcomming.results!.splice(0, 10)}
                renderItem={(movie) => (
                  <MovieCard id={movie.item.id.toString()} Movie={movie.item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                  <StyledView style={{ width: 15 }} />
                )}
              />
            )}
          </StyledView>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default Home;
