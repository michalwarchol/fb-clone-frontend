import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import React, { useState } from "react";
import InputField from "../../components/InputField";
import NextLink from "next/link";
import LoginNavbar from "../../components/LoginNavbar";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/dist/client/router";
import { toErrorMap } from "../../utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const ChangePassword: NextPage = () => {
  const [,changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const token = router.query.token as string;
  const [tokenError, setTokenError] = useState<string>("");

  return (
    <Container h="100vh" bg="#f0f2f5" maxW="100vw" p="0">
      <LoginNavbar visibleLoginForm={false} />
      <Flex justify="center" >
      <Box
        bg="white"
        mt="100px"
        borderRadius="8px"
        w="500px"
        boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
      >
        <Heading as="h5" px="16px" py="18px" fontSize="24px">
          Choose a New Password
        </Heading>
        <Divider
          orientation="horizontal"
          mt={5}
          mb={5}
          borderColor="gray.300"
        />
        <Formik
          initialValues={{ newPassword: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await changePassword({token, newPassword: values.newPassword});
            if(response.data.changePassword.errors){
              const errorMap = toErrorMap(response.data.changePassword.errors);
              if('token' in errorMap){
                setTokenError(errorMap.token);
              }
              setErrors(toErrorMap(response.data.changePassword.errors));
            }else if(response.data.changePassword.loggedUser){
              router.push("/");
            }
          }}
        >
          {({ values, handleChange, isSubmitting}) => (
            <Form>
              <Box m="16px">
                <Text>
                  Create a new password that is at least 6 characters long. A
                  strong password is combination of letters, numbers, and
                  punctuation marks.
                </Text>
                <InputField
                  value={values.newPassword}
                  onChange={handleChange}
                  name="newPassword"
                  label="newPassword"
                  type="password"
                  borderColor="gray.300"
                  placeholder="New Password"
                />
                {tokenError && <Box color="red">{tokenError}</Box>}
              </Box>
              <Divider
                orientation="horizontal"
                mt={5}
                mb={5}
                borderColor="gray.300"
              />
              <Flex p="16px" justify="flex-end">
                <NextLink href="/login">
                  <Button color="secondary">Skip</Button>
                </NextLink>
                <Button bg="active" color="white" ml="10px" type="submit">
                  {isSubmitting ? <CircularProgress isIndeterminate size={30}/> : "Continue"}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
      </Flex>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
