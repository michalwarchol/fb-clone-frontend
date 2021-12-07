import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import Body from "../../components/StoriesCreate/Body";

const CreateStory: React.FC = () => {
  return <Body />;
};
export default withUrqlClient(createUrqlClient)(CreateStory);
