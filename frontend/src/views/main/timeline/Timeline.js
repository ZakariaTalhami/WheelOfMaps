// React and utils
import React from "react";

// Redux Actions
import { nextChapter, previousChapter } from "../../../actions/BookActions";

// Components
import BookCrumbs from "./bookCrumbs/BookCrumbs";
import NavButton from "./navButton/NavButton";
import { Flex } from "@chakra-ui/react";

// Hooks
import { useDispatch, useSelector } from "react-redux";

const Timeline = () => {
    const bookState = useSelector((state) => state.Books);
    const dispatch = useDispatch();

    const handleBack = () => {
        dispatch(previousChapter());
    };

    const handleNext = () => {
        dispatch(nextChapter());
    };

    return (
        <Flex
            bgColor="neutralColor"
            pointerEvents="all"
            boxShadow="inset -30px 0px 20px rgba(0, 0, 0, 0.25)"
        >
            {/* Back button */}
            <NavButton
                data-testid="back-button"
                aria-label="Previous Chapter"
                onClick={handleBack}
                icon={<i className="icon-back"></i>}
            />
            {/* Book and Chapter Labels / dropdowns */}
            <BookCrumbs {...bookState} />
            {/* Next button */}
            <NavButton
                data-testid="next-button"
                aria-label="Next Chapter"
                onClick={handleNext}
                icon={<i className="icon-next"></i>}
            />
        </Flex>
    );
};

export default Timeline;
