import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";
import useSuggestion from "@hooks/useSuggestion"
import { Button } from "@components/buttons";
import { useContext } from "react";
import { UserContext } from "@context/UserProvider";

import { marked } from 'marked';


export const SectionEditor = ({sectionId, page}) => {

    const html = localStorage.getItem(sectionId) ||  page?.html || marked.parse(page?.markdown_heading + "" + page?.markdown_body) || "";
    console.log("html:",localStorage.getItem(sectionId))
    return (
        <SimpleEditor text={html} refId={sectionId} />
    )
}



export const DocumentationEditor = (refId, text = '') => {
    const {user} = useContext(UserContext)
    const {addDocumentation} = useSuggestion()

    const id = refId + user.id;
    const html = localStorage.getItem(id) || text;

    return (
        <SimpleEditor text={html} refId={id} onSubmit={(html) => addDocumentation(refId, html)}/>
    )
}