import { FormControl, FormLabel, InputGroup, Input } from "@chakra-ui/react";
import React, { useRef } from "react";
import { ImTextColor } from "react-icons/im";
import { MdPhotoLibrary } from "react-icons/md";
import StoryType from "./StoryType";

interface Props {
  setStoryType: React.Dispatch<React.SetStateAction<"text" | "photo">>;
  setUploadedImage: React.Dispatch<React.SetStateAction<File>>;
}

const ChooseStory: React.FC<Props> = ({ setStoryType, setUploadedImage }) => {
  const ref = useRef<HTMLInputElement>();
  return (
    <>
      <FormControl w="218px" h="330px" mr="20px">
        <FormLabel textAlign="center">
          <StoryType
            MyIcon={MdPhotoLibrary}
            text="Create A Photo Story"
            type="photo"
            bg="linear(to-r, red.500, yellow.500)"
          />
        </FormLabel>
        <InputGroup display="none">
          <Input
            type="file"
            accept="image/png,image/jpeg"
            ref={ref}
            onChange={(e) => setUploadedImage(e.target.files[0])}
          />
        </InputGroup>
      </FormControl>
      <StoryType
        MyIcon={ImTextColor}
        text="Create A Text Story"
        type="text"
        onClick={setStoryType}
        bg="linear(to-tr, teal.300,yellow.400)"
      />
    </>
  );
};
export default ChooseStory;
