import { Button, Grid, CircularProgress, Container } from "@chakra-ui/react";
import React from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";
import InputField from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";
import { useRegisterMutation } from "../generated/graphql";

const Register: React.FC = () => {
    const [,register] = useRegisterMutation();
    const router = useRouter();

  return (
    <Container maxW={"container.lg"}>
      <h1>Register</h1> 
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, {setErrors}) => {
        const response = await register({credentials: values});
        if(response.data?.register.errors){
          setErrors(toErrorMap(response.data.register.errors));
        }else if(response.data?.register.user){
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={30} /> : "Submit"}
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
    </Container>
  );
};
export default Register;
