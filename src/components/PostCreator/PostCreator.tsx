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
import {
  RegularUserFragment,
  useLoggedUserQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { MdPhotoLibrary, MdTagFaces } from "react-icons/md";
import PostCreatorModal from "./PostCreatorModal";

const PostCreator: React.FC = () => {
  const [{ data, fetching }] = useLoggedUserQuery({
    pause: isServer,
  });
  const [user, setUser] = useState<RegularUserFragment | null>(null);
  const [stage, setStage] = useState<string>("basic");
  const [uploadedImage, setUploadedImage] = useState<File|null>(null);

  const ref = useRef<HTMLInputElement>();
  const initialMount = useRef(true);

  const { isOpen, onClose, onOpen } = useDisclosure();
  useEffect(() => {
    if (!fetching) {
      if (data?.loggedUser) {
        setUser(data.loggedUser);
      }
    }
  }, [data]);

  useEffect(()=>{
    if(initialMount.current){
      initialMount.current=false;
    }else{
      onOpen();
    }
    
  }, [uploadedImage])
  return (
    <Box bg="secondary" p="10px" borderRadius="8px">
      <Flex align="center">
        <Avatar />
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
            What's on your mind, {user && user.username}?
          </Text>
        </Button>
      </Flex>
      <Divider orientation="horizontal" mt={5} mb={5} borderColor="gray.400" />
      <Flex color="textPrimary">
        <FormControl w="50%">
          <FormLabel textAlign="center">
            <Button
              leftIcon={<MdPhotoLibrary />}
              variant="basic"
              color="green.300"
              mr="4px"
              w="100%"
              onClick={()=>{
                ref.current.value=null;
                ref.current.click();
              }}
            >
              <Text color="textPrimary">Photo/Video</Text>
            </Button>
          </FormLabel>
          <InputGroup display="none">
            <Input
              type="file"
              accept="image/png"
              ref={ref}
              onChange={(e)=>setUploadedImage(e.target.files[0])}
            />
          </InputGroup>
        </FormControl>

        <Button
          leftIcon={<MdTagFaces />}
          variant="basic"
          w="50%"
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
        user={user}
        stage={stage}
        setStage={setStage}
        img={uploadedImage}
        setImg={setUploadedImage}
      />
    </Box>
  );
};
export default PostCreator;
