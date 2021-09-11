import Icon from "@chakra-ui/icon";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { BsPlus } from "react-icons/bs";
import NextLink from "next/link";
import { Story } from "../../generated/graphql";
import StoryNode from "./StoryNode";

interface Props {
  activeUserStory: number | null;
  setActiveUserStory: React.Dispatch<React.SetStateAction<number | null>>;
  stories: {
    story: Story;
    length: number;
  }[];
}

const StoriesBar: React.FC<Props> = ({
  activeUserStory,
  setActiveUserStory,
  stories
}) => {
  

  return (
    <Box
      w="360px"
      h="100vh"
      position="fixed"
      left="0"
      pt="12px"
      px="16px"
      bg="secondary"
    >
      <Box mb="40px">
        <Text fontWeight="bold" fontSize="28px">
          Stories
        </Text>
      </Box>
      <Box>
        <Text fontSize="18px" fontWeight="500">
          Your Story
        </Text>
        <NextLink href="/stories/create">
          <Flex my="20px" align="center" cursor="pointer">
            <Icon
              as={BsPlus}
              bg="hover"
              fontSize="60px"
              p="10px"
              borderRadius="50%"
              color="active"
              mr="10px"
            />
            <Box>
              <Text fontWeight="bold">Create a Story</Text>
              <Text color="gray" fontSize="13px">
                Share a photo or write something.
              </Text>
            </Box>
          </Flex>
        </NextLink>
      </Box>
      <Box>
        <Text fontWeight="bold">All Stories</Text>
        <Box>
          {stories?.map((elem) => (
            <StoryNode
              story={elem}
              isActive={activeUserStory == elem.story.creator._id}
              setActiveUserStory={setActiveUserStory}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default StoriesBar;
