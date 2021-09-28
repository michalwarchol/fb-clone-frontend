import {
  Icon,
  Select,
  Stack,
  Text,
  Tooltip,
  HStack,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { BsInfoCircle } from "react-icons/bs";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const BirthdaySelect: React.FC = () => {
  return (
    <>
      <Flex align="center" mt="10px" mb="4px">
        <Text fontSize="12px">
          Birthday
        </Text>
        <Tooltip label="This field is optional" placement="right">
          <HStack w="10px" ml="4px">
            <Icon as={BsInfoCircle} />
          </HStack>
        </Tooltip>
      </Flex>
      <Stack direction="row" align="space-between">
        <Select placeholder="Month" borderColor="gray.300">
          {months.map((elem, index) => (
            <option value={index} key={index}>{elem}</option>
          ))}
        </Select>

        <Select placeholder="Day" borderColor="gray.300">
          {Array.from(Array(31).keys()).map((elem, index) => (
            <option value={elem} key={index}>{elem + 1}</option>
          ))}
        </Select>

        <Select placeholder="Year" borderColor="gray.300">
          {Array.from(Array(new Date().getFullYear() - 1904).keys()).map(
            (elem, index) => (
              <option value={elem} key={index}>{new Date().getFullYear() - elem}</option>
            )
          )}
        </Select>
      </Stack>
    </>
  );
};
export default BirthdaySelect;
