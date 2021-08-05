import {
  Button,
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
import { FormikProps } from "formik";
import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import FEELINGS from "../Feelings";
import ACTIVITIES from "../Activities";
import { FormProps } from "./PostCreatorModal";

interface Props {
  formikProps: FormikProps<FormProps>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
}

const PostCreatorActivityStage: React.FC<Props> = ({
  setStage,
  formikProps,
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const clickFeeling = (feeling: string) => {
    if (feeling == formikProps.values.feeling) {
      formikProps.values.feeling = "";
    } else {
      formikProps.values.feeling = feeling;
    }
    formikProps.values.activity = "";
    formikProps.values.prefix = "";
    setStage("basic");
  };

  const handleClick = (activity: string) => {
    formikProps.values.prefix = activity;
    setStage("details");
  };

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
                  <Button
                    onClick={() => clickFeeling(feeling)}
                    _hover={{ backgroundColor: "hover", cursor: "pointer" }}
                    color="textPrimary"
                    w="50%"
                    bg={feeling==formikProps.values.feeling?"secondary":"tertiary"}
                  >
                    <Text w="100%" textAlign="start">
                      {feeling}
                    </Text>
                  </Button>
                ))}
              </Flex>
            </TabPanel>
            <TabPanel p="0">
              <Flex direction="column">
                {ACTIVITIES.map((activity) => (
                  <Button
                    onClick={() => handleClick(activity)}
                    rightIcon={<MdKeyboardArrowRight size="26px" />}
                    bg={activity==formikProps.values.activity?"secondary":"tertiary"}
                    _hover={{ backgroundColor: "hover", cursor: "pointer" }}
                    color="textPrimary"
                  >
                    <Text w="100%" textAlign="start">
                      {activity}
                    </Text>
                  </Button>
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
