import {
  Box,
  Flex,
  HStack,
  Icon,
  RadioProps,
  Text,
  Tooltip,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import React from "react";
import { BsInfoCircle } from "react-icons/bs";
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
      <Flex align="center" mt="10px" mb="4px">
        <Text fontSize="12px">
          Gender
        </Text>
        <Tooltip label="This field is optional" placement="right">
          <HStack w="10px" ml="4px">
            <Icon as={BsInfoCircle} />
          </HStack>
        </Tooltip>
      </Flex>
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