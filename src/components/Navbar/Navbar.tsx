import {
  Avatar,
  Flex,
  Grid,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FaFacebookF, FaUserFriends } from "react-icons/fa";
import NextLink from "next/link";
import {
  FullUser,
  useSearchUsersByUsernameQuery,
} from "../../generated/graphql";
import Options from "./Options";
import { AiFillCamera, AiFillHome } from "react-icons/ai";
import PageButton from "./PageButton";
import { MdMenu, MdSearch } from "react-icons/md";
import { useRouter } from "next/router";
import { base64ToObjectURL } from "../../utils/base64ToObjectURL";

interface Props {
  loggedUser: FullUser;
}

const Navbar: React.FC<Props> = ({ loggedUser }) => {
  const [search, setSearch] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocusRef = useRef();
  const [{ data: searchedUsers }] = useSearchUsersByUsernameQuery({
    variables: { username: search },
  });
  const router = useRouter();
  let bookmarksLink = "/bookmarks";
  if (router.pathname == "/bookmarks") {
    bookmarksLink = "/";
  }

  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      bg="secondary"
      h={"56px"}
      position="fixed"
      w="100%"
      left="0%"
      top="0%"
      zIndex="99"
      borderBottom="1px solid"
      borderColor="hover"
    >
      <GridItem colStart={1} colEnd={4}>
        <Flex h="100%" align="center">
          <NextLink href="/">
            <Flex align="center" h="100%">
              <Icon
                as={FaFacebookF}
                cursor="pointer"
                background="active"
                borderRadius="50%"
                color="white"
                pt="10px"
                fontSize="46px"
                ml="22px"
              />
            </Flex>
          </NextLink>
          <Popover
            isOpen={isOpen && !!search}
            onClose={onClose}
            closeOnEsc
            closeOnBlur
            initialFocusRef={initialFocusRef}
            gutter={30}
          >
            <PopoverTrigger>
              <div></div>
            </PopoverTrigger>
            <PopoverContent border="none" bg="transparent">
              <PopoverBody bg="secondary" borderRadius="8px">
                {searchedUsers &&
                searchedUsers.searchUsersByUsername.length > 0 ? (
                  searchedUsers.searchUsersByUsername.map((user, i) => (
                    <NextLink href={"/profile/" + user._id} key={i}>
                      <Flex
                        align="center"
                        p="4px"
                        borderRadius="8px"
                        _hover={{
                          backgroundColor: "hover",
                          cursor: "pointer",
                        }}
                      >
                        <Avatar
                          size="md"
                          src={
                            user.avatarImage
                              ? base64ToObjectURL(user.avatarImage)
                              : null
                          }
                          mr="10px"
                        />
                        <Text textAlign="center">{user.username}</Text>
                      </Flex>
                    </NextLink>
                  ))
                ) : (
                  <Text>No results found</Text>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <InputGroup
            ml="20px"
            pb={1}
            onClick={() => onOpen()}
            w={{ base: "40px", xl: "60%" }}
            h="80%"
          >
            <InputLeftElement pointerEvents="none" children={<MdSearch />} />
            <Input
              name="search"
              onChange={(e) => {
                setSearch(e.currentTarget.value);
              }}
              _focus={{
                base: {
                  width: "260px",
                  height: "44px",
                  position: "absolute",
                  paddingLeft: "10px",
                  zIndex: "99",
                },
                xl: {
                  width: "100%",
                  height: "initial",
                  position: "initial",
                  paddingLeft: "10px",
                },
              }}
              onBlur={onClose}
              autoComplete="off"
              ref={initialFocusRef}
              focusBorderColor="active"
              border="none"
              placeholder="Search Clonebook"
              color="textPrimary"
              _placeholder={{ textColor: "textPrimary" }}
              borderRadius="16px"
              bgColor="hover"
              pr="0px"
            />
          </InputGroup>
        </Flex>
      </GridItem>
      <GridItem colStart={4} colEnd={9} p="4px 4px 0 4px">
        <Flex justify="center" h="100%" display={{ base: "none", xl: "flex" }}>
          <PageButton route="/" MyIcon={AiFillHome} />
          <PageButton route="/friends" MyIcon={FaUserFriends} />
          <PageButton route="/stories" MyIcon={AiFillCamera} />
        </Flex>
        <Flex ml="20px" h="100%" display={{ base: "flex", xl: "none" }}>
          <PageButton route={bookmarksLink} MyIcon={MdMenu} />
        </Flex>
      </GridItem>
      <GridItem colStart={9} colEnd={13}>
        <Flex justify="flex-end" align="center" h="100%" mr="10px" p="4px">
          <Options loggedUser={loggedUser} />
        </Flex>
      </GridItem>
    </Grid>
  );
};
export default Navbar;
