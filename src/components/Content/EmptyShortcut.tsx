import { Box } from '@chakra-ui/layout';
import React from 'react'

const EmptyShortcut:React.FC = () => {
    return(
        <Box
        w="16%"
        h={{ base: "140px", md: "190px" }}
        borderRadius="8px"
        overflow="hidden"
        _hover={{ cursor: "pointer", filter: "brightness(80%)" }}
        bgGradient="linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(89,90,92,1) 100%)"
      ></Box>
    )
}
export default EmptyShortcut;