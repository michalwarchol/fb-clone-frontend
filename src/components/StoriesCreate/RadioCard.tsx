import { Box } from "@chakra-ui/layout";
import { RadioProps, useRadio } from "@chakra-ui/radio";

type MyRadioProps = RadioProps & {
  gradient: string;
  setGradient: React.Dispatch<React.SetStateAction<string>>;
};

const RadioCard: React.FC<MyRadioProps> = ({
  gradient,
  setGradient,
  ...props
}) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        boxShadow="md"
        w="30px"
        h="30px"
        borderRadius="50%"
        bgGradient={gradient}
        _checked={{
          color: "white",
          borderWidth: "3px",
          borderColor: "active",
        }}
        onClick={() => setGradient(gradient)}
      ></Box>
    </Box>
  );
};

export default RadioCard;
