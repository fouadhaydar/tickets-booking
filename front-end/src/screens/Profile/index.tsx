import { Text, View } from "react-native";
import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomeBtn from "../../components/CustomeBtn";
import {
  Avatar,
  Container,
  ContainerView,
  StyledText,
  StyledView,
  SafeAreaViewStyled,
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
    <SafeAreaViewStyled>
      <Container className="h-full justify-end gap-y-[100px] w-[90%] mx-auto">
        <ContainerView className="items-center">
          <ContainerView className="items-center w-full justify-center gap-5">
            <Avatar>
              <Ionicons name="person" size={24} color={"gray"} />
            </Avatar>
            <View style={{ gap: 5 }}>
              <StyledText class="text-[20px] font-bold">User Name</StyledText>
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
    </SafeAreaViewStyled>
  );
};

export default Profile;
