import {
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverBody,
  PopoverHeader,
  Badge,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { ImExit } from "react-icons/im";
import {
  FullUser,
  useGetNewNotificationsCountQuery,
  useGetUserNotificationsQuery,
  useLogoutMutation,
  useUpdateNotificationStatusMutation,
} from "../../generated/graphql";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import { MdNotificationsActive } from "react-icons/md";
import NotificationNode from "./Notification";
import { isServer } from "../../utils/isServer";
import { base64ToObjectURL } from "../../utils/base64ToObjectURL";

interface Props {
  loggedUser: FullUser;
}

const Options: React.FC<Props> = ({ loggedUser }) => {
  const [{ data }] = useGetUserNotificationsQuery();
  const [{ data: count }] = useGetNewNotificationsCountQuery({
    pause: isServer,
  });
  const [, logout] = useLogoutMutation();
  const [, updateNotificationStatus] = useUpdateNotificationStatusMutation();
  const router = useRouter();
  const [notsOpened, setNotsOpened] = useState(false);

  const updateNotifications = async () => {
    const notifications = data.getUserNotifications.filter((notification) => {
      if (notification.status == "sent") {
        return true;
      }
      return false;
    });
    if (notifications.length > 0) {
      await updateNotificationStatus({
        notifications: notifications.map((n) => n._id),
      });
    }
  };

  return (
    <Flex align="center">
      <NextLink href={"/profile/" + loggedUser.user._id}>
        <Flex
          display={{ base: "none", md: "flex" }}
          direction="row"
          align="center"
          mr="10px"
          px="8px"
          py="4px"
          borderRadius="20px"
          border="1px"
          cursor="pointer"
          color={
            router.query.id == loggedUser.user._id.toString()
              ? "active"
              : "textPrimary"
          }
          borderColor={
            router.query.id == loggedUser.user._id.toString()
              ? "active"
              : "secondary"
          }
          bg={
            router.query.id == loggedUser.user._id.toString()
              ? "activeBackground"
              : "secondary"
          }
          _hover={
            router.query.id == loggedUser.user._id.toString()
              ? { backgroundColor: "blue.700", color: "blue.400" }
              : { backgroundColor: "hover" }
          }
        >
          <Avatar
            src={
              loggedUser.avatarImage
                ? base64ToObjectURL(loggedUser.avatarImage)
                : null
            }
            size="sm"
            mr="4px"
          />
          <Text fontWeight="bold">{loggedUser?.user.username}</Text>
        </Flex>
      </NextLink>
      <Popover closeOnEsc closeOnBlur>
        <PopoverTrigger>
          <Box position="relative" onClick={updateNotifications}>
            <IconButton
              aria-label="notifications"
              borderRadius="50%"
              boxSizing="border-box"
              bg={"tertiary"}
              icon={<MdNotificationsActive />}
              fontSize="24px"
              mr="10px"
              _hover={{
                bg: "hover",
              }}
              _active={{
                filter: "brightness(0.7)",
                color: "active",
                bg: "blue.700",
              }}
              onClick={() => setNotsOpened(true)}
            />
            {count && count.getNewNotificationsCount > 0 && !notsOpened && (
              <Badge
                position="absolute"
                top="0"
                left="30px"
                bg="red.500"
                color="textPrimary"
                borderRadius="50%"
                cursor="pointer"
              >
                {count.getNewNotificationsCount}
              </Badge>
            )}
          </Box>
        </PopoverTrigger>
        <PopoverContent
          bg="secondary"
          border="none"
          borderRadius="8px"
          w="360px"
        >
          <PopoverHeader
            border="none"
            fontSize="28px"
            fontWeight="bold"
            color="textSecondary"
          >
            Notifications
          </PopoverHeader>
          <PopoverBody bg="secondary" borderRadius="8px">
            {data?.getUserNotifications.map((notification, index) => (
              <NotificationNode notification={notification} key={index} />
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Menu>
        <MenuButton
          as={IconButton}
          borderRadius="50%"
          boxSizing="border-box"
          bg={"tertiary"}
          icon={<TiArrowSortedDown />}
          _hover={{
            bg: "hover",
          }}
          _active={{
            filter: "brightness(0.7)",
            color: "active",
            bg: "blue.700",
          }}
        />
        <MenuList w="360px" px="8px" bg="secondary" border={0}>
          <MenuItem
            onClick={() => {
              logout();
              router.reload();
            }}
            bg="secondary"
            borderRadius="8px"
            _focus={{ backgroundColor: "secondary" }}
            _active={{
              bg: "hover",
            }}
            _hover={{
              bg: "hover",
            }}
          >
            <Flex
              w="36px"
              h="36px"
              align="center"
              justify="center"
              borderRadius="50%"
              bg="hover"
              my="8px"
              mr="12px"
            >
              <Icon as={ImExit} w="20px" h="20px" />
            </Flex>
            <Text fontWeight="500">Logout</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
export default Options;
