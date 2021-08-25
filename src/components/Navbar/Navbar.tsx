import { Flex, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { FullUser } from "../../generated/graphql";
import Options from "./Options";

interface Props {
  loggedUser: FullUser;
}

const Navbar: React.FC<Props> = ({loggedUser}) => {
  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      p={1}
      bg="secondary"
      h={"48px"}
      position="fixed"
      w="100%"
      left="0%"
      top="0%"
      zIndex="99"
      borderBottom="1px solid"
      borderColor="hover"
    >
      <GridItem colStart={1} colEnd={3}>
        logo and search
      </GridItem>
      <GridItem colStart={4} colEnd={9}>
        subpages
      </GridItem>
      <GridItem colStart={11} colEnd={13}>
        <Flex justify="flex-end" mr="10px">
          <Options loggedUser={loggedUser}/>
        </Flex>
      </GridItem>
    </Grid>
  );
};
export default Navbar;
