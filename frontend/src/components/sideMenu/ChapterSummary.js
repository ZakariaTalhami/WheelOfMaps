// Core
import React from "react";
//Components
import { Center, Heading, Text, VStack } from "@chakra-ui/react";
// Hooks
import useGetSelectedChapter from "../../hooks/useGetSelectedChapter";
// Utils
import { getChapterTitle } from "../../utils/BookUtils";

/**
 * not chpater selected message component
 */
const NoChapterSummarySelected = () => (
    <Center>
        <Heading size="lg">No Chapter selected</Heading>
    </Center>
);

const ChapterHeader = (props) => <Heading size="md" {...props} />;

const ChpaterSummaryWrapper = (props) => (
    <VStack p="1rem" overflow="auto" textAlign="justify" {...props} />
);

/**
 * Split the summary by new line and wrap in paragraphs
 * @param {String} summary
 * @returns {Array} paragraphs of the summary
 */
const getSummaryParagraphs = (summary) => {
    const paragraphs = summary.split("\r\n\r\n");
    return paragraphs.map((para, index) => (
        <Text style={{ textIndent: "1.5rem" }} key={index}>
            {para}
        </Text>
    ));
};

const ChapterSummary = () => {
    const chapter = useGetSelectedChapter();

    return (
        <>
            {!chapter ? (
                <NoChapterSummarySelected />
            ) : (
                <VStack h="100%">
                    <ChapterHeader>{getChapterTitle(chapter)}</ChapterHeader>
                    <ChpaterSummaryWrapper>
                        {getSummaryParagraphs(chapter.summary)}
                    </ChpaterSummaryWrapper>
                </VStack>
            )}
        </>
    );
};

export default ChapterSummary;
