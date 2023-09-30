import { Button, Card, CardBody, Center, Container, FormControl, FormLabel, Heading, Input, Stack, Text, VStack, useTheme, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const theme = useTheme()
    const toast = useToast()
    const navigate = useNavigate()
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const submitLoginForm = (e) => {
        e.preventDefault()
        setLoading(true)

        if (!loginUsername || !loginPassword) {
            setLoading(false)
            if (!loginUsername) {

                toast({
                    title: "Please enter your username",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "error",
                });
                return
            } else if (!loginPassword) {
                toast({
                    title: "Please enter your password",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "error",
                });
                return
            }
        } else {
            setLoading(false)
            navigate('/private/dashboard')
        }
    }
    return (
        <Container>
            <Center>
                <VStack as="header" spacing={6} mt="8">
                    <Card
                        bg="#f6f8fa"
                        variant="outline"
                        borderColor="#d8dee4"
                        width={"25rem"}
                        p={"1.2rem"}
                    >
                        <Stack>
                            <Heading
                                as="h1"
                                fontWeight={500}
                                fontSize={24}
                                textAlign={"center"}
                            >
                                Sign in.
                            </Heading>
                            <Text textAlign={"center"}>
                            </Text>
                        </Stack>
                        <CardBody>
                            <form onSubmit={submitLoginForm}>
                                <Stack spacing="4">
                                    <FormControl>
                                        <FormLabel size="sm" fontWeight={400}>
                                            Username*
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            bg="white"
                                            borderColor="#d8dee4"
                                            size="sm"
                                            borderRadius="6px"
                                            p={"1.2rem"}
                                            placeholder="julie1234"
                                            value={loginUsername}
                                            onChange={(e) => setLoginUsername(e.target.value)}
                                            _focus={{ borderColor: "#8b3dff", boxShadow: "none" }}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel size="sm" fontWeight={400}>
                                            Password*
                                        </FormLabel>
                                        <Input
                                            type="password"
                                            bg="white"
                                            borderColor="#d8dee4"
                                            size="sm"
                                            borderRadius="6px"
                                            p={"1.2rem"}
                                            //   placeholder="Password *"
                                            placeholder="1234"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            _focus={{ borderColor: "#8b3dff", boxShadow: "none" }}
                                        />
                                    </FormControl>
                                    <Button type="submit" isLoading={loading} loadingText="Signing in..."
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
                                        Sign In
                                    </Button>
                                </Stack>
                            </form>
                        </CardBody>
                    </Card>
                </VStack>
            </Center>
        </Container>
    )
}

export default Login
