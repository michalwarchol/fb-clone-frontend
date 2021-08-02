import {
  Divider,
  Flex,
  IconButton,
  ModalBody,
  ModalHeader,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Field, FormikProps } from "formik";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import FEELINGS from "../Feelings";
import ACTIVITIES from "../Activities";
import { FormProps } from "./PostCreatorModal";

interface Props {
  formikProps: FormikProps<FormProps>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

type MyRadioButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
  feeling: string;
  feelingProp: string;
  formikProps: FormikProps<FormProps>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  isActivity: boolean
};

const MyRadio: React.FC<MyRadioButtonProps> = ({
  feeling,
  feelingProp,
  formikProps,
  setStage,
  isActivity,
  ...props
}) => {
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      setStage("basic");
    }
  }, [formikProps]);

  const updateSecondProp = () => {
    if(isActivity){
      formikProps.values.feeling="";
    }else{
      formikProps.values.activity="";
    }
  }

  return (
    <Flex
      align="center"
      width="50%"
      py="10px"
      pl="10px"
      as="label"
      borderRadius="8px"
      bg={feeling == feelingProp ? "primary" : null}
      _hover={{ backgroundColor: "hover", cursor: "pointer" }}
      onClick={updateSecondProp}
    >
      <Field type="radio" value={feeling} {...props} hidden />
      <Text color="textPrimary" fontWeight="bold" ml="10px">
        {feeling}
      </Text>
    </Flex>
  );
};

const PostCreatorActivityStage: React.FC<Props> = ({
  setStage,
  formikProps,
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <>
      <ModalHeader textAlign="center" color="textSecondary">
        <Flex direction="row">
          <IconButton
            aria-label="arrow-left"
            icon={<BsArrowLeftShort />}
            bg="tertiary"
            borderRadius="50%"
            fontSize="24px"
            color="textPrimary"
            _hover={{ backgroundColor: "hover" }}
            _active={{ backgroundColor: "hover" }}
            onClick={() => setStage("basic")}
          />
          <Text mx="auto" pr="20px">
            {tabIndex ? "What are you doing?" : "How are you feeling?"}
          </Text>
        </Flex>
      </ModalHeader>
      <Divider orientation="horizontal" my="10px" borderColor="hover" />
      <ModalBody>
        <Tabs onChange={(index) => setTabIndex(index)} borderColor="tertiary">
          <TabList mb="20px">
            <Tab color="textPrimary" fontWeight="bold">
              Feelings
            </Tab>
            <Tab color="textPrimary" fontWeight="bold">
              Activities
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel p="0">
              <Flex direction="row" wrap="wrap">
                {FEELINGS.map((feeling) => (
                  <MyRadio
                    name="feeling"
                    feeling={feeling}
                    feelingProp={formikProps.values.feeling}
                    setStage={setStage}
                    isActivity={false}
                    formikProps={formikProps}
                  />
                ))}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex direction="row" wrap="wrap">
                {ACTIVITIES.map((activity) => (
                  <MyRadio
                    name="activity"
                    feeling={activity}
                    feelingProp={formikProps.values.activity}
                    setStage={setStage}
                    isActivity={true}
                    formikProps={formikProps}
                  />
                ))}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalBody>
    </>
  );
};
export default PostCreatorActivityStage;
