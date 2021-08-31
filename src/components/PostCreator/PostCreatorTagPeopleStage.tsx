import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  ModalBody,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useGetSuggestedFriendTagsQuery } from "../../generated/graphql";
import SuggestedFriendNote from "./SuggestedFriendNote";

interface Props {
  setStage: React.Dispatch<React.SetStateAction<string>>;
  tagged: { _id: number; username: string }[];
  setTagged: React.Dispatch<
    React.SetStateAction<
      {
        _id: number;
        username: string;
      }[]
    >
  >;
}

const PostCreatorTagPeopleStage: React.FC<Props> = ({ setStage, tagged, setTagged }) => {
  const [search, setSearch] = useState<string>("");
  const [{ data }] = useGetSuggestedFriendTagsQuery({
    variables: { searchName: search },
  });

  const removeTag = (id: number) => {
    let t = tagged.filter((tag) => tag._id != id);
    setTagged(t);
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
            Tag People
          </Text>
        </Flex>
      </ModalHeader>
      <Divider orientation="horizontal" my="10px" borderColor="hover" />
      <ModalBody>
        <Flex mb="20px">
          <InputGroup color="textPrimary">
            <InputLeftElement
              color="textPrimary"
              pointerEvents="none"
              children={<FaSearch />}
            />
            <Input
              value={search}
              onInput={(e) => setSearch(e.currentTarget.value)}
              placeholder="Search"
              botderRadius="8px"
              border="none"
              bg="hover"
            />
          </InputGroup>
          <Button variant="base" color="active" onClick={()=>setStage("basic")}>
            Done
          </Button>
        </Flex>
        <Box>
          <Box>
            {tagged.length > 0 && (
              <Box mb="10px">
                <Text color="gray" fontSize="16px">
                  Tagged
                </Text>
                <Flex
                  border="1px"
                  borderColor="hover"
                  p="8px"
                  borderRadius="8px"
                  mt="10px"
                >
                  {tagged.map((tag) => (
                    <Box
                      color="active"
                      bg="activeBackground"
                      px="8px"
                      borderRadius="4px"
                      mx="4px"
                    >
                      {tag.username}
                      <IconButton
                        variant="active"
                        size="sm"
                        aria-label="remove-tag"
                        borderRadius="50%"
                        icon={<MdClose />}
                        onClick={() => removeTag(tag._id)}
                      />
                    </Box>
                  ))}
                </Flex>
              </Box>
            )}
            <Text color="gray" fontSize="14px">
              SUGGESTIONS
            </Text>
          </Box>
          <Box mt="10px">
            {data &&
              data.getSuggestedFriendTags.map((friend) => (
                <SuggestedFriendNote
                  friend={friend}
                  tagged={tagged}
                  setTagged={setTagged}
                />
              ))}
          </Box>
        </Box>
      </ModalBody>
    </>
  );
};
export default PostCreatorTagPeopleStage;
