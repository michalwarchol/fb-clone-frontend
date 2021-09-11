import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

interface Props {
  text: string;
  gradient: string;
  font: string;
}

const TextStory: React.FC<Props> = ({ text, gradient, font }) => {
  return (
    <Flex
      align="center"
      justify="center"
      fontSize="26px"
      w="505px"
      h="96%"
      bg="red"
      fontFamily={font}
      bgGradient={gradient}
      borderRadius="10px"
    >
      <Text textAlign="center">{text}</Text>
    </Flex>
  );
};
export default TextStory;
