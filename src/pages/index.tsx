import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Content from "../components/Content/Content";
import { useLoggedUserQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Index = () => {
  const [{ data, fetching }] = useLoggedUserQuery({
    pause: isServer,
  });
  const [body, setBody] = useState<JSX.Element>(<div></div>);
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.loggedUser) {
      router.replace("/login");
    } else if (!fetching && data?.loggedUser) {
      setBody(
        <Box maxW="100vw" color="textPrimary" bg={"primary"}>
          <Navbar loggedUser={data && data.loggedUser} />
          <Content loggedUser={data && data.loggedUser} />
        </Box>
      );
    }
  }, [fetching, data, router]);

  return <div>{body}</div>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
