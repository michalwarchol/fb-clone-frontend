import { Flex, Grid, GridItem, Icon } from "@chakra-ui/react";
import React from "react";
import { FaFacebookF, FaUserFriends } from "react-icons/fa";
import NextLink from "next/link";
import { FullUser } from "../../generated/graphql";
import Options from "./Options";
import { AiFillCamera, AiFillHome } from "react-icons/ai";
import PageButton from "./PageButton";

interface Props {
  loggedUser: FullUser;
}

const Navbar: React.FC<Props> = ({ loggedUser }) => {
  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      bg="secondary"
      h={"56px"}
      position="fixed"
      w="100%"
      left="0%"
      top="0%"
      zIndex="99"
      borderBottom="1px solid"
      borderColor="hover"
    >
      <GridItem colStart={1} colEnd={3}>
        <NextLink href="/">
          <Flex align="center" h="100%">
            <Icon
              as={FaFacebookF}
              cursor="pointer"
              background="active"
              borderRadius="50%"
              color="white"
              pt="10px"
              fontSize="46px"
              ml="22px"
            />
          </Flex>
        </NextLink>
      </GridItem>
      <GridItem colStart={4} colEnd={9} p="4px 4px 0 4px">
        <Flex justify="center" h="100%">
          <PageButton route="/" MyIcon={AiFillHome} />
          <PageButton route="/friends" MyIcon={FaUserFriends} />
          <PageButton route="/stories" MyIcon={AiFillCamera} />
        </Flex>
      </GridItem>
      <GridItem colStart={9} colEnd={13}>
        <Flex justify="flex-end" align="center" h="100%" mr="10px" p="4px">
          <Options loggedUser={loggedUser} />
        </Flex>
      </GridItem>
    </Grid>
  );
};
export default Navbar;
