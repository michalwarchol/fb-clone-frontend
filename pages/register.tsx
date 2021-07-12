import { Button, Grid, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import { Formik, Form } from "formik";
import InputField from "../src/components/InputField";
import BasicContainer from "../src/components/BasicContainer";
import { useRegisterMutation } from "../src/generated/graphql";
import { toErrorMap } from "../src/utils/toErrorMap";
import { useRouter } from "next/dist/client/router";

const useStyles = makeStyles({
    button: {
        backgroundColor: "#432432"
    }
})

const Register: React.FC = () => {
    const classes = useStyles();
    const [,register] = useRegisterMutation();
    const router = useRouter();

  return (
    <BasicContainer>
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, {setErrors}) => {
        const response = await register(values);
        if(response.data?.register.errors){
          setErrors(toErrorMap(response.data.register.errors));
        }else if(response.data?.register.user){
          router.push("/");
        }
      }}
    >
      {({ values, handleChange, isSubmitting }) => (
        <Form>
          <Grid container direction="column">
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
            <Button type="submit" disabled={isSubmitting} className={classes.button}>
              {isSubmitting ? <CircularProgress size={30} /> : "Submit"}
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
    </BasicContainer>
  );
};
export default Register;
