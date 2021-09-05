import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { FullUser } from "../../generated/graphql";
import ChooseStory from "./ChooseStory";
import Options from "./Options";
import Preview from "./Preview";

interface Props {
  user: FullUser;
}

const Body: React.FC<Props> = ({ user }) => {
  const [storyType, setStoryType] = useState<"photo" | "text" | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const initialMount = useRef(true);

  const [text, setText] = useState("");
  const [font, setFont] = useState("Courier New");
  const [gradient, setGradient] = useState("linear(to-r, green.200, pink.500)");

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      setStoryType("photo");
    }
  }, [uploadedImage]);

  return (
    <Flex h="100vh" w="100vw" color="textPrimary">
      <Box w="360px" bg="secondary" borderRight="1px" borderColor="hover">
        <Box py="30px" borderBottom="1px" borderColor="hover" px="10px">
          <Heading>Your Story</Heading>
          <Flex align="center">
            <Avatar src={user.avatarImage} mr="10px" size="lg" />
            <Text fontWeight="bold">{user.user.username}</Text>
          </Flex>
        </Box>
        {storyType == "text" && (
          <Options
            setText={setText}
            setGradient={setGradient}
            setFont={setFont}
          />
        )}
      </Box>
      <Flex w="80%" bg="primary" justify="center" align="center">
        {storyType == null && (
          <ChooseStory
            setStoryType={setStoryType}
            setUploadedImage={setUploadedImage}
          />
        )}
        {storyType == "text" && (
          <Preview text={text} gradient={gradient} font={font} />
        )}
      </Flex>
    </Flex>
  );
};
export default Body;
