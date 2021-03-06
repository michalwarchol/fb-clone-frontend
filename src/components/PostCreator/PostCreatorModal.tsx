import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import {
  NotificationType,
  useCreateNotificationMutation,
  useCreatePostMutation,
  useLoggedUserQuery,
} from "../../generated/graphql";
import PostCreatorActivityStage from "./PostCreatorActivityStage";
import PostCreatorBasicStage from "./PostCreatorBasicStage";
import PostCreatorDetailActivityStage from "./PostCreatorDetailActivityStage";
import { inDetail } from "../Activities";
import PostCreatorTagPeopleStage from "./PostCreatorTagPeopleStage";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  stage: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  img: File;
  setImg: React.Dispatch<React.SetStateAction<File>>;
}

export interface FormProps {
  text: string;
  feeling: string;
  activity: string;
  prefix: string;
}

const PostCreatorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  stage,
  setStage,
  img,
  setImg,
}) => {
  const initialRef = React.useRef(null);
  const [, createPost] = useCreatePostMutation();
  const [, createNotification] = useCreateNotificationMutation();
  const [{data: user}] = useLoggedUserQuery();
  const [tagged, setTagged] = useState<{ _id: number; username: string }[]>([]);

  return (
    <Formik
      initialValues={{ text: "", feeling: "", activity: "", prefix: "" }}
      onSubmit={async (values, {resetForm}) => {
        const post = await createPost({
          input: {
            text: values.text,
            feeling: values.feeling,
            activity: values.activity,
            tagged: tagged.map((tag) => tag._id),
          },
          image: img,
        });

        Promise.all(
          tagged.map(async (tag) => {
            await createNotification({
              input: {
                receiverId: tag._id,
                info: "tagged you in a post.",
                type: NotificationType.Tag,
                postId: post.data.createPost._id,
                link: "/profile/"+user.loggedUser.user._id
              },
            });
          })
        );
        resetForm({values: { text: "", feeling: "", activity: "", prefix: "" }});
        setImg(null);
        setTagged([]);
        onClose();
      }}
    >
      {(formikProps) => (
        <Form>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            initialFocusRef={initialRef}
            onEsc={() => setStage("basic")}
            onOverlayClick={() => setStage("basic")}
          >
            <ModalOverlay />
            <ModalContent maxW="500px" bg="tertiary" maxH="800px">
              {stage == "basic" && (
                <PostCreatorBasicStage
                  formikProps={formikProps}
                  initialRef={initialRef}
                  setStage={setStage}
                  img={img}
                  setImg={setImg}
                  tagged={tagged}
                />
              )}
              {stage == "tag" && (
                <PostCreatorTagPeopleStage
                  setStage={setStage}
                  tagged={tagged}
                  setTagged={setTagged}
                />
              )}
              {stage == "activity" && (
                <PostCreatorActivityStage
                  formikProps={formikProps}
                  setStage={setStage}
                />
              )}
              {stage == "details" && (
                <PostCreatorDetailActivityStage
                  formikProps={formikProps}
                  setStage={setStage}
                  details={inDetail[formikProps.values.prefix.slice(3)]}
                />
              )}
            </ModalContent>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};
export default PostCreatorModal;
