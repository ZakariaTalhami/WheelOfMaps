import React, { useEffect, useState } from "react";
// Component
import { FaTrash, FaPen } from "react-icons/fa";
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

    useEffect(() => {
        setFormObject(
            editMode
                ? Book.ConstructFromObject(selectedBook)
                : createEmptyWoTBook()
        );
    }, [editMode, selectedBook]);

    const onEditToggled = () => setEditMode(!editMode);

    const onFormChange = (e) => {
        const modifiedBook = Book.ConstructFromObject(formObject);
        modifiedBook[e.target.name](e.target.value);
        setFormObject(modifiedBook);
    };

    const titleValue = formObject?.title || "";
    const seriesIndexValue =
        formObject?.seriesIndex !== undefined ? formObject?.seriesIndex : "";
    const publishDateValue = formObject?.getPublishDate() || "";

    return (
        <EntitFormWrapper data-testid="book-form">
            <ActionBar actions={[]}>
                <ActionToggleButton
                    toggled={editMode}
                    onClick={onEditToggled}
                    iconComp={FaPen}
                />
                <ActionButton iconComp={FaTrash} />
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
            <FormFooterActions />
        </EntitFormWrapper>
    );
};

export default BookForm;
