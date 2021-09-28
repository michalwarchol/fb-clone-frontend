import {
  Avatar,
  Button,
  CircularProgress,
  CloseButton,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import React, { MutableRefObject, useRef } from "react";
import { FaUserTag } from "react-icons/fa";
import { MdPhotoLibrary, MdTagFaces } from "react-icons/md";
import { FullUser } from "../../generated/graphql";
import { base64ToObjectURL } from "../../utils/base64ToObjectURL";
import Image from "../Image";
import { FormProps } from "./PostCreatorModal";

interface Props {
  formikProps: FormikProps<FormProps>;
  loggedUser: FullUser;
  initialRef: MutableRefObject<any>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  img: File;
  setImg: React.Dispatch<React.SetStateAction<File>>;
  tagged: { _id: number; username: string }[];
}

const PostCreatorBasicStage: React.FC<Props> = ({
  formikProps,
  loggedUser,
  initialRef,
  setStage,
  img,
  setImg,
  tagged,
}) => {
  const ref = useRef<HTMLInputElement>();

  const handlePostStatus = () => {
    let text = loggedUser && loggedUser.user.username;
    if (
      !!formikProps.values.feeling ||
      !!formikProps.values.activity ||
      tagged.length > 0
    ) {
      text += " is ";
    }
    if (!!formikProps.values.feeling) {
      text += `feeling ${formikProps.values.feeling} `;
    }

    if (!!formikProps.values.activity) {
      text += `${formikProps.values.activity} `;
    }
    if (tagged.length > 0) {
      text += `with ${tagged[0].username}`;
    }
    if (tagged.length > 1) {
      text += `, ${tagged[1].username} `;
    }
    if (tagged.length > 2) {
      text += `and ${tagged.length - 2} others`;
    }

    return text;
  };

  return (
    <>
      <ModalHeader textAlign="center" color="textSecondary">
        Create Post
      </ModalHeader>
      <ModalCloseButton
        color="textSecondary"
        borderRadius="50%"
        _hover={{ backgroundColor: "hover" }}
      />
      <Divider orientation="horizontal" my="10px" borderColor="hover" />
      <ModalBody
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#111",
            borderRadius: "24px",
          },
        }}
      >
        <Flex>
          <Avatar
            src={
              loggedUser.avatarImage
                ? base64ToObjectURL(loggedUser.avatarImage)
                : null
            }
          />
          <Text color="textPrimary" fontWeight="bold">
            {handlePostStatus()}
          </Text>
        </Flex>
        <Textarea
          placeholder={"What's on your mind, " + loggedUser.user.username}
          resize="none"
          border="none"
          ref={initialRef}
          name="text"
          value={formikProps.values.text}
          onChange={formikProps.handleChange}
          fontSize={!!img ? "13px" : "22px"}
          color="gray"
          mt="10px"
          mb="20px"
          h={!!img ? "60px" : "200px"}
        />
        {!!img && (
          <Stack position="relative">
            <CloseButton
              position="absolute"
              right="10px"
              mt="20px"
              bg="tertiary"
              color="primary"
              borderRadius="50%"
              _hover={{
                bg: "tertiary",
              }}
              _active={{
                bg: "tertiary",
              }}
              onClick={() => {
                setImg(null);
              }}
            />
            <Image
              src={URL.createObjectURL(img)}
              w="100%"
              objectFit="contain"
            />
          </Stack>
        )}

        <Flex
          border="1px"
          borderColor="#4F4F4D"
          mt="10px"
          borderRadius="8px"
          py="10px"
          px="20px"
          justify="space-between"
          align="center"
        >
          <Text fontWeight="bold" color="textSecondary">
            Add to Your Post
          </Text>
          <Flex>
            <FormControl w="50%">
              <FormLabel textAlign="center">
                <IconButton
                  icon={<MdPhotoLibrary />}
                  aria-label="photo/video"
                  variant="basic"
                  w="50%"
                  color="green.300"
                  fontSize="28px"
                  borderRadius="50%"
                  bg="tertiary"
                  mr="4px"
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
                    setImg(e.target.files[0]);
                  }}
                />
              </InputGroup>
            </FormControl>

            <IconButton
              icon={<FaUserTag />}
              aria-label="feeling/activity"
              variant="basic"
              w="50%"
              color="blue.500"
              bg="tertiary"
              fontSize="28px"
              borderRadius="50%"
              mr="12px"
              onClick={() => setStage("tag")}
            />
            <IconButton
              icon={<MdTagFaces />}
              aria-label="feeling/activity"
              variant="basic"
              w="50%"
              color="yellow.400"
              bg="tertiary"
              fontSize="28px"
              borderRadius="50%"
              onClick={() => setStage("activity")}
            />
          </Flex>
        </Flex>
        <Button
          type="submit"
          onClick={formikProps.submitForm}
          disabled={
            formikProps.isSubmitting ||
            (formikProps.values.text.length < 1 &&
              formikProps.values.activity.length < 1 &&
              formikProps.values.feeling.length < 1 &&
              img == null)
          }
          _disabled={{
            backgroundColor: "gray",
            cursor: "no-drop",
          }}
          bg="active"
          color="textSecondary"
          fontSize="16px"
          w="100%"
          padding={2}
          mt={4}
          mb="10px"
          transition="filter 0.1s ease-in-out"
          _hover={{
            filter: "brightness(0.9)",
          }}
        >
          {formikProps.isSubmitting ? (
            <CircularProgress isIndeterminate size={30} />
          ) : (
            "Post"
          )}
        </Button>
      </ModalBody>
    </>
  );
};
export default PostCreatorBasicStage;
