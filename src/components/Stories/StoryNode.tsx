import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { Story, useGetImageQuery } from "../../generated/graphql";

interface Props {
  story: {
    story: Story;
    length: number;
  };
  isActive: boolean;
  setActiveUserStory: React.Dispatch<React.SetStateAction<number | null>>;
}

const StoryNode: React.FC<Props> = ({
  story,
  isActive,
  setActiveUserStory,
}) => {
  const [{ data: avatar }] = useGetImageQuery({
    variables: { imageId: story.story.creator.avatarId },
  });

  const handleClick = () => {
    setActiveUserStory(story.story.creator._id);
  };

  return (
    <Flex
      p="8px"
      bg={isActive ? "hover" : "transparent"}
      _hover={{ bg: "hover", cursor: "pointer" }}
      borderRadius="8px"
      align="center"
      onClick={handleClick}
    >
      <Flex
        w="60px"
        h="60px"
        mr="10px"
        p="3px"
        borderWidth="2px"
        borderColor="active"
        borderRadius="50%"
        overflow="hidden"
        justify="center"
        align="center"
      >
        <Image
          m="3px"
          w="100%"
          h="100%"
          borderRadius="50%"
          objectFit="cover"
          src={avatar?.getImage}
          fallbackSrc="https://gravatar.com/avatar/43484bed7620ffc1fec5d482af33bfae?s=400&d=mp&r=x"
        />
      </Flex>
      <Box>
        <Text fontWeight="bold">{story.story.creator.username}</Text>
        <Text color="active">{story.length} new</Text>
      </Box>
    </Flex>
  );
};
export default StoryNode;
