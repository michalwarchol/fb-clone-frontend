import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  Flex,
  IconButton,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import React, { MutableRefObject } from "react";
import { FaUserTag } from "react-icons/fa";
import { MdPhotoLibrary, MdTagFaces } from "react-icons/md";
import { RegularUserFragment } from "../../generated/graphql";
import { FormProps } from "./PostCreatorModal";

interface Props {
  formikProps: FormikProps<FormProps>;
  user: RegularUserFragment | null;
  initialRef: MutableRefObject<any>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const PostCreatorBasicStage: React.FC<Props> = ({
  formikProps,
  user,
  initialRef,
  setStage,
}) => {
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
      <ModalBody>
        <Flex>
          <Avatar />
          <Text color="textPrimary" fontWeight="bold">
            {user && user.username}{" "}
            {!!formikProps.values.feeling &&
              `is feeling ${formikProps.values.feeling}`}
            {!!formikProps.values.activity &&
              `is ${formikProps.values.activity}`}
          </Text>
        </Flex>
        <Textarea
          placeholder={"What's on your mind, " + user.username}
          resize="none"
          border="none"
          ref={initialRef}
          name="text"
          value={formikProps.values.text}
          onChange={formikProps.handleChange}
          fontSize="22px"
          color="gray"
          mt="10px"
          h="200px"
        />
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
            />
            <IconButton
              icon={<FaUserTag />}
              aria-label="feeling/activity"
              variant="basic"
              w="50%"
              color="blue.500"
              bg="tertiary"
              fontSize="28px"
              borderRadius="50%"
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
            formikProps.values.feeling.length < 1)
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
