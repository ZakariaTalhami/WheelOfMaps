import React from "react";
import { ReactComponent as WotIcon } from "../../assets/icons/Wheel-icon-large.svg";
import { Box, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const LoadingScreenWrapper = (props) => (
    <Center
        h="100vh"
        w="100vw"
        pos="fixed"
        background="radial-gradient(50% 50% at 50% 50%, #9399A5 0%, #70798C 100%)"
        {...props}
    />
);

const LoadingIcon = (props) => (
    <MotionBox
        animate={{
            scale: [1, 1.05, 1],
        }}
        transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatType: "loop",
        }}
        {...props}
    />
);

const LoadingText = (props) => (
    <Box
        pos="absolute"
        top="70%"
        fontSize="32px"
        fontWeight="bold"
        textAlign="center"
        {...props}
    />
);

const LoadingScreen = () => {
    return (
        <LoadingScreenWrapper>
            <LoadingIcon>
                <WotIcon />
            </LoadingIcon>
            <LoadingText>Loading Map...</LoadingText>
        </LoadingScreenWrapper>
    );
};

export default LoadingScreen;
