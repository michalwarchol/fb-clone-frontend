import { Box, Button, CircularProgress, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import InputField from "./InputField";
import NextLink from "next/link";
import { Form, Formik } from "formik";
import { useForgotPasswordMutation } from "../generated/graphql";

const PasswordRecoveryEmail: React.FC = () => {
  const [,forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState<boolean>(false);
  return (
    <Box bg="white" borderRadius="8px" w="500px" boxShadow="0 3px 10px rgb(0 0 0 / 0.2)">
      <Heading as="h5" px="16px" py="18px" fontSize="24px">
        Find Your Account
      </Heading>
      <Divider orientation="horizontal" mt={5} mb={5} borderColor="gray.300" />

      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <Box m="16px">
              <Text>Please enter your email to search for your account.</Text>
              <InputField
                value={values.email}
                onChange={handleChange}
                name="email"
                label="email"
                type="text"
                borderColor="gray.300"
                placeholder="email"
              />
            </Box>
            <Divider
              orientation="horizontal"
              mt={5}
              mb={5}
              borderColor="gray.300"
            />
            {complete && <Text>Check your mailbox.</Text>}
            <Flex p="16px" justify="flex-end">
              <NextLink href="/login">
                <Button color="secondary">Cancel</Button>
              </NextLink>
              <Button bg="active" color="white" ml="10px" type="submit">
                {(isSubmitting || complete) ? <CircularProgress isIndeterminate size={30}/> : "Search"}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default PasswordRecoveryEmail;
