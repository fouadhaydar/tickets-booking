import { Text, View, SafeAreaView } from "react-native";
import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomeBtn from "../../components/CustomeBtn";
import {
  Avatar,
  Container,
  ContainerView,
  StyledView,
} from "../../StyledComponents";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigation/NavigationType";
import ProfileSection from "./components/ProfileSection";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type ProfileType = {
  navigation: ProfileScreenNavigationProp;
};

const Profile: FC<ProfileType> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <Container className="h-full justify-end gap-y-[100px] w-[90%] mx-auto">
        <ContainerView className="items-center">
          <ContainerView className="items-center w-full justify-center gap-5">
            <Avatar>
              <Ionicons name="person" size={24} color="black" />
            </Avatar>
            <View style={{ gap: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {" "}
                {"User Name"}
              </Text>
            </View>
          </ContainerView>
        </ContainerView>
        <StyledView
          style={{
            gap: 50,
          }}
          className="justify-start items-center"
        >
          <ProfileSection
            title={"Tickets"}
            iconName={"cart"}
            navigate={() => {
              navigation.navigate("tickets");
            }}
          />
          <StyledView className="px-5 w-full">
            <StyledView className="h-[1px] w-full bg-gray-300" />
          </StyledView>
          <ProfileSection title={"Toggle Mode"} iconName={"settings"} dark />
          <StyledView className="px-5 w-full">
            <StyledView className="h-[1px] w-full bg-gray-300" />
          </StyledView>
        </StyledView>
        {
          <StyledView>
            <CustomeBtn title="Sign In With TMDB" handlePress={() => {}} />
          </StyledView>
        }
      </Container>
    </SafeAreaView>
  );
};

export default Profile;
