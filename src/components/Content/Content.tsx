import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react'
import PostCreator from './PostCreator';

const Content:React.FC = () => {
    return(
        <Grid templateColumns="repeat(12, 1fr)" mt="20px">
            <GridItem colStart={1} colEnd={3}>
                actions
            </GridItem>
            <GridItem colStart={4} colEnd={9}>
                <PostCreator />
            </GridItem>
        </Grid>
    )
}
export default Content;