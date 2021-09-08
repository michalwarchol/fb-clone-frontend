import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { Story } from "../../generated/graphql";
import { HiOutlinePlusSm } from "react-icons/hi";
import NextLink from "next/link";
import Shortcut from "./Shortcut";

interface Props {
  stories?: Story[];
  myAvatar: string;
}

const StoriesShortcut: React.FC<Props> = ({ stories, myAvatar }) => {
    let seen = [];
    let uniqueStories = stories?.filter((story, index, arr)=>{
        if(seen.indexOf(story.userId)){
            seen.push(story.userId);
            return true;
        }
        return false;
    }).slice(0,5);

    console.log(uniqueStories)
  return (
    <Flex mb="20px">
      <NextLink href="/stories/create">
        <Box
          w="16%"
          h={{base: "140px", md: "190px"}}
          borderRadius="8px"
          overflow="hidden"
          cursor="pointer"
          _hover={{ cursor: "pointer", filter: 'brightness(80%)' }}
        >
          <Image src={myAvatar} h={{base: "60%", md: "70%"}} w="100%" objectFit="cover" />
          <Flex
            position="relative"
            bg="secondary"
            h={{base: "40%", md: "30%"}}
            align="center"
            justify="center"
          >
            <Icon
              as={HiOutlinePlusSm}
              position="absolute"
              bg="active"
              borderWidth="6px"
              borderColor="secondary"
              top="-20px"
              m="0 auto"
              fontSize="40px"
              borderRadius="50%"
            />
            <Text fontWeight="bold" fontSize="14px" pt="20px" pb="10px">
              Create Story
            </Text>
          </Flex>
        </Box>
      </NextLink>
      {uniqueStories?.map((elem, i) => <Shortcut story={elem} />)}
    </Flex>
  );
};
export default StoriesShortcut;
