import { Box, Flex, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, {  useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import Navbar from "../../components/Navbar/Navbar";
import Body from "../../components/ProfileBody/Body";
import FriendsBar from "../../components/ProfileBody/FriendsBar";
import { useLoggedUserQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
import { withAuth } from "../../utils/withAuth";

const Friends: React.FC = () => {
  const [{data}] = useLoggedUserQuery({
    pause: isServer,
  });

  const [id, setId] = useState<number | null>(null);

  return <Box maxW="100vw" color="textPrimary" bg={"primary"} minH="100vh">
  <Navbar />
  <Flex>
    <FriendsBar setId={setId} />
    {id != null ? (
      <Flex w="100%" align="start" bg="primary">
        <Body editable={data.loggedUser.user._id == id} id={id} />
      </Flex>
    ) : (
      <Flex
        w="100%"
        h="100vh"
        align="center"
        justify="center"
        direction="column"
      >
        <BsFillPeopleFill fontSize="100px" color="tertiary" />
        <Text fontSize="22px" fontWeight="bold">Select people's names to preview their profile.</Text>
      </Flex>
    )}
  </Flex>
</Box>;
};

export default withUrqlClient(createUrqlClient)(withAuth(Friends));
