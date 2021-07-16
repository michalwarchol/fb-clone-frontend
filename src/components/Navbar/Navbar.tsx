import { Grid } from '@chakra-ui/react';
import React from 'react'
import Options from './Options';

const Navbar:React.FC = () => {
    return(
        <Grid container >
            <Grid item xs={2}>
                logo and search
            </Grid>
            <Grid item xs={8}>
                subpages
            </Grid>
            <Grid item xs={2}>
                <Options />
            </Grid>
        </Grid>
    )
}
export default Navbar;