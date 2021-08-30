import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { User, UserRequest } from "../../generated/graphql";
import AddFriendButton from "./AddFriendButton";
import Banner from "./Banner";
import FriendsTab from "./FriendsTab";
import PostsTab from "./PostsTab";

interface Props {
  editable: boolean;
  id: number;
  user: User;
  avatarImage: string;
  bannerImage: string;
  isFriend: UserRequest;
}

const Body: React.FC<Props> = ({
  editable,
  id,
  user,
  avatarImage,
  bannerImage,
  isFriend,
}) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  let content;
  if (activeTab == 1) {
    content = (
      <PostsTab
        setActiveTab={setActiveTab}
        user={user}
        id={id}
        editable={editable}
      />
    );
  } else if (activeTab == 2) {
    content = <FriendsTab />;
  }

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
        <Box w={{ base: "100%", lg: "940px" }} my="20px">
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
        <Box w={{ base: "100%", lg: "940px" }} mt="20px">
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
              <Box
                borderBottom={activeTab == 3 ? "4px solid" : undefined}
                color={activeTab == 3 ? "active" : "textPrimary"}
                borderColor="active"
                mr="6px"
              >
                <Button
                  variant="basic"
                  py="30px"
                  onClick={() => setActiveTab(3)}
                >
                  Photos
                </Button>
              </Box>
            </Flex>

            <Flex align="center">
              {!editable && <AddFriendButton user={user} isFriend={isFriend} />}
            </Flex>
          </Flex>
        </Box>
      </Flex>
      {content}
    </Flex>
  );
};
export default Body;
