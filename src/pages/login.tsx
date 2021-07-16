import { Button, Grid, CircularProgress, Container } from "@chakra-ui/react";
import React from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import InputField from "../components/InputField";

const Login: React.FC = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Container>
       <h1>Login</h1> 
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({credentials: values});
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
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
              />
              <InputField
                value={values.password}
                onChange={handleChange}
                name="password"
                label="Password"
                placeholder="password"
                type="password"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={30} /> : "Submit"}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
export default Login;
