import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React from 'react'
import { useLoggedUserQuery } from '../../generated/graphql';
import CircleButton from '../CircleButton';

const Options:React.FC = () => {
    const [{data, fetching}] = useLoggedUserQuery();
    const router  = useRouter();
    let body = null;
    if(!fetching){
        if(data?.loggedUser){
            body = data.loggedUser?.username;
        }
        else{
            router.push("/login")
        }
    }
    return(
        <Box>
            {body}
            <CircleButton />
        </Box>
    )
}
export default Options;