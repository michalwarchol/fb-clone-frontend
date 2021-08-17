import {
  Avatar,
  Box,
  Divider,
  Flex,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import autosize from "autosize";
import {
  useCreateCommentMutation,
  useGetPostCommentsQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import CommentNote from "./Comment";
import { Form, Formik } from "formik";

interface Props {
  postId: number;
}

const CommentSection: React.FC<Props> = ({ postId }) => {

  const [{ data }] = useGetPostCommentsQuery({
    pause: isServer,
    variables: { postId },
  });
  const [,createComment] = useCreateCommentMutation();
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
      <Flex mt="20px" pb="4px">
        <Avatar size="sm" mr="10px" />
        <Formik
          initialValues={{ text: "" }}
          onSubmit={async (values, {setValues}) => {
            if(values.text.length<1){
              return;
            }
            await createComment({postId, text: values.text});
            setValues({text: ""});
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form style={{ width: "100%" }}>
              <Textarea
                name="text"
                id="text"
                value={values.text}
                onChange={handleChange}
                placeholder="Write a comment..."
                resize="none"
                overflow="auto"
                bg="hover"
                border="none"
                rows={1}
                borderRadius="20px"
                ref={ref}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key == "Enter" && !e.shiftKey) {
                    handleSubmit();
                  }
                }}
              />
            </Form>
          )}
        </Formik>
      </Flex>
      <Box>
        {!data ? (
          <Flex justify="center">
            <Spinner color="textPrimary" size="md" />
          </Flex>
        ) : (
          data.getPostComments.map((comment) => <CommentNote data={comment} key={comment._id}/>)
        )}
      </Box>
    </Box>
  );
};
export default CommentSection;
