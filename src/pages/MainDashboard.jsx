import {
    Divider,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    Text,
    useTheme,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineMessage, AiOutlineSetting } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { PiMagicWand } from "react-icons/pi";
import { GrAnalytics } from "react-icons/gr";
import { BiLogOut, BiArrowBack } from "react-icons/bi";
import { MdOutlineSpaceDashboard, MdOutlineHelpOutline } from "react-icons/md";
import { BsBriefcase, BsPencilSquare } from "react-icons/bs";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
    SidebarMainItems,
} from "../constants/SidebarItems";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const iconComponentsMenuItems = {
    MdOutlineSpaceDashboard,
    GrAnalytics,
    PiMagicWand,
    BsBriefcase,
    BsPencilSquare,
    AiOutlineMessage,
};

const MainDashboard = () => {
    const theme = useTheme();
    const [navSize, setNavSize] = useState("large");
    const location = useLocation();

    return (
        <Flex
            h="100vh"
            w="100%"
            flexDir="row"
            justifyContent="center"
            alignItems="flex-start"
            borderRight={`1px solid ${theme.colors.border}`}
        >
            <Flex
                pos="sticky"
                p={4}
                h="100vh"
                w={navSize === "small" ? "5rem" : "17rem"}
                flexDir="column"
                justifyContent="space-between"
                borderRight={`1px solid ${theme.colors.border}`}
                //   left="5"
                //   boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                //   backgroundColor="red.100"
                transition={navSize === "small" ? "none" : "all 0.2s ease-in"}
            >
                <Flex flexDir="column" alignItems="center">
                    <Flex flexDir="row" alignItems="center" as="nav" w="100%">
                        <Flex alignItems="center" h={12}>
                            {navSize === "small" ? (
                                <Text>Logo</Text>
                            ) : (
                                <Text>Logo</Text>
                            )}
                        </Flex>
                        <IconButton
                            transition={navSize === "small" ? "none" : "all 0.2s ease-in"}
                            transform={
                                navSize === "small"
                                    ? "translateX(2.7rem)"
                                    : "translateX(12.7rem)"
                            }
                            pos="absolute"
                            background="#f2f2f4"
                            borderRadius={20}
                            mt={5}
                            _hover={{ background: "#c8c8c8" }}
                            icon={
                                navSize === "small" ? <IoIosArrowForward /> : <IoIosArrowBack />
                            }
                            onClick={() => {
                                navSize === "small" ? setNavSize("large") : setNavSize("small");
                            }}
                        />
                    </Flex>

                    <Flex
                        flexDir="column"
                        alignItems="flex-start"
                        mt={30}
                        w={navSize === "small" ? "100%" : "13rem"}
                    >
                        {SidebarMainItems.map((item, index) => {
                            const IconComponent = iconComponentsMenuItems[item.icon];
                            const isActive = location.pathname === item.path;
                            return (
                                <NavLink
                                    to={item?.path}
                                    style={{
                                        width: "100%",
                                        backgroundColor: `${isActive ? "#f5f2f9" : "transparent"}`,
                                    }}
                                    borderRadius={4}
                                    key={index}
                                >
                                    <Flex
                                        alignItems={navSize === "small" ? "center" : "flex-start"}
                                    >
                                        <Menu placement="right">
                                            <Text
                                                padding="0.4rem 1rem"
                                                borderRadius={4}
                                                _hover={{
                                                    textDecor: "none",
                                                    backgroundColor: "#f5f2f9",
                                                }}
                                                w={navSize === "large" && "100%"}
                                            >
                                                <MenuButton>
                                                    <Flex align="center">
                                                        <IconComponent
                                                            style={{
                                                                fontSize: "1.4rem",
                                                                color: `${isActive ? "#330582" : "#333"}`,
                                                            }}
                                                        />
                                                        <Text
                                                            fontSize="14px"
                                                            ml={5}
                                                            style={{
                                                                color: `${isActive ? "#330582" : "#333"}`,
                                                            }}
                                                            display={navSize === "small" ? "none" : "flex"}
                                                        >
                                                            {item?.title}
                                                        </Text>
                                                    </Flex>
                                                </MenuButton>
                                            </Text>
                                        </Menu>
                                    </Flex>
                                </NavLink>
                            );
                        })}
                    </Flex>
                </Flex>
                <Flex
                    flexDir="column"
                    alignItems="flex-start"
                    mt={30}
                    w={navSize === "small" ? "100%" : "13rem"}
                >
                    <Divider display={navSize === "small" ? "none" : "flex"} />

                    <NavLink
                        to="/"
                        style={{
                            width: "100%",
                        }}
                        borderRadius={4}
                    >
                        <Flex alignItems={navSize === "small" ? "center" : "flex-start"}>
                            <Menu placement="right">
                                <Text
                                    padding="0.4rem 1rem"
                                    borderRadius={4}
                                    _hover={{
                                        textDecor: "none",
                                        backgroundColor: "#f5f2f9",
                                    }}
                                    w={navSize === "large" && "100%"}
                                >
                                    <MenuButton>
                                        <Flex align="center">
                                            <BiArrowBack fontSize="1.4rem" />
                                            <Text
                                                fontSize="14px"
                                                ml={5}
                                                display={navSize === "small" ? "none" : "flex"}
                                            >
                                                Back Home
                                            </Text>
                                        </Flex>
                                    </MenuButton>
                                </Text>
                            </Menu>
                        </Flex>
                    </NavLink>
                </Flex>
            </Flex>
            <Flex w="100%">
                <Outlet />
            </Flex>
        </Flex>
    );
};

export default MainDashboard;
