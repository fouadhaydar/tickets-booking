import { FlatList } from "react-native-gesture-handler";
import React, { FC } from "react";
import {
  PressableStyeld,
  StyledText,
  StyledView,
} from "../../../StyledComponents";
import { Ionicons } from "@expo/vector-icons";
import { hoursAndMinutes } from "src/utils/util";

type ReviewCardType = {
  title: string;
  time: number;
  date: string;
  review: number | string;
  voteCount: number | string;
};

const ReviewCard: FC<ReviewCardType> = ({
  title,
  time,
  date,
  review,
  voteCount,
}) => {
  const { hours, minutes } = hoursAndMinutes(time);
  return (
    <StyledView className="bg-gray-500 rounded-lg p-3">
      <StyledText className="font-bold text-lg text-white">{title}</StyledText>
      <StyledText className="text-sm text-gray-100">
        {hours}h {minutes}m {date}
      </StyledText>
      <StyledView>
        <StyledView className="flex-row items-center gap-1 mt-3">
          <StyledText className="text-sm text-gray-100">
            Review {review} / 10
          </StyledText>
        </StyledView>
        <StyledText className="text-sm text-gray-100">
          Vote Count: {voteCount}
        </StyledText>
      </StyledView>
      <StyledView className="flex-row items-end mt-3">
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          renderItem={() => {
            return (
              <Ionicons
                name="star-outline"
                color={"yellow"}
                size={24}
                style={{ marginHorizontal: 2 }}
              />
            );
          }}
          horizontal
        />
        {/* <PressableStyeld className="flex-row gap-x-1 items-center border-[1px] border-solid border-[white] rounded-sm p-2">
          <Ionicons name="play" color={"white"} size={18} />
          <StyledText className="text-white">Watch Trailer</StyledText>
        </PressableStyeld> */}
      </StyledView>
    </StyledView>
  );
};

export default ReviewCard;
