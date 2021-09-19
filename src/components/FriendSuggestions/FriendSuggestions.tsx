import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/Io";
import { useGetSuggestedFriendsQuery } from "../../generated/graphql";
import Suggestion from "./Suggestion";

const FriendSuggestions: React.FC = () => {
  const [slide, setSlide] = useState<number>(0);

  const [{ data }] = useGetSuggestedFriendsQuery();
  let a = 0;
  if (data) {
    a = data?.getSuggestedFriends.length - 4;
  }
  return (
    <Box
      bg="secondary"
      borderRadius="8px"
      mb="20px"
      position="relative"
    >
      {slide > 0 && (
        <IconButton
          aria-label="forward"
          position="absolute"
          icon={<IoIosArrowBack />}
          variant="basic"
          borderRadius="50%"
          fontSize="30px"
          w="60px"
          h="60px"
          left="-40px"
          top="50%"
          ml="10px"
          zIndex="11"
          onClick={() => setSlide(slide - 180)}
        />
      )}
      {slide / 180 <= a && (
        <IconButton
          aria-label="forward"
          position="absolute"
          icon={<IoIosArrowForward />}
          variant="basic"
          borderRadius="50%"
          fontSize="30px"
          w="60px"
          h="60px"
          right="-30px"
          top="50%"
          ml="10px"
          zIndex="11"
          onClick={() => setSlide(slide + 180)}
        />
      )}
      <Box mb="10px" p="10px">
        <Text fontSize="24px" fontWeight="bold">
          People You May Know
        </Text>
      </Box>
      <Box overflow="hidden">
        <Flex
          wrap="nowrap"
          zIndex="10"
          transform={"translateX(" + -slide + "px)"}
          transition="transform 0.6s ease-in-out"
        >
          {data?.getSuggestedFriends.map((friend, index) => (
            <Suggestion friend={friend} key={index} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
export default FriendSuggestions;
