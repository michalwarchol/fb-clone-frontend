import { Avatar, Box, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { FullUser, useGetRecentStoriesQuery, usePostsQuery } from "../../generated/graphql";
import PostCreator from "../PostCreator/PostCreator";
import PostContainer from "../Post/PostContainer";
import PageButton from "./PageButton";
import { isServer } from "../../utils/isServer";
import { FaUserFriends } from "react-icons/fa";
import StoriesShortcut from "./StoriesShortcut";

interface Props {
  loggedUser: FullUser;
}

const Content: React.FC<Props> = ({ loggedUser }) => {
  const [{ data }] = usePostsQuery({
    variables: { limit: 10 },
    pause: isServer,
  });

  const [{data: stories}] = useGetRecentStoriesQuery();

  return (
    <Flex maxW="1920px" justify="center" mt="56px">
      <Flex mt="20px" w={{ base: "500px", md: "680px" }}>
        <Box position="fixed" left="0" w="18%" pl="4px" display={{base: "none", xl: "block"}}>
          <PageButton
            text={loggedUser?.user.username}
            image={<Avatar src={loggedUser.avatarImage} />}
            link={"/profile/" + loggedUser?.user._id}
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
        </Box>
        <Flex w="100%" direction="column">
          <StoriesShortcut stories={stories?.getRecentStories} myAvatar={loggedUser.avatarImage}/>
          <PostCreator loggedUser={loggedUser} />
          <Box w="100%">
            {!data ? (
              <div>loading</div>
            ) : (
              data.posts.posts.map((post) => (
                <PostContainer post={post} key={post._id} />
              ))
            )}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Content;
