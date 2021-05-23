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

/**
 * Split the summary by new line and wrap in paragraphs
 * @param {String} summary - summary text
 * @returns {String} formated summary
 */
export const formatSummary = (summary) => {
    if (summary) {
        const newline = String.fromCharCode(13, 10, 13, 10);
        summary = summary.replaceAll(/((?<!\r)\n)/g, newline);
    }
    return summary;
};
