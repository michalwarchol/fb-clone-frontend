import { Avatar, Box, Divider, Flex, Textarea } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import autosize from "autosize";

const CommentSection: React.FC = () => {
  const ref = useRef();
  useEffect(() => {
    autosize(ref.current);
    return () => {
      autosize.destroy(ref.current);
    };
  }, []);
  return (
    <Box>
      <Divider
        orientation="horizontal"
        mt="4px"
        mb="4px"
        borderColor="gray.400"
      />
      <Flex mt="20px">
        <Avatar size="sm" mr="10px" />
        <Textarea
          placeholder="Write a comment..."
          resize="none"
          overflow="auto"
          bg="hover"
          border="none"
          rows={1}
          borderRadius="20px"
          ref={ref}
          autoFocus
        />
      </Flex>
    </Box>
  );
};
export default CommentSection;
