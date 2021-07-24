import { IconButton } from "@chakra-ui/react";
import { TiArrowSortedDown } from "react-icons/ti";
import React from "react";

const CircleButton: React.FC = () => {
  return (
    <IconButton
      aria-label="settings"
      borderRadius="50%"
      w={"40px"}
      h={"40px"}
      bg={"hover"}
      icon={<TiArrowSortedDown />}
      _hover={{ backgroundColor: "tertiary" }}
      _active={{
          width: 38,
          height: 38
      }}
      _focus={{
        backgroundColor: "rgba()",
        color: "active",
      }}
    />
  );
};
export default CircleButton;
