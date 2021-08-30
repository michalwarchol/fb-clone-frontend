import { Flex } from "@chakra-ui/react";
import React from "react";
import {
  useGetPostsByCreatorIdQuery,
  useLoggedUserQuery,
  User,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
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
  const [{ data }] = useLoggedUserQuery({
    pause: isServer,
  });
  const [{ data: userPosts }] = useGetPostsByCreatorIdQuery({
    variables: { creatorId: user?._id, limit: 10 },
    pause: !user,
  });
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      bg="primary"
      w={{ base: "100%", lg: "940px" }}
      mt="16px"
      align={{ base: "center", lg: "flex-start" }}
    >
      <Flex
        w={{ base: "451px", sm: "500px", lg: "40%" }}
        mr={{ base: "0px", lg: "16px" }}
        mb={{ base: "16px", lg: "0" }}
      >
        <FriendSection id={id} setActiveTab={setActiveTab} />
      </Flex>
      <Flex
        w={{ base: "90%", md: "60%" }}
        borderRadius="8px"
        direction="column"
        align="center"
      >
        {editable && <PostCreator loggedUser={data?.loggedUser} />}
        <Flex w="100%" direction="column" align="center">
          {!userPosts ? (
            <div>loading</div>
          ) : (
            userPosts.getPostsByCreatorId.posts.map((post) => (
              <PostContainer post={post} key={post._id} />
            ))
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostsTab;
