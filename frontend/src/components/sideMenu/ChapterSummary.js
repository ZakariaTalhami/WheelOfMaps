// Core
import React from "react";
//Components
import { Center, Heading, VStack } from "@chakra-ui/react";
import { DrawerHeader, DrawerContentWrapper } from "./drawer/DrawerContent";
import CreditLink from "../creditLink/CreditLink";
// Hooks
import useGetSelectedChapter from "../../hooks/useGetSelectedChapter";
// Utils
import { getChapterTitle } from "../../utils/BookUtils";
import { getSummaryParagraphs } from "../../utils/TextUtils";

/**
 * not chpater selected message component
 */
const NoChapterSummarySelected = () => (
    <Center>
        <Heading size="lg">No Chapter selected</Heading>
    </Center>
);

const ChapterSummary = () => {
    const chapter = useGetSelectedChapter();
    const summary = chapter?.summary;
    return (
        <>
            {!chapter ? (
                <NoChapterSummarySelected />
            ) : (
                <VStack h="100%">
                    <DrawerHeader>{getChapterTitle(chapter)}</DrawerHeader>
                    <DrawerContentWrapper>
                        {getSummaryParagraphs(summary.body)}
                        <CreditLink
                            author={summary.author}
                            link={summary.link}
                        />
                    </DrawerContentWrapper>
                </VStack>
            )}
        </>
    );
};

export default ChapterSummary;
