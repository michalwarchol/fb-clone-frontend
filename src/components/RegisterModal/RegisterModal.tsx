import {
  Button,
  CircularProgress,
  Divider,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
  useDisclosure,
  ModalOverlay,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { NotificationType, useCreateNotificationMutation, useRegisterMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../InputField";
import BirthdaySelect from "./BirthdaySelect";
import GenderSelect from "./GenderSelect";

const RegisterModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, register] = useRegisterMutation();
  const [, createNotification] = useCreateNotificationMutation();
  const router = useRouter();

  return (
    <>
      <Button
        bg="buttonSuccess"
        color="textSecondary"
        w="194px"
        h="48px"
        pl="16px"
        pr="16px"
        mb="20px"
        fontSize="17px"
        fontWeight="bold"
        transition="filter 0.1s ease-in-out"
        _hover={{
          filter: "brightness(0.9)",
        }}
        onClick={onOpen}
      >
        Create New Account
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading fontSize="32px">Sign Up</Heading>
            <Text fontSize="16px" fontWeight="300">
              It's quick and easy.
            </Text>
          </ModalHeader>
          <Divider orientation="horizontal" borderColor="gray.400" />
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await register({ credentials: values });
                if (response.data?.register.errors) {
                  setErrors(toErrorMap(response.data.register.errors));
                } else if (response.data?.register.loggedUser) {
                  await createNotification({input: {
                    info: "Welcome to Clonebook.",
                    receiverId: response.data.register.loggedUser.user._id,
                    type: NotificationType.Info
                  }})
                  router.push("/");
                }
              }}
            >
              {({ values, handleChange, isSubmitting }) => (
                <Form>
                  <Grid direction="column">
                    <InputField
                      value={values.username}
                      onChange={handleChange}
                      name="username"
                      label="Username"
                      placeholder="username"
                      bg="gray.100"
                      borderColor="gray.300"
                    />
                    <InputField
                      value={values.email}
                      onChange={handleChange}
                      name="email"
                      label="email"
                      placeholder="email"
                      type="text"
                      bg="gray.100"
                      borderColor="gray.300"
                    />
                    <InputField
                      value={values.password}
                      onChange={handleChange}
                      name="password"
                      label="Password"
                      placeholder="New password"
                      type="password"
                      bg="gray.100"
                      borderColor="gray.300"
                    />

                    <BirthdaySelect />
                    <GenderSelect />

                    <Text fontSize="10px">
                      By clicking SignUp you agree bla bla blaaa.. Lorem ipsum
                      dolor sit, amet consectetur adipisicing elit. Unde officia
                      sit ex porro sint fuga hic in, laboriosam explicabo! Sed
                      numquam tempore magnam voluptas, perspiciatis eligendi id
                      ad animi ab!
                    </Text>
                    <Flex justify="center">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        bg="buttonSuccess"
                        color="textSecondary"
                        w="194px"
                        h="48px"
                        pl="16px"
                        pr="16px"
                        mt="20px"
                        mb="20px"
                        fontSize="17px"
                        fontWeight="bold"
                        transition="filter 0.1s ease-in-out"
                        _active={{
                          bg: "success"
                        }}
                        _hover={{
                          filter: "brightness(0.9)",
                        }}
                      >
                        {isSubmitting ? (
                          <CircularProgress isIndeterminate size={30} />
                        ) : (
                          "Sign up"
                        )}
                      </Button>
                    </Flex>
                  </Grid>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default RegisterModal;
