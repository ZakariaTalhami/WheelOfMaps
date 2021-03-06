import React from "react";
import SideMenu from "./sideMenu/SideMenu";
import classes from "./Main.module.scss";
import Timeline from "./timeline/Timeline";
import { ReactComponent as WotIcon } from "../../assets/icons/Wheel-icon.svg";
import Map from "../map/Map";
import { Box, Flex } from "@chakra-ui/react";

const Main = () => {
    const testString =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porta nisi hendrerit eget ac blandit auctor ut arcu. Pretium, risus magna non, fusce adipiscing lectus morbi eget. Ullamcorper urna nibh turpis donec id nam fames sed eu. At euismod in blandit aliquam facilisis tortor aliquet vestibulum commodo. Duis ipsum tincidunt eget fames pulvinar viverra rutrum leo sapien. Eleifend interdum ultricies venenatis proin. Vitae enim sed integer pulvinar semper urna, aenean. Est ornare placerat dignissim mauris risus sapien. Augue in lacinia sit eu commodo, urna consectetur. Pretium risus fermentum venenatis aenean.\n\n" +
        "Massa adipiscing morbi tristique mauris. Purus condimentum porta non id. Morbi platea varius integer mauris, feugiat. Tempor ut magna luctus sit sit ullamcorper at. Suspendisse et eget neque sed. At sed volutpat suspendisse dictumst et. Et lobortis id in at eleifend in massa. In duis risus, pellentesque id justo. Eu maecenas ultricies sit sed. Enim, lectus molestie est semper dignissim.\n\n" +
        "Integer id condimentum risus nec ultrices augue adipiscing ac. Purus etiam commodo quis id. Ut maecenas a eu ut ornare parturient sed sed. Dictum nam augue nunc nunc, lobortis suscipit nullam lectus. Elementum aliquam ante nunc nisl orci adipiscing aenean. Neque, ipsum placerat in suspendisse scelerisque dolor tellus. Nunc enim id rutrum sem elementum. Massa gravida auctor.";

    return (
        <Box w="100%" h="100%" pos="relative">
            <Map />
            <Flex
                w="100%"
                h="100%"
                pointerEvents="none"
                pos="fixed"
                top="0"
                left="0"
                zIndex="500"
                flexDirection="column"
            >
                <SideMenu />
                <Timeline className={classes.timeline} />
            </Flex>
        </Box>
    );
};

export default Main;
