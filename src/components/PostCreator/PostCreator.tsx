import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FullUser } from "../../generated/graphql";
import { MdPhotoLibrary, MdTagFaces } from "react-icons/md";
import PostCreatorModal from "./PostCreatorModal";
import { FaUserTag } from "react-icons/fa";

interface Props {
  loggedUser: FullUser;
}

const PostCreator: React.FC<Props> = ({ loggedUser }) => {
  const [stage, setStage] = useState<string>("basic");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const ref = useRef<HTMLInputElement>();
  const initialMount = useRef(true);

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      onOpen();
    }
  }, [uploadedImage]);
  return (
    <Box bg="secondary" p="10px" borderRadius="8px" mb="20px" w="100%" w-min="">
      <Flex align="center">
        <Avatar src={loggedUser.avatarImage} />
        <Button
          borderRadius="20px"
          bg="tertiary"
          _hover={{ backgroundColor: "hover" }}
          _active={{ backgroundColor: "hover" }}
          w="100%"
          ml="10px"
          onClick={onOpen}
        >
          <Text textAlign="left" w="100%">
            What's on your mind, {loggedUser && loggedUser.user.username}?
          </Text>
        </Button>
      </Flex>
      <Divider orientation="horizontal" mt={5} mb={5} borderColor="gray.400" />
      <Flex color="textPrimary" justify="space-between">
        <FormControl w="33%">
          <FormLabel textAlign="center" mx="4px">
            <Button
              leftIcon={<MdPhotoLibrary />}
              variant="basic"
              color="green.300"
              mr="4px"
              w="100%"
              onClick={() => {
                ref.current.value = null;
                ref.current.click();
              }}
            >
              <Text color="textPrimary">Photo/Video</Text>
            </Button>
          </FormLabel>
          <InputGroup display="none">
            <Input
              type="file"
              accept="image/png, image/jpeg"
              ref={ref}
              onChange={(e) => setUploadedImage(e.target.files[0])}
            />
          </InputGroup>
        </FormControl>
        <Button
          leftIcon={<FaUserTag />}
          variant="basic"
          mx="4px"
          w="33%"
          color="blue.500"
          onClick={() => {
            setStage("tag");
            onOpen();
          }}
        >
          <Text color="textPrimary">Tag People</Text>
        </Button>
        <Button
          leftIcon={<MdTagFaces />}
          variant="basic"
          mx="4px"
          w="33%"
          color="yellow.400"
          onClick={() => {
            setStage("activity");
            onOpen();
          }}
        >
          <Text color="textPrimary">Feeling/Activity</Text>
        </Button>
      </Flex>

      <PostCreatorModal
        isOpen={isOpen}
        onClose={onClose}
        user={loggedUser}
        stage={stage}
        setStage={setStage}
        img={uploadedImage}
        setImg={setUploadedImage}
      />
    </Box>
  );
};
export default PostCreator;
