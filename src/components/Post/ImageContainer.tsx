import { Image, Stack } from "@chakra-ui/react";
import React from "react";
import { useGetImageQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

interface Props {
  imageId: string;
}

const ImageContainer: React.FC<Props> = ({ imageId }) => {
  const [{ data: imageUrl }] = useGetImageQuery({
    variables: { imageId: imageId },
    pause: isServer,
  });
  return (
    <Stack mt="10px">
      <Image
        src={imageUrl ? imageUrl.getImage : ""}
        fallbackSrc="https://via.placeholder.com/800/?text="
        fit="fill"
      />
    </Stack>
  );
};

export default ImageContainer;
