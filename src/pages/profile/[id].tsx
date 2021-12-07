import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Body from "../../components/ProfileBody/Body";
import { useLoggedUserQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";
import { withAuth } from "../../utils/withAuth";

interface Props {
  id?: string;
}

const Profile: NextPage<Props> = ({ id }) => {
  const [{ data }] = useLoggedUserQuery({
    pause: isServer,
  });

  return (
    <Box
      maxW="100vw"
      color="textPrimary"
      bg="primary"
      minH="100vh"
      overflowY="hidden"
    >
      <Navbar />
      <Body
        editable={data.loggedUser.user._id == parseInt(id)}
        id={parseInt(id)}
      />
    </Box>
  );
};

Profile.getInitialProps = async ({ query }) => {
  return {
    id: query.id as string,
  };
};

export default withUrqlClient(createUrqlClient, { ssr: true })(
  withAuth(Profile)
);
