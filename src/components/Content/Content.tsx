import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { FullUser, usePostsQuery } from "../../generated/graphql";
import PostCreator from "../PostCreator/PostCreator";
import PostContainer from "../Post/PostContainer";
import PageButton from "./PageButton";
import { isServer } from "../../utils/isServer";

interface Props {
  loggedUser: FullUser;
}

const Content: React.FC<Props> = ({loggedUser}) => {
  const [{ data, fetching, error }] = usePostsQuery({ variables: { limit: 10 }, pause: isServer });
  console.log("error: ", error);
  console.log("fetching: ", fetching)
  console.log("data: ", data)
  return (
    <Flex maxW="1920px" justify="center" mt="40px">
      <Flex mt="20px" w={{base: "500px", md: "680px"}}>
        <Box position="fixed" left="0" w="18%" pl="4px">
          <PageButton text={loggedUser?.user.username} image="" link={"/profile?id="+loggedUser?.user._id} />
        </Box>
        <Flex w="100%" direction="column">
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
