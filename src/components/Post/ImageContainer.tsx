import { Image, Stack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useGetImageQuery } from "../../generated/graphql";
import { base64ToObjectURL } from "../../utils/base64ToObjectURL";
import { isServer } from "../../utils/isServer";

interface Props {
  imageId: string;
}

const ImageContainer: React.FC<Props> = ({ imageId }) => {
  const [{ data: imageUrl }] = useGetImageQuery({
    variables: { imageId: imageId },
    pause: isServer,
  });

  const memoizedImage = useMemo(
    () => base64ToObjectURL(imageUrl?.getImage),
    [imageUrl]
  );
  return (
    <Stack mt="10px">
      <Image
        src={imageUrl?.getImage ? memoizedImage : undefined}
        fallbackSrc="https://via.placeholder.com/800/?text="
        fit="fill"
      />
    </Stack>
  );
};

export default ImageContainer;
