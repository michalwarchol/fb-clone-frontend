import { Avatar, Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLoggedUserQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

const PostCreator: React.FC = () => {
  const [{ data, fetching }] = useLoggedUserQuery({
    pause: isServer,
  });
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (!fetching) {
      if (data?.loggedUser) {
        setUsername(data.loggedUser?.username);
      }
    }
  }, [data]);
  return (
    <Box bg="secondary" p="10px" borderRadius="8px">
      <Flex align="center">
        <Avatar />
        <Button
          borderRadius="20px"
          bg="tertiary"
          _hover={{ backgroundColor: "hover" }}
          _active={{ backgroundColor: "hover" }}
          w="100%"
          ml="10px"
        >
          <Text textAlign="left" w="100%">What's on your mind? {username}</Text>
        </Button>
      </Flex>
      <Divider orientation="horizontal" mt={5} mb={5} borderColor="gray.400" />
      <Flex>Przyciski</Flex>
    </Box>
  );
};
export default PostCreator;
