import { IconButton } from '@chakra-ui/react';
import {TiArrowSortedDown} from "react-icons/ti"
import React from 'react'

const CircleButton:React.FC = () => {
    return(
        <IconButton aria-label="wtf??" icon={<TiArrowSortedDown />}/>
    )
}
export default CircleButton;