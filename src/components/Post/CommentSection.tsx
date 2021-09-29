import {
  Avatar,
  Box,
  Divider,
  Flex,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import autosize from "autosize";
import {
  NotificationType,
  useCreateCommentMutation,
  useCreateNotificationMutation,
  useGetPostCommentsQuery,
  useLoggedUserQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import CommentNote from "./Comment";
import { Form, Formik } from "formik";
import { base64ToObjectURL } from "../../utils/base64ToObjectURL";

interface Props {
  postId: number;
  creatorId: number;
}

const CommentSection: React.FC<Props> = ({ postId, creatorId }) => {
  const [variables, setVariables] = useState({ limit: 5, cursor: null });
  const [{ data, fetching }] = useGetPostCommentsQuery({
    pause: isServer,
    variables: { postId, ...variables },
  });
  const [, createComment] = useCreateCommentMutation();
  const [, createNotification] = useCreateNotificationMutation();
  const [{ data: loggedUser }] = useLoggedUserQuery();
  const avatar = useMemo(
    () => base64ToObjectURL(loggedUser?.loggedUser.avatarImage),
    [loggedUser]
  );
  const ref = useRef<HTMLTextAreaElement>();
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
        <Avatar size="sm" mr="10px" src={avatar} />
        <Formik
          initialValues={{ text: "" }}
          onSubmit={async (values, { setValues }) => {
            if (values.text.length < 1) {
              return;
            }
            await createComment(
              { postId, text: values.text }
            );
            await createNotification({
              input: {
                info: "commented your post.",
                receiverId: creatorId,
                type: NotificationType.Comment,
                link: "/profile/" + creatorId,
                postId,
              },
            });
            setValues({ text: "" });
            setVariables({
              limit: data?.getPostComments.comments.length,
              cursor: null,
            });
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
                    e.preventDefault();
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
          <Box>
            {data.getPostComments.comments.map((comment) => (
              <CommentNote data={comment} key={comment._id} />
            ))}
            {data.getPostComments.hasMore && (
              <Text
                mt="10px"
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
                fontWeight="500"
                onClick={() =>
                  setVariables({
                    limit: 5,
                    cursor:
                      data.getPostComments.comments[
                        data.getPostComments.comments.length - 1
                      ].createdAt,
                  })
                }
              >
                View more comments{" "}
                {fetching && <Spinner color="textPrimary" size="sm" />}
              </Text>
            )}
            <Text
              _hover={{ textDecoration: "underline", cursor: "pointer" }}
              fontWeight="500"
              onClick={() => {
                ref.current.focus();
              }}
            >
              Write a comment...
            </Text>
          </Box>
        )}
      </Box>
      <Box></Box>
    </Box>
  );
};
export default CommentSection;
