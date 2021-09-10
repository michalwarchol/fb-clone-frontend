import { Box } from '@chakra-ui/layout';
import React from 'react'
import StoriesBar from './StoriesBar';

interface Props {
    id?: number;
}

const Body:React.FC<Props> = ({id}) => {
    return(
        <Box mt="56px" h="100%">
            <StoriesBar />
        </Box>
    )
}
export default Body;