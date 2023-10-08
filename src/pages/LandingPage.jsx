import { Button, Flex, Heading, useTheme } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    return (
        <Flex flexDir="column" alignItems="center" gap="2rem" justifyContent="center" height="100vh">
            <Flex flexDir="column" textAlign="center">
                <Heading>Please Sign In. below</Heading>
                <Heading>to continue</Heading>
            </Flex>
            <Button onClick={() => navigate("/login")}
              gap="0.5rem"
              borderRadius="20px"
              transition={"all 0.3s ease"}
              color={theme.colors.button.dark_color}
              backgroundColor={theme.colors.button.dark_backgroundColor}
              _hover={{
                backgroundColor: `${theme.colors.button.hover_dark_backgroundColor}`,
                transform: `${theme.colors.button.hover_transform}`,
              }}
              _active={{
                backgroundColor: `${theme.colors.button.active_dark_backgroundColor}`,
              }}
            >
              Go to SignIn
            </Button>
        </Flex>
    )
}

export default LandingPage
