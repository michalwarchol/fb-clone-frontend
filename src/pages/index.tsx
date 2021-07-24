import React from "react"
import {Box} from "@chakra-ui/react"
import Navbar from "../components/Navbar/Navbar"
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "../utils/createUrqlClient"

const Index = () => (
  <Box maxW="100vw" color="textPrimary" bg={"primary"}>
    <Navbar />
    fdsfdsfsd
  </Box>
)

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
