import React, { useEffect, useState } from "react";
// Component
import { FaTrash, FaPen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { saveBook } from "../../../../../actions/BookActions";
import {
    ActionBar,
    ActionButton,
    ActionToggleButton,
    EntitFormWrapper,
    EntityFormField,
    FormBody,
    FormFooterActions,
    FormHeader,
} from "../../../../../components/entityForm/EntityForm";
// Hook
import useGetSelectedBook from "../../../../../hooks/useGetSelectedBook";
// Model
import Book from "../../../../../models/book";
// Utils
import { createEmptyWoTBook } from "../../../../../utils/BookUtils";

const BookForm = () => {
    const [editMode, setEditMode] = useState(false);
    const [formObject, setFormObject] = useState();
    const selectedBook = useGetSelectedBook();
    const title = editMode ? "Edit Book" : "Create Book";

    const dispatch = useDispatch();

    // When selected book is changed,
    // Reset the edit mode.
    useEffect(() => {
        setEditMode(false);
    }, [selectedBook]);

    useEffect(() => {
        setFormObject(
            editMode
                ? Book.ConstructFromObject(selectedBook)
                : createEmptyWoTBook()
        );
    }, [editMode]);

    const onEditToggled = () => setEditMode(!editMode);

    const onFormChange = (e) => {
        const modifiedBook = Book.ConstructFromObject(formObject);
        modifiedBook[e.target.name](e.target.value);
        setFormObject(modifiedBook);
    };

    const onDeleteBook = () => {
        dispatch(saveBook(selectedBook.delete()));
    };

    const onSave = (e) => {
        dispatch(saveBook(formObject.save()));
    };

    const titleValue = formObject?.title || "";
    const seriesIndexValue =
        formObject?.seriesIndex !== undefined ? formObject?.seriesIndex : "";
    const publishDateValue = formObject?.getPublishDate() || "";

    return (
        <EntitFormWrapper data-testid="book-form">
            <ActionBar actions={[]}>
                <ActionToggleButton
                    title="Edit"
                    toggled={editMode}
                    onClick={onEditToggled}
                    iconComp={FaPen}
                />
                <ActionButton
                    title="Delete"
                    onClick={onDeleteBook}
                    iconComp={FaTrash}
                />
            </ActionBar>
            <FormHeader title={title} />
            <FormBody spacing="1.5rem">
                <EntityFormField
                    title="Title"
                    type="text"
                    value={titleValue}
                    name="setTitle"
                    onChange={onFormChange}
                />
                <EntityFormField
                    title="Series Number"
                    type="number"
                    value={seriesIndexValue}
                    name="setSeriesIndex"
                    onChange={onFormChange}
                />
                <EntityFormField
                    title="Publish Date"
                    type="date"
                    value={publishDateValue}
                    name="setPublishDate"
                    onChange={onFormChange}
                />
            </FormBody>
            <FormFooterActions onSave={onSave} />
        </EntitFormWrapper>
    );
};

export default BookForm;
