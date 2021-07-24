import {
  Box,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { ImExit } from "react-icons/im";
import { useLoggedUserQuery, useLogoutMutation } from "../../generated/graphql";
import { useRouter } from "next/dist/client/router";
import { isServer } from "../../utils/isServer";
import { useEffect } from "react";

const Options: React.FC = () => {
  const [{ data, fetching }] = useLoggedUserQuery({
    pause: isServer
  });
  const [, logout] = useLogoutMutation();
  const router = useRouter();

  const [body, setBody] = useState<string>("no user");

  useEffect(()=> {
    if (!fetching) {
      if (data?.loggedUser) {
        setBody(data.loggedUser?.username)
      } else {
        router.push("/login");
      }
    }
  }, [data])

  return (
    <Box>
      {body}
      <Menu>
        <MenuButton
          as={IconButton}
          borderRadius="50%"
          boxSizing="border-box"
          bg={"tertiary"}
          icon={<TiArrowSortedDown />}
          _hover={{
            bg: "hover",
          }}
          _active={{
            filter: "brightness(0.7)",
            color: "active",
            bg: "blue.700",
          }}
        ></MenuButton>
        <MenuList w="360px" px="8px" bg="secondary" border={0}>
          <MenuItem>drugi</MenuItem>
          <MenuItem
            onClick={() => {
              logout();
              router.push("/login");
            }}
            borderRadius="8px"
            _hover={{
              bg: "hover",
            }}
          >
            <Flex w="36px" h="36px" align="center" justify="center" borderRadius="50%" bg="hover" my="8px" mr="12px">
              <Icon as={ImExit} w="20px" h="20px" />
            </Flex>
            <Text fontWeight="500">Logout</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
export default Options;
