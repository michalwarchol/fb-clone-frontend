import { Box } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useLoggedUserQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import Body from "../../components/Stories/Body";

const CreateStory: React.FC = () => {
  const [{ data, fetching }] = useLoggedUserQuery();
  const router = useRouter();
  useEffect(() => {
    if (!fetching && !data) {
      router.replace("/login");
    }
  }, [data, fetching]);

  let body = <div></div>;
  if (data?.loggedUser) {
    body = <Body user={data.loggedUser} />;
  }
  return <Box>{body}</Box>;
};
export default withUrqlClient(createUrqlClient)(CreateStory);
