import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  useGetPostsByCreatorIdQuery,
  useLoggedUserQuery,
  User,
  UserRequest,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import PostContainer from "../Post/PostContainer";
import PostCreator from "../PostCreator/PostCreator";
import AddFriendButton from "./AddFriendButton";
import Banner from "./Banner";

interface Props {
  editable: boolean;
  user: User;
  avatarImage: string;
  bannerImage: string;
  isFriend: UserRequest;
}

const Body: React.FC<Props> = ({
  editable,
  user,
  avatarImage,
  bannerImage,
  isFriend
}) => {
  const [{ data }] = useLoggedUserQuery({
    pause: isServer,
  });

  const [{ data: userPosts }] = useGetPostsByCreatorIdQuery({
    variables: { creatorId: user?._id, limit: 10 },
    pause: !user
  });

  
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <Flex
      mt="20px"
      w="100%"
      justify="center"
      align="center"
      bg="primary"
      direction="column"
    >
      <Flex
        bg="secondary"
        justify="center"
        align="center"
        direction="column"
        w="100%"
      >
        <Banner
          editable={editable}
          avatarImage={avatarImage}
          bannerImage={bannerImage}
        />
        <Box w={{ base: "100%", md: "940px" }} my="20px">
          <Text
            textAlign="center"
            fontWeight="bold"
            fontSize="32px"
            color="textSecondary"
          >
            {user?.username}
          </Text>
          {editable && (
            <Text
              color="active"
              fontWeight="500"
              textAlign="center"
              _hover={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Add Bio
            </Text>
          )}
        </Box>
        <Divider
          orientation="horizontal"
          borderColor="gray.400"
          w={{ base: "100%", md: "940px" }}
        />
        <Flex py="4px" w={{ base: "100%", md: "940px" }} justify="space-between">
          <Flex>
            <Box
              borderBottom={activeTab == 1 ? "4px solid" : undefined}
              color={activeTab == 1 ? "active" : "textPrimary"}
              borderColor="active"
              mr="6px"
            >
              <Button variant="basic" py="30px" onClick={() => setActiveTab(1)}>
                Posts
              </Button>
            </Box>
            <Box
              borderBottom={activeTab == 2 ? "4px solid" : undefined}
              color={activeTab == 2 ? "active" : "textPrimary"}
              borderColor="active"
              mr="6px"
            >
              <Button variant="basic" py="30px" onClick={() => setActiveTab(2)}>
                Friends
              </Button>
            </Box>
            <Box
              borderBottom={activeTab == 3 ? "4px solid" : undefined}
              color={activeTab == 3 ? "active" : "textPrimary"}
              borderColor="active"
              mr="6px"
            >
              <Button variant="basic" py="30px" onClick={() => setActiveTab(3)}>
                Photos
              </Button>
            </Box>
          </Flex>

          <Flex align="center">
            {!editable && <AddFriendButton user={user} isFriend={isFriend} />}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        direction="row"
        bg="primary"
        w={{ base: "100%", md: "940px" }}
        mt="16px"
      >
        <Box w="40%" mr="16px" bg="secondary" borderRadius="8px">
          cos tam
        </Box>
        <Box w="60%" borderRadius="8px">
          {editable && <PostCreator loggedUser={data?.loggedUser} />}
          <Box w="100%">
            {!userPosts ? (
              <div>loading</div>
            ) : (
              userPosts.getPostsByCreatorId.posts.map((post) => (
                <PostContainer post={post} key={post._id} />
              ))
            )}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
export default Body;
