import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

interface Props {
  text: string;
  font: string;
  gradient: string;
}

const Preview: React.FC<Props> = ({ text, gradient, font }) => {
  return (
    <Flex
      bg="secondary"
      maxW="972px"
      w="90%"
      p="20px"
      direction="column"
      borderRadius="8px"
    >
      <Text pb="10px" fontWeight="bold">
        Preview
      </Text>
      <Flex
        w="96%"
        bg="primary"
        justify="center"
        borderRadius="8px"
        borderWidth="1px"
        borderColor="hover"
      >
        <Flex
          h="790px"
          w="420px"
          my="12px"
          borderRadius="8px"
          bgGradient={gradient}
          align="center"
          justify="center"
        >
          <Text
            fontFamily={font}
            fontSize="30px"
            w="100%"
            wordBreak="break-word"
            textAlign="center"
          >
            {!!text ? text : "START TYPING"}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Preview;
