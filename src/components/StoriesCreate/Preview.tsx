import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

interface Props {
  text?: string;
  font?: string;
  gradient?: string;
  image?: File;
}

const Preview: React.FC<Props> = ({ text, gradient, font, image }) => {
  return (
    <Flex
      bg="secondary"
      maxW="972px"
      w="90%"
      p="20px"
      direction="column"
      borderRadius="8px"
      display={{ base: "none", md: "flex" }}
    >
      <Text pb="10px" fontWeight="bold">
        Preview
      </Text>
      <Flex
        alignSelf="center"
        w="99%"
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
          borderWidth="1px"
          borderColor="hover"
          bgGradient={gradient ? gradient : undefined}
          align="center"
          justify="center"
        >
          {image ? (
              <Image src={URL.createObjectURL(image)} objectFit="cover" w="100%" h="100%" />
          ) : (
            <Text
              fontFamily={font}
              fontSize="30px"
              w="100%"
              wordBreak="break-word"
              textAlign="center"
            >
              {!!text ? text : "START TYPING"}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Preview;
