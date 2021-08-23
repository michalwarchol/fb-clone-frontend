import { ImageProps } from "@chakra-ui/react";
import React, {memo} from "react"

const Image:React.FC<ImageProps> = memo(function Image({ src }) {
    return <img src={src} className="spinner" />;
  });

export default Image;