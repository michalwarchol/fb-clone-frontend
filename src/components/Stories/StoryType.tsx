import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { IconType } from "react-icons/lib";

interface Props {
  text: string;
  MyIcon: IconType;
  bg: string;
  onClick: React.Dispatch<React.SetStateAction<"photo" | "text">>;
  type: "photo" | "text";
}

const StoryType: React.FC<Props> = ({ text, MyIcon, bg, onClick, type }) => {
  return (
    <Flex
      w="218px"
      h="330px"
      bg="red"
      borderRadius="8px"
      direction="column"
      align="center"
      justify="center"
      cursor="pointer"
      bgGradient={bg}
      _hover={{ filter: "brightness(115%)" }}
      onClick={() => onClick(type)}
    >
      <Icon
        as={MyIcon}
        bg="primary"
        borderRadius="50%"
        px="10px"
        w="44px"
        h="44px"
        color="white"
        fontSize="30px"
        shadow="0 1px 3px white"
      />
      <Text color="textSecondary">{text}</Text>
    </Flex>
  );
};
export default StoryType;
