import { FaFileAlt, FaCog, FaHandPointer } from "react-icons/fa";

export const CHAPTER_SUMMARY = "chapter-summary";
export const SELECTED_SUMMARY = "selected-summary";
export const SETTINGS = "settings";

export const NAVIGATION = [
    {
        name: CHAPTER_SUMMARY,
        label: "Chapter Summary",
        Icon: FaFileAlt,
        Content: "",
    },
    {
        name: SELECTED_SUMMARY,
        label: "Selected Summary",
        Icon: FaHandPointer,
        Content: "",
    },
    {
        name: SETTINGS,
        label: "Settings",
        Icon: FaCog,
        Content: "",
    },
];
