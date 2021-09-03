import React from "react";
import NextLink from "next/link";
import { Box } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

interface Props {
  route: string;
  MyIcon: IconType;
}

const PageButton: React.FC<Props> = ({ route, MyIcon }) => {
  const router = useRouter();

  return (
    <NextLink href={route}>
      <Box
        borderBottom="2px"
        borderColor={router.route == route ? "active" : "secondary"}
        mr="8px"
      >
        <IconButton
          aria-label="home"
          icon={<MyIcon />}
          variant="basic"
          h="100%"
          mb="2px"
          w={{ base: "80px", sm: "110px", md: "130px" }}
          fontSize="30px"
          color={router.route == route ? "active" : "textPrimary"}
        />
      </Box>
    </NextLink>
  );
};
export default PageButton;
