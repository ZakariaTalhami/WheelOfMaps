import { FaFileAlt, FaCog, FaHandPointer } from "react-icons/fa";
import PropTypes from "prop-types";
import EntityViewer from "./entityViews/EntityViewer";
import ChapterSummary from "./ChapterSummary";
import NotImplementedMessage from "./NotImplementedMessage";

export const CHAPTER_SUMMARY = "chapter-summary";
export const SELECTED_SUMMARY = "selected-summary";
export const SETTINGS = "settings";

export const NAVIGATION = [
    {
        name: CHAPTER_SUMMARY,
        label: "Chapter Summary",
        Icon: FaFileAlt,
        Content: ChapterSummary,
    },
    {
        name: SELECTED_SUMMARY,
        label: "Selected Summary",
        Icon: FaHandPointer,
        Content: EntityViewer,
    },
    {
        name: SETTINGS,
        label: "Settings",
        Icon: FaCog,
        Content: NotImplementedMessage,
    },
];

export const NavigationType = PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    Icon: PropTypes.elementType,
    Content: PropTypes.elementType,
});
