import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  image: JSX.Element;
  text: string;
  link: string;
}

const PageButton: React.FC<Props> = ({ image, text, link }) => {
  const router = useRouter();

  return (
    <Button
      w="100%"
      h="52px"
      variant="basic"
      bg="transparent"
      onClick={() => {
        router.push(link);
      }}
    >
      <Flex align="center" justify="flex-start" w="100%">
        <Box mr="10px">{image}</Box>
        <Text>{text}</Text>
      </Flex>
    </Button>
  );
};
export default PageButton;
