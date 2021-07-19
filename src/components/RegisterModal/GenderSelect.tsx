import {
  Box,
  Flex,
  HStack,
  RadioProps,
  Text,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import React from "react";
import {IoMdRadioButtonOff, IoMdRadioButtonOn} from "react-icons/Io"

type RadioCardProps = RadioProps;

const RadioCard: React.FC<RadioCardProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w="33%">
      <input {...input} />
      <Flex
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderColor="gray.400"
        borderRadius="md"
        boxShadow="md"
        py={1}
        align="center"
        justify="space-around"
        maxW="100%"
      >{props.children} <Text color={props.isChecked?"active":"black"}>{props.isChecked?<IoMdRadioButtonOn />:<IoMdRadioButtonOff />}</Text></Flex>
    </Box>
  );
};

const GenderSelect: React.FC = () => {

    const options = ["Female", "Male", "Other"];
    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "gender",
        onChange: console.log
    })

    const group = getRootProps();

  return (
    <>
      <Text fontSize="12px" mt="10px">
        Gender
      </Text>
      <HStack {...group} justify="space-between">
            {options.map((value)=>{
                const radio = getRadioProps({value});
                return <RadioCard key={value} {...radio}>
                    {value}
                </RadioCard>
            })}
      </HStack>
    </>
  );
};
export default GenderSelect;