import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  usePostsQuery,
  User,
} from "../../generated/graphql";
import { useScrollPosition } from "../../utils/useScrollPosition";
import PostContainer from "../Post/PostContainer";
import PostCreator from "../PostCreator/PostCreator";
import FriendSection from "./FriendsSection";

interface Props {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  id: number;
  editable: boolean;
  user: User;
}

const PostsTab: React.FC<Props> = ({ setActiveTab, id, editable, user }) => {
  const [variables, setVariables] = useState({ limit: 10, cursor: null });
  const [{ data: userPosts }] = usePostsQuery({
    variables: { ...variables, creatorId: id },
    pause: !user,
  });

  const getMorePosts = () => {
    setVariables({
      limit: variables.limit,
      cursor: userPosts.posts.posts[userPosts.posts.posts.length - 1].createdAt,
    });
  };
  useScrollPosition(
    [userPosts?.posts.hasMore, userPosts?.posts.posts],
    userPosts?.posts.hasMore,
    getMorePosts
  );

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      bg="primary"
      w={{ lg: "876px" }}
      mt="16px"
      align={{ base: "center", lg: "flex-start" }}
      justify="space-between"
    >
      <Flex
        w={{ base: "100%", lg: "40%" }}
        mr={{ base: "0px", lg: "16px" }}
        mb={{ base: "16px", lg: "0" }}
      >
        <FriendSection id={id} setActiveTab={setActiveTab} />
      </Flex>
      <Flex borderRadius="8px" direction="column" align="center" w={{ base: "100%", lg: "60%" }}>
        {editable && <PostCreator />}
        <Flex w="100%" direction="column" align="center">
          {!userPosts ? (
            <Box p="10px" borderRadius="50%" bg="secondary"><Spinner color="active" size="xl" /></Box>
          ) : (
            userPosts.posts.posts.map((post) => (
              <PostContainer post={post} key={post._id} />
            ))
          )}
          {userPosts && !userPosts.posts.hasMore && (
            <Box mb="10px">
              <Text fontSize="20px">No more posts to display</Text>
            </Box>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostsTab;
