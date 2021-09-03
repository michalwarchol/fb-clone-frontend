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
import {
  Post,
  useCommentCountQuery,
  useGetImageQuery,
  useGetUserByIdQuery,
} from "../../generated/graphql";
import { parseAdvancedDate } from "../../utils/parseAdvancedDate";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import ReactionButton from "./ReactionButton";
import { reactionOrder } from "../../utils/reactionOrder";
import CommentSection from "./CommentSection";
import { isServer } from "../../utils/isServer";
import ImageContainer from "./ImageContainer";

interface PostProps {
  post: Post;
}
const PostContainer: React.FC<PostProps> = ({ post }) => {
  const [openComment, setOpenComment] = useState(false);
  const [{ data }] = useCommentCountQuery({
    variables: { postId: post._id },
    pause: isServer,
  });

  const [{ data: image }] = useGetImageQuery({
    variables: { imageId: post.creator.avatarId },
    pause: !post,
  });

  const handlePostStatus = () => {

    let taggedUsers = post.tagged.map(tag=>{
      const [{data}] = useGetUserByIdQuery({variables: {id: tag}});
      return data?.getUserById;
    })

    let text = post && post.creator.username;
    if (
      !!post.feeling ||
      !!post.activity ||
      taggedUsers.length > 0
    ) {
      text += " is ";
    }
    if (!!post.feeling) {
      text += `feeling ${post.feeling} `;
    }

    if (!!post.activity) {
      text += `${post.activity} `;
    }
    if (taggedUsers.length > 0) {
      text += `with ${taggedUsers[0]?.username}`;
    }
    if (taggedUsers.length > 1) {
      text += `, ${taggedUsers[1]?.username} `;
    }
    if (taggedUsers.length > 2) {
      text += `and ${taggedUsers.length - 2} others`;
    }

    return text;
  }

  const { like, love, care, haha, wow, sad, angry } = post;
  let points = like + love + care + haha + wow + sad + angry;

  let date = parseAdvancedDate(post.createdAt);

  return (
    <Box
      bg="secondary"
      borderRadius="8px"
      mb="20px"
      pt="10px"
      pb="4px"
      w={{base: "451px", sm: "500px", lg: "100%"}}
    >
      <Flex px="10px" mb="10px">
        <Avatar src={image?.getImage} />
        <Flex direction="column" ml="10px">
          <Heading size="sm">
            {handlePostStatus()}
          </Heading>
          <Text fontSize="14px">{date}</Text>
        </Flex>
      </Flex>
      <Text
        fontSize={post.text.length > 250 || !!post.imageId ? "16px" : "26px"}
        px="10px"
      >
        {post.text}
      </Text>
      {!!post.imageId && <ImageContainer imageId={post.imageId} />}
      <Flex mt="10px" mb="4px" justify="space-between" px="10px">
        <Flex align="center">
          <Flex>{reactionOrder(post)}</Flex>
          <Text ml="10px">{points > 0 && points}</Text>
        </Flex>
        <Flex>
          {data &&
            (data.commentCount ? (
              <Text
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => setOpenComment(true)}
              >
                Comments: {data.commentCount}
              </Text>
            ) : (
              ""
            ))}
        </Flex>
      </Flex>
      <Divider
        orientation="horizontal"
        mt="10px"
        mb="4px"
        borderColor="gray.400"
      />
      <Grid templateColumns="1fr 1fr 1fr" px="10px">
        <GridItem mr="4px">
          <ReactionButton postId={post._id} />
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
      <Box>{openComment && <CommentSection postId={post._id} />}</Box>
    </Box>
  );
};
export default PostContainer;
