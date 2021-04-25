import { useSelector } from "react-redux";

/**
 * Get the selected chapter instance from redux store
 * @returns {object} chapter
 */
const useGetSelectedChapter = () => {
    const getSelectedChapter = (bookState) => {
        let selectedChapter;

        if (bookState.selectedChapter !== undefined) {
            const chapters = bookState.books[bookState.selectedBook].chapters;
            selectedChapter = chapters.find(
                (chapter) => chapter.number === bookState.selectedChapter
            );
        }

        return selectedChapter;
    };

    return useSelector((state) => getSelectedChapter(state.Books));
};

export default useGetSelectedChapter;
