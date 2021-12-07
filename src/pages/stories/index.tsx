import { Box } from "@chakra-ui/layout";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Body from "../../components/Stories/Body";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withAuth } from "../../utils/withAuth";

interface Props {
  id?: string;
}

const Stories: NextPage<Props> = ({ id }) => {

  return (
    <Box maxW="100vw" color="textPrimary" bg={"primary"} h="100vh">
      <Navbar />
      <Body id={parseInt(id)} />
    </Box>
  );
};

Stories.getInitialProps = async ({ query }) => {
  return {
    id: query.id as string,
  };
};

export default withUrqlClient(createUrqlClient)(withAuth(Stories));
