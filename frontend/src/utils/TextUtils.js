import { Text } from "@chakra-ui/react";

/**
 * Split the summary by new line and wrap in paragraphs
 * @param {String} summary
 * @returns {Array} paragraphs of the summary
 */
export const getSummaryParagraphs = (summary) => {
    const paragraphs = summary.split("\r\n\r\n");
    return paragraphs.map((para, index) => (
        <Text
            w="100%"
            role="paragraph"
            style={{ textIndent: "1.5rem" }}
            key={index}
        >
            {para}
        </Text>
    ));
};
