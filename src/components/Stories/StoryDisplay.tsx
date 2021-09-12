import { Box, Flex } from "@chakra-ui/layout";
import React from "react";

interface Props {
  activeUserStory: number | null;
  setActiveUserStory: React.Dispatch<React.SetStateAction<number | null>>;
  stories: JSX.Element[];
  nextActiveUser: number;
  displayed: number;
  setDisplayed: React.Dispatch<React.SetStateAction<number>>;
  time: number;
}

const StoryDisplay: React.FC<Props> = ({
  activeUserStory,
  setActiveUserStory,
  stories,
  nextActiveUser,
  displayed,
  setDisplayed,
  time,
}) => {
  
  return (
    <Flex
      pl="360px"
      align="center"
      justify="center"
      w="100%"
      h="100%"
      bg="black"
    >
      <Flex w="505px" h="96%">
        <Flex
          justify="center"
          align="center"
          direction="column"
          h="100%"
          w="100%"
          bg="black"
          pt="68px"
        >
          {stories![displayed]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default StoryDisplay;
