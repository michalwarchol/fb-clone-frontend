import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Body from "../../components/ProfileBody/Body";
import {
  useLoggedUserQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";

interface Props {
  id?: string;
}

const Profile: NextPage<Props> = ({ id }) => {
  const [{ data, fetching }] = useLoggedUserQuery({
    pause: isServer,
  });
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.loggedUser) {
      router.replace("/login");
    }
  }, [fetching, data]);

  let body = <div></div>;
  if(data?.loggedUser){
    body = <Box maxW="100vw" color="textPrimary" bg={"primary"} minH="100vh">
    <Navbar loggedUser={data && data.loggedUser} />
    <Body
      editable={data.loggedUser.user._id == parseInt(id)}
      id={parseInt(id)}
    />
  </Box>
  }
  return <div>{body}</div>;
};

Profile.getInitialProps = async ({ query }) => {
  return {
    id: query.id as string,
  };
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Profile);
