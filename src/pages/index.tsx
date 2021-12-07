import React from "react";
import { Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Content from "../components/Content/Content";
import { withAuth } from "../utils/withAuth";

const Index = () => {
  return (
    <Flex
      maxW="100vw"
      minH="100vh"
      color="textPrimary"
      bg={"primary"}
      justify="center"
      overflowY="hidden"
    >
      <Navbar />
      <Content />
    </Flex>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(withAuth(Index));
