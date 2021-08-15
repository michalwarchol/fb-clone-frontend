import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react'
import { usePostsQuery } from '../../generated/graphql';
import PostCreator from '../PostCreator/PostCreator';
import PostContainer from "../Post/PostContainer";

const Content:React.FC = () => {

    const [{data}] = usePostsQuery({variables: {limit: 10}});

    return(
        <Grid templateColumns="repeat(12, 1fr)" mt="20px">
            <GridItem colStart={1} colEnd={3}>
                actions
            </GridItem>
            <GridItem colStart={4} colEnd={9}>
                <PostCreator />
                <Box>
                    {!data ? (
                    <div>loading</div>
                    )
                    :(
                        data.posts.posts.map((post)=>(<PostContainer data={post} key={post._id}/>))
                    )
                    }
                </Box>
            </GridItem>
        </Grid>
    )
}
export default Content;