import { Flex, Grid, GridItem } from '@chakra-ui/react';
import React from 'react'
import Options from './Options';

const Navbar:React.FC = () => {
    return(
        <Grid templateColumns="repeat(12, 1fr)" p={1} bg="secondary" h={"48px"}>
            <GridItem colStart={1} colEnd={3}>
                logo and search
            </GridItem>
            <GridItem colStart={5} colEnd={9}>
                subpages
            </GridItem>
            <GridItem colStart={11} colEnd={13}>
                <Flex justify="flex-end" mr="10px">
                    <Options />
                </Flex>
            </GridItem>
        </Grid>
    )
}
export default Navbar;