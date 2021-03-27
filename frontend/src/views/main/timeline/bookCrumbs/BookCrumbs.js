// React and Utils
import React from "react";
import { getBookChapterTitles } from "../../../../utils/BookUtils";

// Redux Actions
import {
    setSelectedBook,
    setSelectedChapter,
} from "../../../../actions/BookActions";

// Components
import { Flex, Select, Stack } from "@chakra-ui/react";

// Hooks
import { useDispatch } from "react-redux";

const Option = (props) => (
    <option
        style={{
            backgroundColor: "#A99985",
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
            padding: "10px",
        }}
        {...props}
    />
);

const Crumb = (props) => (
    <Select icon="" fontSize="22px" fontSize={["14px", "20px"]} {...props}>
        {props.options.map((option) => (
            <Option data-testid="option" key={option} value={option}>
                {option}
            </Option>
        ))}
    </Select>
);

const BookCrumbs = ({ books, selectedBook, selectedChapter }) => {
    const chapters = getBookChapterTitles(books[selectedBook]);

    const dispatch = useDispatch();

    const handleChapterChange = (e) => {
        const chapterIndex = e.currentTarget.selectedIndex;
        dispatch(setSelectedChapter(chapterIndex));
    };

    const handleBookChange = (e) => {
        const bookName = e.currentTarget.value;
        dispatch(setSelectedBook(bookName));
    };

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            fontSize="20px"
            fontWeight="500"
            color="primaryColor"
            flex="1"
        >
            <Stack
                direction={["column", "row"]}
                textAlign="center"
                p={["0.5rem", "1rem"]}
            >
                <Crumb
                    data-testid="book-select"
                    value={selectedBook}
                    options={Object.keys(books)}
                    onChange={handleBookChange}
                />
                <Crumb
                    data-testid="chapter-select"
                    value={chapters[selectedChapter]}
                    options={chapters}
                    onChange={handleChapterChange}
                />
            </Stack>
        </Flex>
    );
};

export default BookCrumbs;
