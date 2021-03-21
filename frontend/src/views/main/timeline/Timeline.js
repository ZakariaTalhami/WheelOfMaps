// React and utils
import React from "react";
import { getBookChapterTitles } from "../../../utils/BookUtils";

// Redux Actions
import {
    setSelectedBook,
    setSelectedChapter,
} from "../../../actions/BookActions";

// Components
import DropDownMenu from "../../../components/dropdownMenu/DropDownMenu";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Grid, IconButton, Spacer } from "@chakra-ui/react";

const Timeline = ({ className }) => {
    const bookState = useSelector((state) => state.Books);
    const dispatch = useDispatch();

    const handleBack = () => {
        console.log("Back!");
        if (bookState.selectedChapter - 1 > -1) {
            // Go to the previous chapter
            dispatch(
                setSelectedChapter(
                    bookState.selectedBook,
                    bookState.selectedChapter - 1
                )
            );
        } else {
            // Go to the previous book
            const bookTitles = Object.keys(bookState.books);
            const bookIndex = bookTitles.indexOf(bookState.selectedBook);
            if (bookIndex - 1 < -1) {
                dispatch(setSelectedBook(bookTitles[bookIndex - 1]));
            }
        }
    };

    const handleNext = () => {
        console.log("Next!");

        if (
            bookState.selectedChapter + 1 <
            bookState.books[bookState.selectedBook].chapters.length
        ) {
            // Go to the next chapter
            dispatch(
                setSelectedChapter(
                    bookState.selectedBook,
                    bookState.selectedChapter + 1
                )
            );
        } else {
            // Go to the next book
            const bookTitles = Object.keys(bookState.books);
            const bookIndex = bookTitles.indexOf(bookState.selectedBook);
            if (bookIndex + 1 < bookTitles.length) {
                dispatch(setSelectedBook(bookTitles[bookIndex + 1]));
            }
        }
    };

    return (
        <Grid
            bgColor="neutralColor"
            pointerEvents="all"
            templateRows="30px 50xp"
            boxShadow="inset -30px 0px 20px rgba(0, 0, 0, 0.25)"
        >
            {/* Book and Chapter Labels / dropdowns */}
            <BookChapterBreadCrumb {...bookState} />
            {/* Back and next buttons */}
            <NavigationButtons
                // TODO: where are these assigned?
                back
                next
                onBack={handleBack}
                onNext={handleNext}
            />
        </Grid>
    );
};

const BookChapterBreadCrumb = ({ books, selectedBook, selectedChapter }) => {
    const chapters = getBookChapterTitles(books[selectedBook]);

    const dispatch = useDispatch();

    const handleChapterChange = (chapter, index) => {
        console.log(chapter, index);
        dispatch(setSelectedChapter(chapter, index));
    };

    const handleBookChange = (book, index) => {
        console.log(book, index);
        dispatch(setSelectedBook(book));
    };

    const Crumb = (props) => {
        return (
            <DropDownMenu
                options={props.options}
                maxHeight={300}
                onSelect={props.handler}
            >
                <Box userSelect="none" margin="0 1rem">
                    {props.children}
                </Box>
            </DropDownMenu>
        );
    };

    const Divider = (props) => {
        return <div>{">"}</div>;
    };

    return (
        <Flex
            alignItems="center"
            fontSize="20px"
            fontWeight="500"
            color="primaryColor"
        >
            <Crumb options={Object.keys(books)} handler={handleBookChange}>
                {selectedBook}
            </Crumb>
            <Divider />
            <Crumb options={chapters} handler={handleChapterChange}>
                {chapters[selectedChapter]}
            </Crumb>
        </Flex>
    );
};

const NavigationButtons = ({ back, next, onBack, onNext }) => {
    const NavButton = (props) => (
        <IconButton
            {...props}
            fontSize="32px"
            color="primaryColor"
            colorScheme="trasparent"
        >
            {props.children}
        </IconButton>
    );

    return (
        <Flex alignItems="center" p="0 0.5rem">
            <NavButton
                aria-label="Previous Chapter"
                onClick={onBack}
                visibility={back || "hidden"}
                icon={<i className="icon-back"></i>}
            />
            <Spacer />
            <NavButton
                aria-label="Next Chapter"
                onClick={onNext}
                visibility={back || "hidden"}
                icon={<i className="icon-next" />}
            />
        </Flex>
    );
};

export default Timeline;
