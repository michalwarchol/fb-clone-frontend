import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { setStoriesInterval } from "../../utils/setStoriesInterval";

interface Props {
  text: string;
  gradient: string;
  font: string;
  activeUserStory: number | null;
  setActiveUserStory: React.Dispatch<React.SetStateAction<number | null>>;
  displayed: number;
  setDisplayed: React.Dispatch<React.SetStateAction<number>>;
  time: number;
  storiesLength: number;
  nextActiveUser: number;
  previousActiveUser: number;
}

const TextStory: React.FC<Props> = ({
  text,
  gradient,
  font,
  activeUserStory,
  setActiveUserStory,
  displayed,
  setDisplayed,
  time,
  storiesLength,
  nextActiveUser,
  previousActiveUser,
}) => {
  const [passedTime, setPassedTime] = useState<number>(0);
  let initialMount = useRef(true);

  setStoriesInterval(
    activeUserStory,
    setActiveUserStory,
    time,
    displayed,
    setPassedTime,
    storiesLength,
    setDisplayed,
    initialMount,
    nextActiveUser,
    previousActiveUser
  );

  const makeScrubbers = (time: number, passed: number) => {
    let scrubberWidth = Math.floor(100 / storiesLength);
    let scrubbers = [];
    for (let i = 0; i < storiesLength; i++) {
      if (i < displayed) {
        scrubbers.push(
          <Box
            w={scrubberWidth + "%"}
            h="10px"
            bg="rgba(255,255,255,0.3)"
            key={i}
          >
            <Box bg="white" w="100%" h="100%"></Box>
          </Box>
        );
      } else if (i > displayed) {
        scrubbers.push(
          <Box
            w={scrubberWidth + "%"}
            h="10px"
            bg="rgba(255,255,255,0.3)"
            key={i}
          >
            <Box bg="transparent" w="100%" h="100%"></Box>
          </Box>
        );
      } else {
        let width = (100 / time) * passed;
        scrubbers.push(
          <Box
            w={scrubberWidth + "%"}
            h="10px"
            bg="rgba(255,255,255,0.3)"
            key={i}
          >
            <Box bg="white" w={width + "%"} h="100%"></Box>
          </Box>
        );
      }
    }
    return (
      <Flex
        w="100%"
        justify="space-between"
        position="absolute"
        zIndex={99}
        pt="68px"
        top="0"
      >
        {scrubbers}
      </Flex>
    );
  };

  return (
    <Flex
      align="center"
      justify="center"
      fontSize="26px"
      w="100%"
      h="100%"
      bg="red"
      fontFamily={font}
      bgGradient={gradient}
      borderRadius="10px"
      position="relative"
    >
      {makeScrubbers(time, passedTime)}
      <Text textAlign="center" zIndex={98}>
        {text}
      </Text>
    </Flex>
  );
};
export default TextStory;
