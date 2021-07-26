import { Container, Flex } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import LoginNavbar from '../../components/LoginNavbar'
import PasswordRecoveryEmail from '../../components/PasswordRecoveryEmail'
import { createUrqlClient } from '../../utils/createUrqlClient'

const Recover:React.FC = () => {
    return(
        <Container h="100vh" bg="#f0f2f5" maxW="100vw" p="0">
                <LoginNavbar visibleLoginForm={true} />
                <Flex justify="center" mt="100px">
                    <PasswordRecoveryEmail />
                </Flex>
        </Container>
    )
}
export default withUrqlClient(createUrqlClient)(Recover);