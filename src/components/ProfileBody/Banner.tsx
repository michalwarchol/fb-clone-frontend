import {
  Flex,
  Box,
  Avatar,
  FormControl,
  FormLabel,
  IconButton,
  InputGroup,
  Input,
  Button,
  Image,
  Text
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useUploadUserImageMutation } from "../../generated/graphql";

interface Props {
  editable: boolean;
  avatarImage: string;
  bannerImage: string;
}

const Banner: React.FC<Props> = ({ editable, avatarImage, bannerImage }) => {
  const [, uploadUserImage] = useUploadUserImageMutation();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [avatarOrBanner, setAvatarOrBanner] = useState<"avatar" | "banner">(
    "avatar"
  );
  const ref = useRef<HTMLInputElement>();
  const bannerRef = useRef<HTMLInputElement>();
  const initialRef = useRef(true);

  useEffect(() => {
    async function uploadAvatar() {
      await uploadUserImage({
        image: uploadedImage,
        avatarOrBanner,
      });
    }
    if (initialRef.current) {
      initialRef.current = false;
    } else {
      uploadAvatar();
    }
  }, [uploadedImage]);

  return (
    <Flex position="relative" justify="center" w={{ base: "100%", lg: "940px" }}>
      <Avatar size="2xl" src={avatarImage} zIndex="90" position="absolute" bottom="-20px"/>
      {editable && <FormControl position="absolute" bottom="-20px" left="53%" zIndex="90" w="60px">
            <FormLabel textAlign="center">
              <IconButton
                aria-label="photo"
                icon={<FaCamera />}
                bg="tertiary"
                borderRadius="50%"
                variant="basic"
                onClick={() => {
                  ref.current.value = null;
                  ref.current.click();
                }}
              />
            </FormLabel>
            <InputGroup display="none">
              <Input
                type="file"
                accept="image/png, image/jpeg"
                placeholder="filesss"
                ref={ref}
                onChange={(e) => {
                  setAvatarOrBanner("avatar");
                  setUploadedImage(e.target.files[0]);
                }}
              />
            </InputGroup>
          </FormControl>}
      <Flex
        boxShadow="inset 0 -40px 80px -80px black"
        w="100%"
        h={{base: "180px", lg: "300px"}}
        justify="center"
        align="flex-end"
        borderRadius="0 0 10px 10px"
        position="relative"
        overflow="hidden"
        Index="88"
      >
        <Image src={bannerImage} position="absolute" />
        <Box position="relative" bottom="-10px">
          
        </Box>
        {editable && <FormControl
          w="50%"
          position="absolute"
          right="20px"
          bottom="10px"
          display="flex"
          justifyContent="flex-end"
        >
          <FormLabel textAlign="center">
            <Button
              leftIcon={<FaCamera />}
              iconSpacing={{base: "0", lg: "8px"}}
              color="primary"
              onClick={() => {
                bannerRef.current.value = null;
                bannerRef.current.click();
              }}
            >
              <Text display={{base: "none", lg: "block"}}>Add Cover Photo</Text>
            </Button>
          </FormLabel>
          <InputGroup display="none">
            <Input
              type="file"
              accept="image/png, image/jpeg"
              placeholder="filesss"
              ref={bannerRef}
              onChange={(e) => {
                setAvatarOrBanner("banner");
                setUploadedImage(e.target.files[0]);
              }}
            />
          </InputGroup>
        </FormControl>}
      </Flex>
      
    </Flex>
  );
};
export default Banner;
