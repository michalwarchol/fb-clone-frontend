import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import {
  RegularUserFragment,
  useCreatePostMutation,
} from "../../generated/graphql";
import PostCreatorActivityStage from "./PostCreatorActivityStage";
import PostCreatorBasicStage from "./PostCreatorBasicStage";
import PostCreatorDetailActivityStage from "./PostCreatorDetailActivityStage";
import { inDetail } from "../Activities";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: RegularUserFragment | null;
  stage: string;
  setStage: React.Dispatch<React.SetStateAction<string>>;
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
  user,
  stage,
  setStage,
}) => {
  const initialRef = React.useRef(null);
  const [, createPost] = useCreatePostMutation();

  return (
    <Formik
      initialValues={{ text: "", feeling: "", activity: "", prefix: "" }}
      onSubmit={async (values) => {
        await createPost({
          input: {
            text: values.text,
            feeling: values.feeling,
            activity: values.activity,
          },
        });
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
            <ModalContent maxW="500px" bg="tertiary">
              {stage == "basic" && (
                <PostCreatorBasicStage
                  formikProps={formikProps}
                  user={user}
                  initialRef={initialRef}
                  setStage={setStage}
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
