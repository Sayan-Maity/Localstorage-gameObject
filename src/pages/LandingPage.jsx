import { Button, Flex, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate()
    return (
        <Flex flexDir="column" alignItems="center" gap="2rem" justifyContent="center" height="100vh">
            <Flex flexDir="column" textAlign="center">
                <Heading>Please Sign In. below</Heading>
                <Heading>to continue</Heading>
            </Flex>
            <Button onClick={() => navigate("/login")}>Go to SignIn</Button>
        </Flex>
    )
}

export default LandingPage
