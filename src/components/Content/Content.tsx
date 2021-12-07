import { Avatar, Box, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
  useGetRecentStoriesQuery,
  useLoggedUserQuery,
  usePostsQuery,
} from "../../generated/graphql";
import PostCreator from "../PostCreator/PostCreator";
import PostContainer from "../Post/PostContainer";
import PageButton from "./PageButton";
import { isServer } from "../../utils/isServer";
import { FaUserFriends } from "react-icons/fa";
import { FcCamera } from "react-icons/fc";
import StoriesShortcut from "./StoriesShortcut";
import FriendSuggestions from "../FriendSuggestions/FriendSuggestions";
import { useScrollPosition } from "../../utils/useScrollPosition";
import { base64ToObjectURL } from "../../utils/base64ToObjectURL";

const Content: React.FC = () => {
  const [variables, setVariables] = useState({ limit: 10, cursor: null });
  const [{ data, fetching }] = usePostsQuery({
    variables,
    pause: isServer,
  });
  const [{data: loggedUser}] = useLoggedUserQuery();

  const [{ data: stories }] = useGetRecentStoriesQuery();
  const getMorePosts = () => {
    setVariables({
      limit: variables.limit,
      cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
    });
  };
  useScrollPosition(
    [data?.posts.hasMore, data?.posts.posts],
    data?.posts.hasMore && !fetching,
    getMorePosts
  );

  const avatar = useMemo(()=>base64ToObjectURL(loggedUser.loggedUser?.avatarImage), [loggedUser]);

  return (
    <Flex
      maxW="1920px"
      justify="center"
      mt="56px"
      w={{ base: "500px", md: "100%" }}
    >
      <Flex mt="20px" w={{ base: "500px", md: "680px" }}>
        <Box
          position="fixed"
          left="0"
          w="18%"
          pl="4px"
          h="100vh"
          display={{ base: "none", xl: "block" }}
        >
          <PageButton
            text={loggedUser.loggedUser?.user.username}
            image={
              <Avatar
                src={avatar}
              />
            }
            link={"/profile/" + loggedUser.loggedUser?.user._id}
          />
          <PageButton
            text="Friends"
            image={
              <Flex
                w="48px"
                h="48px"
                bgGradient="linear(to-r, teal.500,green.500)"
                color="linear(to-r, teal.500,green.500)"
                borderRadius="50%"
                justify="center"
                align="center"
              >
                <Icon as={FaUserFriends} w="38px" h="38px" />
              </Flex>
            }
            link="/friends"
          />
          <PageButton
            text="Stories"
            image={<Icon as={FcCamera} w="48px" h="48px" />}
            link="/stories"
          />
          <Text position="absolute" bottom="90px" fontSize="14px" ml="10px">
            Michał Warchoł &copy; {new Date().getFullYear()}. All rights
            reserved.
          </Text>
        </Box>
        <Flex w="100%" direction="column">
          <StoriesShortcut
            stories={stories?.getRecentStories}
            myAvatar={loggedUser.loggedUser.avatarImage}
          />
          <PostCreator />
          <FriendSuggestions />
          <Flex w="100%" direction="column" align="center">
            {!data ? (
              <Box p="10px" borderRadius="50%" bg="secondary"><Spinner color="active" size="xl" /></Box>
            ) : (
              data.posts.posts.map((post) => (
                <PostContainer post={post} key={post._id} />
              ))
            )}
            {data && !data.posts.hasMore && (
              <Box mb="10px">
                <Text>No more posts to display</Text>
              </Box>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Content;
