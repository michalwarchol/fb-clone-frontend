import { Box, Button, CircularProgress, Flex, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import InputField from "./InputField";

interface NavbarProps {
  visibleLoginForm: boolean;
}

const LoginNavbar: React.FC<NavbarProps> = ({ visibleLoginForm }) => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Box bg="white" py="5px" boxShadow="0 -4px 10px black">
      <Flex justify="space-between">
        <Flex align="center">
          <Heading as="h3" color="active" ml="10px">
            clonebook
          </Heading>
        </Flex>
        {visibleLoginForm && (
          <Box>
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await login({
                  username: values.username,
                  password: values.password,
                });
                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));
                } else if (response.data?.login.loggedUser) {
                  router.push("/");
                }
              }}
            >
              {({ values, handleChange, isSubmitting }) => (
                <Form>
                  <Flex direction="row">
                    <InputField
                      value={values.username}
                      onChange={handleChange}
                      name="username"
                      label="Username"
                      placeholder="Username"
                      pt="8px"
                      pb="10px"
                      borderColor="gray.300"
                    />
                    <InputField
                      value={values.password}
                      onChange={handleChange}
                      name="password"
                      label="Password"
                      placeholder="Password"
                      type="password"
                      pt="8px"
                      pb="10px"
                      ml="10px"
                      mr="10px"
                      borderColor="gray.300"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      bg="active"
                      color="textSecondary"
                      fontSize="18px"
                      padding={4}
                      pl="40px"
                      pr="40px"
                      mt={4}
                      ml="20px"
                      mr="10px"
                      transition="filter 0.1s ease-in-out"
                      _hover={{
                        filter: "brightness(0.9)",
                      }}
                    >
                      {isSubmitting ? (
                        <CircularProgress isIndeterminate size={30} />
                      ) : (
                        "Log in"
                      )}
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        )}
      </Flex>
    </Box>
  );
};
export default LoginNavbar;
