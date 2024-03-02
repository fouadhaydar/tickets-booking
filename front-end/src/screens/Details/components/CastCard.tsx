import { Image } from "react-native";
import React, { FC } from "react";
import { Avatar, StyledText, StyledView } from "src/StyledComponents";
import { baseImagePath } from "src/utils/util";
import { Ionicons } from "@expo/vector-icons";

type CrewCard = {
  profile_path: string | null;
  name: string;
  job?: string;
};

const CrewCard: FC<CrewCard> = ({ profile_path, name, job }) => {
  return (
    <StyledView className="border rounded-[20px] p-4 justify-center items-center mr-4 border-gray-500 flex-row">
      <Avatar>
        {profile_path != null ? (
          <Image
            source={{
              uri: baseImagePath("w780", profile_path || ""),
            }}
            style={{
              width: 75,
              height: 75,
            }}
          />
        ) : (
          <Ionicons name="person" size={32} color="gray" />
        )}
      </Avatar>
      <StyledView className="gap-y-1 px-2">
        <StyledText>{name}</StyledText>
        {job && <StyledText>{job}</StyledText>}
      </StyledView>
    </StyledView>
  );
};

export default CrewCard;
