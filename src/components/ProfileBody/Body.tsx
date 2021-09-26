import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FullUser,
  useGetFriendRequestQuery,
  useGetImageQuery,
  useGetUserByIdQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import AddFriendButton from "./AddFriendButton";
import Banner from "./Banner";
import FriendsTab from "./FriendsTab";
import PostsTab from "./PostsTab";

interface Props {
  editable: boolean;
  id: number;
  loggedUser: FullUser;
}

const Body: React.FC<Props> = ({ editable, id, loggedUser }) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const [{ data: user }] = useGetUserByIdQuery({
    variables: { id },
    pause: isServer,
  });

  const [{ data: avatarImage }] = useGetImageQuery({
    variables: { imageId: user?.getUserById.avatarId },
    pause: !user?.getUserById,
  });

  const [{ data: bannerImage }] = useGetImageQuery({
    variables: { imageId: user?.getUserById.bannerId },
    pause: !user?.getUserById,
  });

  const [{ data: isFriend }] = useGetFriendRequestQuery({
    variables: { userId: id },
  });

  let content = (
    <PostsTab
      setActiveTab={setActiveTab}
      user={user?.getUserById}
      id={id}
      editable={editable}
    />
  );
  if (activeTab == 2) {
    content = <FriendsTab id={id} />;
  }

  return (
    <Flex
      mt="20px"
      w="100%"
      justify="center"
      align="center"
      bg="primary"
      direction="column"
      overflowY="hidden"
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
          avatarImage={avatarImage?.getImage}
          bannerImage={bannerImage?.getImage}
        />
        <Box w={{ base: "100%", lg: "876px" }} my="20px">
          <Text
            textAlign="center"
            fontWeight="bold"
            fontSize="32px"
            color="textSecondary"
          >
            {user?.getUserById.username}
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
        <Box w={{ base: "100%", lg: "876px" }} mt="20px">
          <Divider orientation="horizontal" borderColor="gray.400" />
          <Flex py="4px" justify="space-between">
            <Flex>
              <Box
                borderBottom={activeTab == 1 ? "4px solid" : undefined}
                color={activeTab == 1 ? "active" : "textPrimary"}
                borderColor="active"
                mr="6px"
              >
                <Button
                  variant="basic"
                  py="30px"
                  onClick={() => setActiveTab(1)}
                >
                  Posts
                </Button>
              </Box>
              <Box
                borderBottom={activeTab == 2 ? "4px solid" : undefined}
                color={activeTab == 2 ? "active" : "textPrimary"}
                borderColor="active"
                mr="6px"
              >
                <Button
                  variant="basic"
                  py="30px"
                  onClick={() => setActiveTab(2)}
                >
                  Friends
                </Button>
              </Box>
            </Flex>

            <Flex align="center">
              {!editable && (
                <AddFriendButton
                  user={user?.getUserById}
                  isFriend={isFriend?.getFriendRequest}
                  loggedUserId={loggedUser.user._id}
                />
              )}
            </Flex>
          </Flex>
        </Box>
      </Flex>
      {content}
    </Flex>
  );
};
export default Body;
