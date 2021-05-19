// Core
import React, { useEffect, useState } from "react";
// Components
import { FaTrash, FaPen } from "react-icons/fa";
import {
    ActionBar,
    ActionButton,
    ActionToggleButton,
    EntitFormWrapper,
    EntityFormField,
    EntityFormTextArea,
    FormBody,
    FormFooterActions,
    FormHeader,
} from "../../../../../components/entityForm/EntityForm";
// Hooks
import useGetSelectedBook from "../../../../../hooks/useGetSelectedBook";
import useGetSelectedChapter from "../../../../../hooks/useGetSelectedChapter";
// Utils
import {
    constructChapterIndex,
    createEmptyWoTChapter,
} from "../../../../../utils/BookUtils";
// Models
import Chapter from "../../../../../models/chapter";
import { useDispatch } from "react-redux";
import { saveBook } from "../../../../../actions/BookActions";

const ChapterForm = () => {
    const [editMode, setEditMode] = useState(false);
    const [formObject, setFormObject] = useState(createEmptyWoTChapter());
    const selectedChapter = useGetSelectedChapter();
    const selectedBook = useGetSelectedBook();
    const title = editMode ? "Edit Chapter" : "Create Chapter";

    const dispatch = useDispatch();

    // When selected chapter or book is changed,
    // Reset the edit mode.
    useEffect(() => {
        setEditMode(false);
    }, [selectedBook, selectedChapter]);

    useEffect(() => {
        setFormObject(
            editMode
                ? Chapter.ConstructFromObject(selectedBook._id, selectedChapter)
                : createEmptyWoTChapter()
        );
    }, [editMode]);

    const onEditToggled = () => setEditMode(!editMode);

    const onFormChange = (e) => {
        const modifiedChapter = Chapter.ConstructFromObject(
            selectedBook._id,
            formObject
        );
        modifiedChapter[e.target.name](e.target.value);
        setFormObject(modifiedChapter);
    };

    const onDeleteChapter = () => {
        dispatch(saveBook(selectedChapter.delete()));
    };

    const onSave = (e) => {
        formObject.setIndex(
            constructChapterIndex(selectedBook.seriesIndex, formObject.number)
        );
        dispatch(saveBook(formObject.save()));
    };

    const numberValue =
        formObject?.number !== undefined ? formObject?.number : "";
    const titleValue = formObject.title || "";
    const summaryValue = formObject.summary.body || "";
    const summaryAuthorValue = formObject.summary.author || "";
    const summaryLinkValue = formObject.summary.link || "";

    return (
        <EntitFormWrapper data-testid="book-form">
            <ActionBar actions={[]}>
                <ActionToggleButton
                    toggled={editMode}
                    onClick={onEditToggled}
                    iconComp={FaPen}
                    isDisabled={!selectedChapter}
                />
                <ActionButton
                    onClick={onDeleteChapter}
                    iconComp={FaTrash}
                    isDisabled={!selectedChapter}
                />
            </ActionBar>
            <FormHeader title={title} />
            <FormBody spacing="1.5rem">
                <EntityFormField
                    title="Chapter Number"
                    type="number"
                    value={numberValue}
                    name="setNumber"
                    onChange={onFormChange}
                />
                <EntityFormField
                    title="Title"
                    type="text"
                    value={titleValue}
                    name="setTitle"
                    onChange={onFormChange}
                />
                <EntityFormTextArea
                    h="250px"
                    title="Chapter Summary"
                    type="date"
                    value={summaryValue}
                    name="setSummaryBody"
                    onChange={onFormChange}
                />
                <EntityFormField
                    title="Summary Author"
                    type="text"
                    value={summaryAuthorValue}
                    name="setSummaryAuthor"
                    onChange={onFormChange}
                />
                <EntityFormField
                    title="Summary Link"
                    type="text"
                    value={summaryLinkValue}
                    name="setSummaryLink"
                    onChange={onFormChange}
                />
            </FormBody>
            <FormFooterActions onSave={onSave} />
        </EntitFormWrapper>
    );
};
export default ChapterForm;
