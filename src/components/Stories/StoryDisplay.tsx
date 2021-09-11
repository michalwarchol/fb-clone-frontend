import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { IoMdPhotos } from "react-icons/Io";
import { Story, useGetImageQuery } from "../../generated/graphql";
import ImageStory from "./ImageStory";
import TextStory from "./TextStory";

interface Props {
  activeUserStory: number | null;
  setActiveUserStory: React.Dispatch<React.SetStateAction<number | null>>;
  stories: Story[];
}

const StoryDisplay: React.FC<Props> = ({
  activeUserStory,
  setActiveUserStory,
  stories,
}) => {
  const [displayed, setDisplayed] = useState<number>(0);
  const makeStory = () => {
    if (!!stories[displayed].imageId) {
      return (
        <ImageStory imageId={stories[displayed].imageId} />
      );
    }else{
        return <TextStory text={stories[displayed].text} font={stories[displayed].font} gradient={stories[displayed].gradient} />
    }
  };

  let body;
  if (activeUserStory == null) {
    body = (
      <Flex justify="center" align="center" direction="column" h="100%">
        <Icon as={IoMdPhotos} fontSize="100px" />
        <Text fontWeight="bold" fontSize="22px">
          Select a story to open.
        </Text>
      </Flex>
    );
  } else {
    body = (
      <Flex
        justify="center"
        align="center"
        direction="column"
        h="100%"
        w="100%"
        bg="black"
        pt="68px"
      >
          {makeStory()}
      </Flex>
    );
  }
  return (
    <Flex pl="360px" align="center" justify="center" w="100%" h="100%">
      {body}
    </Flex>
  );
};
export default StoryDisplay;
