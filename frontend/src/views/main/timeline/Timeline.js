// React and utils
import React, { useEffect, useRef } from "react";
import classes from "./Timeline.module.scss";
import cs from "classnames";
import { getBookChapterTitles } from "../../../utils/BookUtils";

// Redux Actions
import {
    setSelectedBook,
    setSelectedChapter,
} from "../../../actions/BookActions";

// Components
import { ReactComponent as TimePoint } from "../../../assets/icons/TimePoint.svg";
import { ReactComponent as TimePointActive } from "../../../assets/icons/TimePointActive.svg";
import DropDownMenu from "../../../components/dropdownMenu/DropDownMenu";
import Tooltip from "../../../components/Tooltip/Tooltip";
import ReactTooltip from "react-tooltip";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import useScrollToElement from "../../../hooks/useScrollToElement";
import useHorizontalScroll from "../../../hooks/useHorizontalScroll";
import useMouseDragScroll from "../../../hooks/useMouseDragScroll";

const Timeline = ({ className }) => {
    const bookState = useSelector((state) => state.Books);
    const dispatch = useDispatch();

    const handleBookChapterSelectionChange = ({ book, chapter }) => {
        console.log(book, chapter);
    };

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
        <div className={cs(classes.timeline, className)}>
            {/* Book and Chapter Labels / dropdowns */}
            <BookChapterBreadCrumb {...bookState} />
            {/* Timeline bar with the chapter points */}
            <TimelineBar spacing={500} {...bookState} />
            {/* Back and next buttons */}
            <NavigationButtons
                back
                next
                onBack={handleBack}
                onNext={handleNext}
            />
        </div>
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
                <div className={classes.crumb}>{props.children}</div>
            </DropDownMenu>
        );
    };

    const Divider = (props) => {
        return <div className={classes.crumbDivider}>{">"}</div>;
    };

    return (
        <div className={classes.bookCrumbs}>
            <Crumb options={Object.keys(books)} handler={handleBookChange}>
                {selectedBook}
            </Crumb>
            <Divider />
            <Crumb options={chapters} handler={handleChapterChange}>
                {chapters[selectedChapter]}
            </Crumb>
        </div>
    );
};

const TimelineBar = ({ books, selectedBook, selectedChapter, spacing }) => {
    const chapters = getBookChapterTitles(books[selectedBook]);
    const barLength = spacing * (chapters.length - 1);
    const dispatch = useDispatch();
    const activeElementRef = useScrollToElement([
        selectedChapter,
        selectedBook,
    ]);
    const timelineContainerRef = useRef(null);
    useHorizontalScroll(timelineContainerRef);
    useMouseDragScroll(timelineContainerRef);

    // When clickon on a chapter, the tooltip becomes stuck,
    // this will rebuild the tooltip when a new chapter is selected
    useEffect(() => {
        ReactTooltip.rebuild();
    });

    const ChapterMarkers = ({ position, selected, title, ...props }) => {
        return (
            <div
                className={cs(classes.marker)}
                style={{ left: position }}
                ref={selected ? activeElementRef : null}
                {...props}
            >
                {selected ? (
                    <TimePointActive data-tip={title} />
                ) : (
                    <TimePoint data-tip={title} />
                )}
            </div>
        );
    };

    const handleSelection = (chapter, index) => {
        dispatch(setSelectedChapter(chapter, index));
    };

    return (
        <div
            ref={timelineContainerRef}
            className={classes.timelineBarContainer}
        >
            <div className={classes.timelineBarWrapper}>
                <div
                    className={classes.timelineBar}
                    style={{
                        width: `${barLength}px`,
                    }}
                >
                    {/* TODO: Better key here */}
                    {chapters.map((chapter, index) => (
                        <ChapterMarkers
                            onClick={() =>
                                index !== selectedChapter &&
                                handleSelection(chapter, index)
                            }
                            selected={index === selectedChapter}
                            key={`chapter_${index}`}
                            title={chapter}
                            position={index * spacing}
                        />
                    ))}
                </div>
            </div>
            <Tooltip effect={"solid"} />
        </div>
    );
};

const NavigationButtons = ({ back, next, onBack, onNext }) => {
    return (
        <div className={cs(classes.bookNav)}>
            <button
                onClick={onBack}
                className={cs(classes.navButton, { [classes.hideNav]: !back })}
            >
                <i className="icon-back"></i>
            </button>
            <button
                onClick={onNext}
                className={cs(classes.navButton, { [classes.hideNav]: !next })}
            >
                <i className="icon-next"></i>
            </button>
        </div>
    );
};

export default Timeline;
