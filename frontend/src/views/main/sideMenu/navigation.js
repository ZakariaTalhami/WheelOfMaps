import PropTypes from "prop-types";
// Components
import {
    FaFileAlt,
    FaCog,
    FaHandPointer,
    FaPen,
    FaBookMedical,
    FaBookOpen,
} from "react-icons/fa";
import EntityViewer from "./entityViews/EntityViewer";
import NotImplementedMessage from "./NotImplementedMessage";
import ChapterSummary from "./ChapterSummary";
import ChapterForm from "./developementEditor/EntityForms/ChapterForm";
import BookForm from "./developementEditor/EntityForms/BookForm";

export const CHAPTER_FORM = "chapter-form";
export const BOOK_FORM = "book-form";
export const SELECTED_FORM = "selected-form";
 
const getDevNavigation = () => {
    let devNavigation = [];

    if (process.env.NODE_ENV === "development") {
        devNavigation = [
            {
                name: SELECTED_FORM,
                label: "Selected Form",
                Icon: FaPen,
                Content: () => "Selected Form",
            },
            {
                name: BOOK_FORM,
                label: "Book Form",
                Icon: FaBookMedical,
                Content: ChapterForm,
            },
            {
                name: CHAPTER_FORM,
                label: "Chapter Form",
                Icon: FaBookOpen,
                Content: BookForm,
            },
        ];
    }

    return devNavigation;
};

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
    ...getDevNavigation(),
];

export const NavigationType = PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    Icon: PropTypes.elementType,
    Content: PropTypes.elementType,
});
