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
import { createEmptyWoTChapter } from "../../../../../utils/BookUtils";
// Models
import Chapter from "../../../../../models/chapter";

const ChapterForm = () => {
    const [editMode, setEditMode] = useState(false);
    const [formObject, setFormObject] = useState(createEmptyWoTChapter());
    const selectedChapter = useGetSelectedChapter();
    const selectedBook = useGetSelectedBook();
    const title = editMode ? "Edit Chapter" : "Create Chapter";

    useEffect(() => {
        setFormObject(
            editMode
                ? Chapter.ConstructFromObject(selectedBook._id, selectedChapter)
                : createEmptyWoTChapter()
        );
    }, [editMode, selectedBook, selectedChapter]);

    const onEditToggled = () => setEditMode(!editMode);

    const onFormChange = (e) => {
        const modifiedChapter = Chapter.ConstructFromObject(
            selectedBook._id,
            formObject
        );
        modifiedChapter[e.target.name](e.target.value);
        setFormObject(modifiedChapter);
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
                    isDisabled={!selectedChapter}
                    iconComp={FaPen}
                />
                <ActionButton iconComp={FaTrash} />
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
            <FormFooterActions />
        </EntitFormWrapper>
    );
};
export default ChapterForm;
