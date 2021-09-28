import { Avatar } from "@chakra-ui/avatar";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { FaFlag } from "react-icons/fa";
import {
  Notification,
  NotificationType,
  useGetImageQuery,
} from "../../generated/graphql";
import { makeNotificationInfo } from "../../utils/makeNotificationInfo";
import { parseAdvancedDate } from "../../utils/parseAdvancedDate";
import NextLink from "next/link";
import { base64ToObjectURL } from "../../utils/base64ToObjectURL";

interface Props {
  notification: Notification;
}

const NotificationNode: React.FC<Props> = ({ notification }) => {
  const [{ data: avatar }] = useGetImageQuery({
    variables: { imageId: notification.triggerUser.avatarId },
  });

  let image = <Icon as={FaFlag} bg="active" w="30px" h="30px" />;
  if (notification.type != NotificationType.Info) {
    image = (
      <Avatar
        src={avatar?.getImage ? base64ToObjectURL(avatar.getImage) : null}
        size="lg"
      />
    );
  }

  return (
    <NextLink href={notification.link}>
      <Box
        p="8px"
        borderRadius="8px"
        _hover={{ backgroundColor: "hover", cursor: "pointer" }}
      >
        <Flex>
          <Box mr="10px">
            <Flex
              justify="center"
              align="center"
              w="60px"
              h="60px"
              bg="active"
              borderRadius="50%"
            >
              {image}
            </Flex>
          </Box>
          <Box>
            {makeNotificationInfo(notification)}
            <Text color="active">
              {parseAdvancedDate(notification.createdAt)}
            </Text>
          </Box>
        </Flex>
      </Box>
    </NextLink>
  );
};
export default NotificationNode;
