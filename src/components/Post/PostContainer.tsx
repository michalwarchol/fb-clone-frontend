import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Post } from "../../generated/graphql";
import { parseAdvancedDate } from "../../utils/parseAdvancedDate";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import ReactionButton from "./ReactionButton";
import { reactionOrder } from "../../utils/reactionOrder";
import CommentSection from "./CommentSection";

interface PostProps {
  data: Post;
}
const PostContainer: React.FC<PostProps> = ({ data }) => {
  const [openComment, setOpenComment] = useState(false);

  const { like, love, care, haha, wow, sad, angry } = data;
  let points = like + love + care + haha + wow + sad + angry;

  let date = parseAdvancedDate(data.createdAt);
  return (
    <Box
      bg="secondary"
      borderRadius="8px"
      mt="20px"
      px="10px"
      pt="10px"
      pb="4px"
    >
      <Flex>
        <Avatar />
        <Flex direction="column" ml="10px">
          <Heading size="sm">
            {data.creator.username} {data.activity}
          </Heading>
          <Text fontSize="14px">{date}</Text>
        </Flex>
      </Flex>
      <Text fontSize={data.text.length > 250 ? "16px" : "26px"}>
        {data.text}
      </Text>
      <Flex mt="10px" mb="4px">
        <Flex align="center">
          <Flex>{reactionOrder(data)}</Flex>
          <Text ml="10px">{points > 0 && points}</Text>
        </Flex>
      </Flex>
      <Divider
        orientation="horizontal"
        mt="10px"
        mb="4px"
        borderColor="gray.400"
      />
      <Grid templateColumns="1fr 1fr 1fr">
        <GridItem mr="4px">
          <ReactionButton postId={data._id} />
        </GridItem>
        <GridItem mr="4px">
          <Button
            bg="secondary"
            _hover={{ backgroundColor: "hover" }}
            _active={{ backgroundColor: "hover" }}
            w="100%"
            leftIcon={<BiComment />}
            onClick={() => setOpenComment(true)}
          >
            Comment
          </Button>
        </GridItem>
        <GridItem>
          <Button
            bg="secondary"
            _hover={{ backgroundColor: "hover" }}
            _active={{ backgroundColor: "hover" }}
            w="100%"
            leftIcon={<RiShareForwardLine />}
          >
            Share
          </Button>
        </GridItem>
      </Grid>
      <Box>
        {openComment && (
          <CommentSection />
        )}
      </Box>
    </Box>
  );
};
export default PostContainer;
