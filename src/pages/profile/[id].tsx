import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Body from "../../components/ProfileBody/Body";
import {
  useGetFriendRequestQuery,
  useGetImageQuery,
  useGetUserByIdQuery,
  useLoggedUserQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { isServer } from "../../utils/isServer";

interface Props {
  id?: string;
}

const Profile: NextPage<Props> = ({ id }) => {
  const [{ data, fetching }] = useLoggedUserQuery({
    pause: isServer,
  });

  const [{ data: user }] = useGetUserByIdQuery({
    variables: { id: parseInt(id) },
    pause: isServer,
  });

  const [{ data: avatarImage }] = useGetImageQuery({
    variables: { imageId: user?.getUserById.avatarId },
    pause: !user?.getUserById,
  });

  const [{ data: bannerImage }] = useGetImageQuery({
    variables: { imageId: user?.getUserById.bannerId },
    pause: !user?.getUserById,
  });

  const [{ data: isFriend }] = useGetFriendRequestQuery({
    variables: { userId: parseInt(id) },
    pause: !data,
  });

  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.loggedUser) {
      router.replace("/login");
    }
  }, [fetching, data]);

  let body = <div></div>;
  if(data?.loggedUser){
    body = <Box maxW="100vw" color="textPrimary" bg={"primary"}>
    <Navbar loggedUser={data && data.loggedUser} />
    <Body
      editable={data.loggedUser.user._id == parseInt(id)}
      id={parseInt(id)}
      user={user?.getUserById}
      avatarImage={avatarImage?.getImage}
      bannerImage={bannerImage?.getImage}
      isFriend={isFriend?.getFriendRequest}
    />
  </Box>
  }
  return <div>{body}</div>;
};

Profile.getInitialProps = async ({ query }) => {
  return {
    id: query.id as string,
  };
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Profile);
