import {
  Modal, ModalContent, ModalOverlay
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { RegularUserFragment } from "../../generated/graphql";
import PostCreatorActivityStage from "./PostCreatorActivityStage";
import PostCreatorBasicStage from "./PostCreatorBasicStage";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: RegularUserFragment | null;
  stage: string,
  setStage: React.Dispatch<React.SetStateAction<string>>
}

export interface FormProps {
  text: string,
  feeling: string,
  activity: string
}

const PostCreatorModal: React.FC<Props> = ({ isOpen, onClose, user, stage, setStage }) => {
  const initialRef = React.useRef(null);

  return (
    <Formik
      initialValues={{text: "", feeling: "", activity: ""}}
      onSubmit={async (values, { setErrors }) => {
        console.log(values);
        // const response = await register({ credentials: values });
        // if (response.data?.register.errors) {
        //   setErrors(toErrorMap(response.data.register.errors));
        // } else if (response.data?.register.user) {
        //   router.push("/");
        // }
      }}
    >
      {(formikProps) => (
        <Form>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            initialFocusRef={initialRef}
            onEsc={()=>setStage("basic")}
            onOverlayClick={()=>setStage("basic")}
          >
            <ModalOverlay />
            <ModalContent maxW="500px" bg="tertiary">
              {stage=="basic" && <PostCreatorBasicStage formikProps={formikProps} user={user} initialRef={initialRef} setStage={setStage} />}
              {stage=="activity" && <PostCreatorActivityStage formikProps={formikProps} setStage={setStage} />}
            </ModalContent>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};
export default PostCreatorModal;
