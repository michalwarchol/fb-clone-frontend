import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { useLoggedUserQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import PageButton from "../components/Content/PageButton";
import { Avatar } from "@chakra-ui/avatar";
import Icon from "@chakra-ui/icon";
import { FaUserFriends } from "react-icons/fa";
import { FcCamera } from "react-icons/fc";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { base64ToObjectURL } from "../utils/base64ToObjectURL";
import { withAuth } from "../utils/withAuth";

const Bookmarks: React.FC = () => {
  const [{ data }] = useLoggedUserQuery({
    pause: isServer,
  });

  return (
    <Box maxW="100vw" minH="100vh" color="textPrimary" bg={"primary"}>
      <Navbar />
      <Box mt="56px">
        <PageButton
          text={data.loggedUser.user.username}
          image={
            <Avatar src={base64ToObjectURL(data.loggedUser.avatarImage)} />
          }
          link={"/profile/" + data.loggedUser?.user._id}
        />
        <PageButton
          text="Friends"
          image={
            <Flex
              w="48px"
              h="48px"
              bgGradient="linear(to-r, teal.500,green.500)"
              color="linear(to-r, teal.500,green.500)"
              borderRadius="50%"
              justify="center"
              align="center"
            >
              <Icon as={FaUserFriends} w="38px" h="38px" />
            </Flex>
          }
          link="/friends"
        />
        <PageButton
          text="Stories"
          image={<Icon as={FcCamera} w="48px" h="48px" />}
          link="/stories"
        />
      </Box>
    </Box>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(
  withAuth(Bookmarks)
);
