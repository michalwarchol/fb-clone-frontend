import { Select, Stack, Text } from "@chakra-ui/react";
import React from "react";

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
      <Text fontSize="12px" mt="10px">
        Birthday
      </Text>
      <Stack direction="row" align="space-between">
        <Select placeholder="Month" borderColor="gray.300">
          {months.map((elem, index) => (
            <option value={index}>{elem}</option>
          ))}
        </Select>

        <Select placeholder="Day" borderColor="gray.300">
          {Array.from(Array(31).keys()).map((elem) => (
            <option value={elem}>{elem + 1}</option>
          ))}
        </Select>

        <Select placeholder="Year" borderColor="gray.300">
          {Array.from(Array(new Date().getFullYear() - 1904).keys()).map(
            (elem) => (
              <option value={elem}>{new Date().getFullYear() - elem}</option>
            )
          )}
        </Select>
      </Stack>
    </>
  );
};
export default BirthdaySelect;