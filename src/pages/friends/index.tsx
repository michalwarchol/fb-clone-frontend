import { Box, Flex, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import Navbar from "../../components/Navbar/Navbar";
import Body from "../../components/ProfileBody/Body";
import FriendsBar from "../../components/ProfileBody/FriendsBar";
import { useLoggedUserQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";

const Friends: React.FC = () => {
  const [{ data, fetching }] = useLoggedUserQuery({
    pause: isServer,
  });

  const [id, setId] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.loggedUser) {
      router.replace("/login");
    }
  }, [fetching, data]);

  let body = <div></div>;
  if (data?.loggedUser) {
    body = (
      <Box maxW="100vw" color="textPrimary" bg={"primary"} minH="100vh">
        <Navbar loggedUser={data && data.loggedUser} />
        <Flex>
          <FriendsBar setId={setId} />
          {id != null ? (
            <Body editable={data.loggedUser.user._id == id} id={id} />
          ) : (
            <Flex
              ml="360px"
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
      </Box>
    );
  }
  return <div>{body}</div>;
};

export default withUrqlClient(createUrqlClient)(Friends);
