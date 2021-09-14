import { Box } from "@chakra-ui/layout";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Body from "../../components/Stories/Body";
import { useLoggedUserQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";

interface Props {
    id?: string;
}

const Stories: NextPage<Props> = ({id}) => {
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
    body = <Box maxW="100vw" color="textPrimary" bg={"primary"} h="100vh">
    <Navbar loggedUser={data && data.loggedUser} />
    <Body id={parseInt(id)} />
  </Box>
  }
  return <div>{body}</div>;
};

Stories.getInitialProps = async ({ query }) => {
    return {
      id: query.id as string,
    };
  };

export default withUrqlClient(createUrqlClient)(Stories);
