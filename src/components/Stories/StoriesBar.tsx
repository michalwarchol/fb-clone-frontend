import Icon from "@chakra-ui/icon";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { BsPlus } from "react-icons/bs";
import NextLink from "next/link";
import { useGetRecentStoriesQuery } from "../../generated/graphql";
import StoryNode from "./StoryNode";

const StoriesBar: React.FC = () => {
  
    const [{ data }] = useGetRecentStoriesQuery();
    let seen = [];
  let uniqueStories = data?.getRecentStories
    ?.filter((story) => {
      if (!(story.userId in seen)) {
        seen[story.userId] = 1;
        return true;
      }
      seen[story.userId]+=1;
      return false;
    });

    console.log(seen)

    const stories = uniqueStories?.map((elem)=>{
        return {
            story: elem,
            length: seen[elem.creator._id]
        }
    })

  return (
    <Box
      w="360px"
      h="100vh"
      position="fixed"
      left="0"
      pt="12px"
      px="16px"
      bg="secondary"
    >
      <Box mb="40px">
        <Text fontWeight="bold" fontSize="28px">
          Stories
        </Text>
      </Box>
      <Box>
        <Text fontSize="18px" fontWeight="500">
          Your Story
        </Text>
        <NextLink href="/stories/create">
          <Flex my="20px" align="center" cursor="pointer">
            <Icon
              as={BsPlus}
              bg="hover"
              fontSize="60px"
              p="10px"
              borderRadius="50%"
              color="active"
              mr="10px"
            />
            <Box>
              <Text fontWeight="bold">Create a Story</Text>
              <Text color="gray" fontSize="13px">
                Share a photo or write something.
              </Text>
            </Box>
          </Flex>
        </NextLink>
      </Box>
      <Box>
        <Text fontWeight="bold">All Stories</Text>
        <Box>{
                stories?.map(elem=><StoryNode story={elem} />)
            }</Box>
      </Box>
    </Box>
  );
};
export default StoriesBar;
