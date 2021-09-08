import { Image } from '@chakra-ui/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import React from 'react'
import { Story, useGetImageQuery } from '../../generated/graphql';

interface Props {
    story: Story;
}

const Shortcut:React.FC<Props> = ({story}) => {
    const [{data}] = useGetImageQuery({variables: {imageId: story.imageId}, pause: !story.imageId});
    let content = <Box></Box>
    if(story.imageId){
        content = <Image src={data?.getImage} objectFit="cover" h="100%" />
    }else{
        content = <Flex bgGradient={story.gradient} h="100%" align="center" justify="center" >
            <Text fontFamily={story.font} fontSize="10px">{story.text}</Text>
        </Flex>
    }

    return(
        <Box w="16%" h={{base: "140px", md: "190px"}} borderRadius="8px" overflow="hidden">
            {content}
            <Box position="relative">
                <Text position="absolute" bottom="0" fontWeight="bold">{story.creator.username}</Text>
            </Box>
        </Box>
    )
}
export default Shortcut;