import React from "react";
import classes from "./Timeline.module.scss";
import cs from "classnames";
import { useDispatch, useSelector } from "react-redux";
import DropDownMenu from "../../../components/dropdownMenu/DropDownMenu";
import {
  setSelectedBook,
  setSelectedChapter,
} from "../../../actions/BookActions";

const Timeline = ({ className }) => {
  const bookState = useSelector((state) => state.Books);
  const dispatch = useDispatch();

  const handleBookChapterSelectionChange = ({ book, chapter }) => {
    console.log(book, chapter);
  };

  const handleBack = () => {
    console.log("Back!");
    if (bookState.selectedChapter - 1 > -1) {
      dispatch(
        setSelectedChapter(
          bookState.selectedBook,
          bookState.selectedChapter - 1
        )
      );
    } else {
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
      bookState.books[bookState.selectedBook].length
    ) {
      dispatch(
        setSelectedChapter(
          bookState.selectedBook,
          bookState.selectedChapter + 1
        )
      );
    } else {
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
      <div></div>
      {/* Back and next buttons */}
      <NavigationButtons back next onBack={handleBack} onNext={handleNext} />
    </div>
  );
};

const BookChapterBreadCrumb = ({ books, selectedBook, selectedChapter }) => {
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
      <Crumb options={books[selectedBook]} handler={handleChapterChange}>
        {books[selectedBook][selectedChapter]}
      </Crumb>
    </div>
  );
};

const TimelineBar = () => {};

const NavigationButtons = ({ back, next, onBack, onNext }) => {
  return (
    <div className={cs(classes.bookNav)}>
      <button onClick={onBack} className={cs({ [classes.hideNav]: !back })}>
        Back
      </button>
      <button onClick={onNext} className={cs({ [classes.hideNav]: !next })}>
        Next
      </button>
    </div>
  );
};

export default Timeline;
