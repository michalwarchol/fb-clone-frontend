import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Post } from "../../generated/graphql";
import { parseAdvancedDate } from "../../utils/parseAdvancedDate";

interface PostProps {
  data: Post;
}

const PostContainer: React.FC<PostProps> = ({ data }) => {
  let date = parseAdvancedDate(data.createdAt);
  return (
    <Box bg="secondary" borderRadius="8px" mt="20px" p="10px">
      <Flex>
        <Avatar />
        <Flex direction="column" ml="10px">
          <Heading size="sm">
            {data.creator.username} {data.activity}
          </Heading>
          <Text fontSize="14px">{date}</Text>
        </Flex>
      </Flex>
      <Text fontSize={data.text.length > 250 ? "16px" : "26px"}>{data.text}</Text>
    </Box>
  );
};
export default PostContainer;
