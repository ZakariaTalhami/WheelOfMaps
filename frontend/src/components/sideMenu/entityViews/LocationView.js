// Core
import React from "react";
// Libs
import { useSelector } from "react-redux";
// Utils
import { getSummaryParagraphs } from "../../../utils/TextUtils";
// Components
import { VStack } from "@chakra-ui/react";
import { DrawerContentWrapper, DrawerHeader } from "../drawer/DrawerContent";
import CreditLink from "../../creditLink/CreditLink";

const LocationView = ({ entity }) => {
    const selectedChpaterIndex = useSelector((state) => {
        return state.Books.selectedChapterIndex;
    });
    const descriptionObj = entity.getDescription(selectedChpaterIndex);

    let desciption;
    if (descriptionObj) {
        desciption = getSummaryParagraphs(descriptionObj.description);
    }

    return (
        <VStack h="100%">
            <DrawerHeader>{entity.name}</DrawerHeader>
            <DrawerContentWrapper>
                {desciption}
                {desciption && <CreditLink {...descriptionObj.credit} />}
            </DrawerContentWrapper>
        </VStack>
    );
};

export default LocationView;
