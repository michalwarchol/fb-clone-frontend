import {
  Badge,
  Button,
  Divider,
  Flex,
  IconButton,
  ModalBody,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { FormProps } from "./PostCreatorModal";

interface Props {
  formikProps: FormikProps<FormProps>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  details: string[];
}

const PostCreatorDetailActivityStage: React.FC<Props> = ({
  setStage,
  details,
  formikProps,
}) => {
  const formatValue = (prefix: string, detail: string) => {
    return (
      detail.slice(0, 2) + prefix.slice(2).toLowerCase() + " " + detail.slice(2)
    );
  };

  const closeBadge = () => {
    formikProps.values.prefix = "";
    setStage("activity");
  };

  const clickDetail = (detail: string) => {
    if(formatValue(formikProps.values.prefix, detail) ==
    formikProps.values.activity){
      formikProps.values.activity="";
    }else{
      formikProps.values.activity=formatValue(formikProps.values.prefix, detail);
    }
    formikProps.values.feeling="";
    setStage("basic");
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
            onClick={() => setStage("activity")}
          />
          <Text mx="auto" pr="20px">
            What are you doing?
          </Text>
        </Flex>
      </ModalHeader>
      <Divider orientation="horizontal" my="10px" borderColor="hover" />
      <ModalBody>
        <Flex align="center">
          <Badge
            bg="rgba(45, 134, 255, 0.2)"
            variant="solid"
            color="active"
            borderRadius="4px"
            px="10px"
            mr="10px"
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Text mr="5px">{formikProps.values.prefix.slice(3)}...</Text>
            <IconButton
              aria-label="cancel"
              icon={<MdClose />}
              bg="transparent"
              color="active"
              borderRadius="50%"
              _hover={{ backgroundColor: "rgba(45, 134, 255, 0.4)" }}
              _active={{ backgroundColor: "rgba(45, 134, 255, 0.4)" }}
              onClick={closeBadge}
            />
          </Badge>
        </Flex>
        <Flex direction="row" wrap="wrap">
          {details.map((detail) => (
            <Button
              onClick={() => clickDetail(detail)}
              _hover={{ backgroundColor: "hover", cursor: "pointer" }}
              color="textPrimary"
              w="50%"
              bg={
                formatValue(formikProps.values.prefix, detail) ==
                formikProps.values.activity
                  ? "secondary"
                  : "tertiary"
              }
            >
              <Text w="100%" textAlign="start">
                {detail}
              </Text>
            </Button>
          ))}
        </Flex>
      </ModalBody>
    </>
  );
};
export default PostCreatorDetailActivityStage;
