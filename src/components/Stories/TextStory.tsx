import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useRef, useState } from "react";
import { IoIosPause, IoIosPlay } from "react-icons/Io";
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
  nextActiveUser
}) => {
  const [passedTime, setPassedTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
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
    isPaused
  );

  const makeScrubbers = (time: number, passed: number) => {
    
    let scrubberWidth = Math.floor(100 / storiesLength-1);
    let scrubbers = [];
    let scrubberStyles = {
      w: scrubberWidth + "%",
      h: "6px",
      bg: "rgba(255,255,255,0.3)",
      borderRadius: "2px"
    }
    for (let i = 0; i < storiesLength; i++) {
      if (i < displayed) {
        scrubbers.push(
          <Box
            {...scrubberStyles}
            key={i}
          >
            <Box bg="white" w="100%" h="100%" borderRadius="2px"></Box>
          </Box>
        );
      } else if (i > displayed) {
        scrubbers.push(
          <Box
          {...scrubberStyles}
            key={i}
          >
            <Box bg="transparent" w="100%" h="100%" borderRadius="2px"></Box>
          </Box>
        );
      } else {
        let width = (100 / time) * passed;
        scrubbers.push(
          <Box
          {...scrubberStyles}
            key={i}
          >
            <Box bg="white" w={width + "%"} h="100%" borderRadius="2px"></Box>
          </Box>
        );
      }
    }
    return (
      <Flex w="100%" justify={scrubbers.length<=1 ? "center" : "space-between"}>
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
      <Flex
        w="96%"
        position="absolute"
        zIndex={99}
        pt="10px"
        top="0"
      >
      {makeScrubbers(time, passedTime)}
      <Flex>
        <IconButton aria-label="pause" icon={isPaused ? <IoIosPlay /> :<IoIosPause />} onClick={()=>setIsPaused(!isPaused)} />
      </Flex>
      </Flex>
      <Text textAlign="center" zIndex={98}>
        {text}
      </Text>
    </Flex>
  );
};
export default TextStory;
