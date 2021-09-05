import { Box, HStack, Text } from "@chakra-ui/layout";
import { Select, useRadioGroup } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import React, { useState } from "react";
import RadioCard from "./RadioCard";

interface Props {
  setFont: React.Dispatch<React.SetStateAction<string>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setGradient: React.Dispatch<React.SetStateAction<string>>;
}

const Options: React.FC<Props> = ({ setFont, setText, setGradient }) => {
  const [fontFamily, setFontFamily] = useState("Courier New");
  const bgs = [
    "linear(to-r, green.200, pink.500)",
    "linear(to-l, #7928CA, #FF0080)",
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: console.log,
  });
  const group = getRootProps();
  return (
    <Box px="10px" mt="8px">
      <Textarea
        placeholder="Start typing"
        resize="none"
        mb="20px"
        onChange={(e) => setText(e.currentTarget.value.slice(0, 250))}
        h="220px"
      />
      <Select
        placeContent={"fdfd"}
        onChange={(e) => {
          setFont(e.currentTarget.value);
          setFontFamily(e.currentTarget.value);
        }}
        fontFamily={fontFamily}
      >
        <option style={{ fontFamily: "Courier New" }} value="Courier New">
          CLEAN
        </option>
        <option style={{ fontFamily: "Verdana" }} value="Verdana">
          Simple
        </option>
        <option
          style={{ fontFamily: "Brush Script MT" }}
          value="Brush Script MT"
        >
          Casual
        </option>
        <option style={{ fontFamily: "Garamond" }} value="Garamond">
          Fancy
        </option>
        <option style={{ fontFamily: "Arial Black" }} value="Arial Black">
          Headline
        </option>
      </Select>
      <Box border="1px" borderRadius="6px" p="10px" mt="20px">
        <Text mb="10px">Backgrounds</Text>
        <HStack {...group}>
          {bgs.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard
                gradient={value}
                setGradient={setGradient}
                key={value}
                {...radio}
              >
                {value}
              </RadioCard>
            );
          })}
        </HStack>
      </Box>
    </Box>
  );
};
export default Options;
