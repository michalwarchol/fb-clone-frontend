import React, { useMemo } from "react";
import NextLink from "next/link";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { base64ToObjectURL } from "../../utils/base64ToObjectURL";
import { SearchedUser } from "../../generated/graphql";

interface Props {
  user: SearchedUser;
}

const SearchSuggestion: React.FC<Props> = ({ user }) => {
  const memoizedAvatar = useMemo(() => base64ToObjectURL(user.avatarImage), []);
  return (
    <NextLink href={"/profile/" + user._id}>
      <Flex
        align="center"
        p="4px"
        borderRadius="8px"
        _hover={{
          backgroundColor: "hover",
          cursor: "pointer",
        }}
      >
        <Avatar
          size="md"
          src={user.avatarImage ? memoizedAvatar : null}
          mr="10px"
        />
        <Text textAlign="center">{user.username}</Text>
      </Flex>
    </NextLink>
  );
};
export default SearchSuggestion;
