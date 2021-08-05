import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLoggedUserQuery } from "../generated/graphql"

export const useIsAuth = () => {
    const [{data, fetching}] = useLoggedUserQuery();
    const router = useRouter();
    useEffect(()=>{
        if(!fetching && !data?.loggedUser){
            router.replace("/login");
        }
    }, [fetching, data, router]);
}