import { IconButton } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/Io";

interface Props {
  setActiveUserStory: React.Dispatch<React.SetStateAction<number | null>>;
  stories: JSX.Element[];
  nextActiveUser: number|null;
  previousActiveUser: number|null;
  displayed: number;
  setDisplayed: React.Dispatch<React.SetStateAction<number>>;
}

const StoryDisplay: React.FC<Props> = ({
  setActiveUserStory,
  stories,
  nextActiveUser,
  previousActiveUser,
  displayed,
  setDisplayed
}) => {
  const goBack = () => {
    if (displayed == 0) {
      setDisplayed(0);
      setActiveUserStory(previousActiveUser);
    } else {
      setDisplayed(displayed - 1);
    }
  };

  const goForward = () => {
    if (displayed + 1 >= stories.length) {
      setDisplayed(0);
      setActiveUserStory(nextActiveUser);
    } else {
      setDisplayed(displayed + 1);
    }
  };
  return (
    <Flex
      pl="360px"
      align="center"
      justify="center"
      w="100%"
      h="100%"
      bg="black"
    >
      <Box w="70px">
      {(displayed==0 && !previousActiveUser) ? null : (
        <IconButton
          aria-label="back"
          icon={<IoIosArrowBack />}
          variant="basic"
          borderRadius="50%"
          fontSize="30px"
          w="60px"
          h="60px"
          mr="10px"
          onClick={goBack}
        />
      )}
      </Box>
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
          {stories[displayed]}
        </Flex>
      </Flex>
      <Box w="70px">
      {(!nextActiveUser && displayed + 1 >= stories.length) ? null : (
        <IconButton
          aria-label="forward"
          icon={<IoIosArrowForward />}
          variant="basic"
          borderRadius="50%"
          fontSize="30px"
          w="60px"
          h="60px"
          ml="10px"
          onClick={goForward}
        />
      )}
      </Box>
    </Flex>
  );
};
export default StoryDisplay;
