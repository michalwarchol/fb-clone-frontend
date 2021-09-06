import { Avatar } from "@chakra-ui/avatar";
import { Button, IconButton } from "@chakra-ui/button";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { FullUser, useCreateStoryMutation } from "../../generated/graphql";
import ChooseStory from "./ChooseStory";
import Options from "./Options";
import Preview from "./Preview";
import NextLink from "next/link";
import Icon from "@chakra-ui/icon";
import { FaFacebookF } from "react-icons/fa";
import { useRouter } from "next/router";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";

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

  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [, createStory] = useCreateStoryMutation();

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      setStoryType("photo");
    }
  }, [uploadedImage]);

  const submitStory = async () => {
    let input={};
    if(storyType=="text"){
      input={
        text,
        font,
        gradient
      }
    }
    await createStory({input, image: uploadedImage })
  }

  return (
    <Flex h="100vh" w="100vw" color="textPrimary">
      <Flex
        w="360px"
        bg="secondary"
        borderRight="1px"
        borderColor="hover"
        direction="column"
      >
        <Flex px="10px" py="10px" shadow="0 0 1px black">
          <IconButton
            aria-label="close"
            icon={<MdClose />}
            variant="basic"
            borderRadius="50%"
            bg="primary"
            w="46px"
            h="46px"
            fontSize="30px"
            onClick={() => router.replace("/")}
          />
          <NextLink href="/">
            <Flex align="center" h="100%">
              <Icon
                as={FaFacebookF}
                cursor="pointer"
                background="active"
                borderRadius="50%"
                color="white"
                pt="10px"
                fontSize="46px"
                ml="8px"
              />
            </Flex>
          </NextLink>
        </Flex>
        <Box py="30px" borderBottom="1px" borderColor="hover" px="10px">
          <Heading fontSize="28px">Your Story</Heading>
          <Flex align="center" mt="20px">
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

        {storyType != null && (
          <Flex mt="auto" p="10px" w="100%">
            <Button
              variant="basic"
              bg="tertiary"
              w="50%"
              mr="10px"
              onClick={onOpen}
            >
              Discard
            </Button>
            <Button variant="active" bg="active" color="textSecondary" w="100%" loadingText="sharing..." onClick={submitStory}>
              Share to Story
            </Button>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent background="secondary" color="textPrimary">
                <ModalHeader>Discard Story?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Are you sure you want to discard this story? Your story won't
                  be saved.
                </ModalBody>
                <ModalFooter>
                  <Button variant="basic" color="active" mr="10px" onClick={onClose}>
                    Continue Editing
                  </Button>
                  <Button
                    variant="active"
                    color="textSecondary"
                    bg="active"
                    onClick={() => {
                      setStoryType(null);
                      setText("");
                      setFont("Courier New");
                      setGradient("linear(to-r, green.200, pink.500)");
                      onClose();
                    }}
                  >
                    Discard
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        )}
      </Flex>
      <Flex w="100%" bg="primary" justify="center" align="center">
        {storyType == null && (
          <ChooseStory
            setStoryType={setStoryType}
            setUploadedImage={setUploadedImage}
          />
        )}
        {storyType == "text" && (
          <Preview text={text} gradient={gradient} font={font} />
        )}
        {storyType == "photo" && <Preview image={uploadedImage} />}
      </Flex>
    </Flex>
  );
};
export default Body;
