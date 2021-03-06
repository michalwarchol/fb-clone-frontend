import {
  Button,
  Grid,
  CircularProgress,
  Container,
  GridItem,
  Divider,
  Flex,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";
import { useLoginMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../../components/InputField";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

const Login: React.FC = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Container h="100vh" bg="#f0f2f5" maxW="100vw">
      <Container
        pt={{ base: "8px", md: "92px" }}
        maxW={{ md: "100%", lg: "960px" }}
      >
        <Grid templateColumns={{ base: "1fr", md: "7fr 5fr" }}>
          <GridItem>
            <Box textAlign={{ base: "center", md: "start" }}>
              <Heading as="h2" color="active" mb="10px">
                clonebook
              </Heading>
              <Text fontWeight="400" fontSize="32px">
                Information
              </Text>
              <Text color="gray.500">
                Michał is glad that you visited his website. Enjoy your time.
              </Text>
            </Box>
          </GridItem>
          <GridItem>
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
                <Box
                  m="10px"
                  p="10px"
                  boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
                  bg="white"
                >
                  <Form>
                    <Grid direction="column">
                      <InputField
                        value={values.username}
                        onChange={handleChange}
                        name="username"
                        label="Username"
                        placeholder="Username"
                        pt="16px"
                        pb="16px"
                        h="50px"
                        borderColor="gray.300"
                      />
                      <InputField
                        value={values.password}
                        onChange={handleChange}
                        name="password"
                        label="Password"
                        placeholder="Password"
                        type="password"
                        pt="16px"
                        pb="16px"
                        h="50px"
                        borderColor="gray.300"
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        bg="active"
                        color="textSecondary"
                        fontSize="20px"
                        padding={6}
                        mt={4}
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
                      <Text mt="10px" fontSize="10px" textAlign="center">
                        You can use these credentials:
                      </Text>
                      <Text fontSize="10px" textAlign="center">
                        username: <span style={{ fontWeight: "bold" }}>guest</span>{" "}
                        password:{" "}
                        <span style={{ fontWeight: "bold" }}>guest123</span>
                      </Text>
                      <Divider
                        orientation="horizontal"
                        mt={5}
                        mb={5}
                        borderColor="gray.400"
                      />
                      <Flex justify="center" pt="6px">
                        <RegisterModal />
                      </Flex>
                    </Grid>
                  </Form>
                </Box>
              )}
            </Formik>
          </GridItem>
        </Grid>
      </Container>
    </Container>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Login);
