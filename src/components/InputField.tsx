import {
  FormControl,
  FormErrorMessage,
  Input,
  InputProps
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & InputProps & {
  name: string;
  label: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error} pt={0.5} pb={1}>
      <Input {...field} {...props} id={field.name} focusBorderColor="active" borderWidth={"1px"} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
export default InputField;
