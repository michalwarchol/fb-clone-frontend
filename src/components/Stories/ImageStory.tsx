import { Image } from "@chakra-ui/image";
import { Flex } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import { useGetImageQuery } from "../../generated/graphql";

interface Props {
  imageId: string;
}

const ImageStory: React.FC<Props> = ({ imageId }) => {
  const [{ data: image }] = useGetImageQuery({
    variables: { imageId },
  });
  return (
    <Flex w="505px" h="96%" bg="black"  borderRadius="10px" overflow="hidden">
      <Image
        src={image?.getImage}
        w="100%"
        h="100%"
        objectFit="cover"
        fallback={
          <Flex w="100%" h="100%" justify="center" align="center">
            <Spinner color="active" size="lg" />
          </Flex>
        }
      />
    </Flex>
  );
};
export default ImageStory;
