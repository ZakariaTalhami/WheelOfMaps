import { useSelector } from "react-redux";

/**
 * Get the selected Book instance from redux store
 * @returns {object} Book
 */
const useGetSelectedBook = () => {
    const getSelectedBook = (bookState) => {
        let selectedBook;

        if (bookState.selectedBook !== undefined) {
            selectedBook = bookState.books[bookState.selectedBook];
        }

        return selectedBook;
    };

    return useSelector((state) => getSelectedBook(state.Books));
};

export default useGetSelectedBook;
