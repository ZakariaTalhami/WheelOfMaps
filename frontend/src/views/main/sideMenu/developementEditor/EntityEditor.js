// Core
import React from "react";
//Components
import BookForm from "./EntityForms/BookForm";
import ChapterForm from "./EntityForms/ChapterForm";
import { BOOK_ENTITY, CHAPTER_ENTITY } from "../../../../models/entityTypes";
import EntityViewFactory from "../../../../components/entityFactory/EntityViewFactory";

/**
 *  Mapping between Entity Type and its Form component
 */
const EntityFormMap = {
    [CHAPTER_ENTITY]: ChapterForm,
    [BOOK_ENTITY]: BookForm,
};

const EntityEditor = ({ entity }) => {
    return <EntityViewFactory componentMap={EntityFormMap} entity={entity} />;
};

export default EntityEditor;
