import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React, { useMemo, useRef, useState } from "react";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import { Story, useGetImageQuery } from "../../generated/graphql";
import { base64ToObjectURL } from "../../utils/base64ToObjectURL";
import { setStoriesInterval } from "../../utils/setStoriesInterval";

interface Props {
  story: Story;
  activeUserStory: number | null;
  setActiveUserStory: React.Dispatch<React.SetStateAction<number | null>>;
  displayed: number;
  setDisplayed: React.Dispatch<React.SetStateAction<number>>;
  time: number;
  storiesLength: number;
  nextActiveUser: number;
}

const TextStory: React.FC<Props> = ({
  story,
  activeUserStory,
  setActiveUserStory,
  displayed,
  setDisplayed,
  time,
  storiesLength,
  nextActiveUser,
}) => {
  const [passedTime, setPassedTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [{ data: image }] = useGetImageQuery({
    variables: { imageId: story.imageId },
    pause: !story.imageId,
  });
  const [{ data }] = useGetImageQuery({
    variables: { imageId: story.creator.avatarId },
  });
  let initialMount = useRef(true);

  const avatar = useMemo(()=>base64ToObjectURL(data?.getImage), [data]);
  const storyImage = useMemo(()=>base64ToObjectURL(image?.getImage), [image]);

  setStoriesInterval(
    activeUserStory,
    setActiveUserStory,
    time,
    displayed,
    passedTime,
    setPassedTime,
    storiesLength,
    setDisplayed,
    initialMount,
    nextActiveUser,
    isPaused
  );

  const makeScrubbers = (time: number, passed: number) => {
    let scrubberWidth = Math.floor(100 / storiesLength - 1);
    let scrubbers = [];
    let scrubberStyles = {
      w: scrubberWidth + "%",
      h: "6px",
      bg: "rgba(255,255,255,0.3)",
      borderRadius: "2px",
    };
    for (let i = 0; i < storiesLength; i++) {
      if (i < displayed) {
        scrubbers.push(
          <Box {...scrubberStyles} key={i}>
            <Box bg="white" w="100%" h="100%" borderRadius="2px"></Box>
          </Box>
        );
      } else if (i > displayed) {
        scrubbers.push(
          <Box {...scrubberStyles} key={i}>
            <Box bg="transparent" w="100%" h="100%" borderRadius="2px"></Box>
          </Box>
        );
      } else {
        let width = (100 / time) * passed;
        scrubbers.push(
          <Box {...scrubberStyles} key={i}>
            <Box bg="white" w={width + "%"} h="100%" borderRadius="2px"></Box>
          </Box>
        );
      }
    }
    return (
      <Flex
        w="100%"
        justify={scrubbers.length <= 1 ? "center" : "space-between"}
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
      bgGradient={story.gradient}
      borderRadius="10px"
      overflow="hidden"
      position="relative"
    >
      <Flex
        w="96%"
        position="absolute"
        zIndex={99}
        pt="10px"
        top="0"
        direction="column"
      >
        <Flex w="100%">{makeScrubbers(time, passedTime)}</Flex>
        <Flex mt="10px" justify="space-between" align="center">
          <Flex align="center">
            <Box mr="10px">
              <Avatar
                src={avatar}
              />
            </Box>
            <Text fontSize="20px" fontWeight="bold">
              {story.creator.username}
            </Text>
          </Flex>
          <IconButton
            aria-label="pause"
            icon={isPaused ? <IoIosPlay /> : <IoIosPause />}
            onClick={() => setIsPaused(!isPaused)}
            color="white"
            bg="transparent"
            borderRadius="50%"
            _hover={{ backgroundColor: "transparent" }}
          />
        </Flex>
      </Flex>

      {!!story?.imageId ? (
        <Image
          src={storyImage}
          objectFit="cover"
          w="100%"
          h="100%"
          fallback={
            <Flex w="100%" h="100%" justify="center" align="center">
              <Spinner color="active" size="lg" />
            </Flex>
          }
        />
      ) : (
        <Text textAlign="center" zIndex={98} fontFamily={story.font}>
          {story.text}
        </Text>
      )}
    </Flex>
  );
};
export default TextStory;
