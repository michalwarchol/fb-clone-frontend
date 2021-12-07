import { Box } from "@chakra-ui/layout";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLoggedUserQuery } from "../generated/graphql";
import { isServer } from "./isServer";

export const withAuth = (WrappedComponent: NextPage<unknown, unknown>) => {
  const EmptyComponent = () => (
    <Box
    minHeight="100vh"
    minWidth="100vw"
    bg="primary"
    ></Box>
  );

  const hoc = (props: any) => {
    const router = useRouter();
    const [{data, fetching}] = useLoggedUserQuery({pause: isServer});

    const [verified, setVerified] = useState(false);

    useEffect(() => {
      if (!fetching && !data?.loggedUser) {
        router.query.id = props.id;
        router.replace("/login?next=" + router.asPath);
        return;
      }

      if (!fetching && data?.loggedUser) {
        setVerified(true);
      }
    }, [fetching, data, router]);

    return verified ? <WrappedComponent {...props} /> : <EmptyComponent />;
  };

  hoc.getInitialProps = async ({ query }: NextPageContext) => {
    return {
      id: query.id as string,
    };
  };

  return hoc;
};