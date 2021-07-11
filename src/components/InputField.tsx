import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const useStyles = makeStyles({
  root: {
    marginTop: 40,
  },
});

const InputField: React.FC<InputFieldProps> = ({
  label,
  color: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const classes = useStyles();

  return (
    <FormControl aria-invalid={!!error} className={classes.root}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      {error && <FormHelperText error={true}>{error}</FormHelperText>}
    </FormControl>
  );
};
export default InputField;
