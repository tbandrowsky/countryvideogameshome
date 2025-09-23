
import '../App.css'
import '../index.css'
import { useState } from "react";
import RevolutionBarControl from './RevolutionBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import GridControl from './GridControl.js';
import { coronaGetClasses } from './Service.js';
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export default function ClassSearchForm(formProps) {

    const [request, setRequest] = useState({ });
    const [error, setError] = useState({ success: false, message: "", inProgress: false, errors:[] });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    let loc = useLocation();
    let props = { ...formProps, ...loc.state };
    console.log({ props, "title": "ClassSearch" });

    let edit_props = {
        presentation: {
            gridTemplateColumns: "repeat( 4 fr )",
            gridTemplateRows: "auto 90px 90px auto 90px 100px"
        },
        body_fields: [
            { json_field_name: "object_id", column: 1, row: 2, field_type: "number", format: "number", placeholder: "Object Id", max_length: 30, min_length: 4 },
            { json_field_name: "base_class_name", column: 4, row: 4, field_type: "string", format: "name", placeholder: "Base Class Name", max_length: 100, min_length: 1 },
            { json_field_name: "class_name", column: 2, row: 3, field_type: "string", format: "password", placeholder: "Class Name", max_length: 50, min_length: 8 },
            { json_field_name: "class_description", column: 3, row: 3, field_type: "string", format: "password", placeholder: "Class Description", max_length: 50, min_length: 8 },
        ],
        put_value
    };

    let grid_props = {
        presentation: {
            gridTemplateColumns: "repeat( 4 fr )",
            gridTemplateRows: "auto 90px 90px auto 90px 100px"
        },
        grid_columns: [
            { key: "class_name", name: "Name" },
            { key: "class_description", name:"Description" },
            { key: "base_class_name", name: "Base Class"}
        ],
        put_value
    };

    let nav = useNavigate();

    return (
        <div class="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName="CLASSES" formNumber="FORM 001" />
            <ErrorControl {...error} />
            <EditForm {...edit_props} error={error} />
            <GridControl {...grid_props} error={error} />
            <div className="buttonBar">
                <button id="searchButton" onClick={
                    async () => {
                        setError({ success: true, message: "Searching", inProgress:true });
                        let response = await coronaGetClasses(request, {
                            successForm: '/Revolution/ClassSearchForm',
                            redoForm: '/Revolution/ClassSearchForm',
                            redoMessage: 'Search failed.'
                        });
                        setError({ success: response.success, message: response.message, inProgress: false });
                        nav(response.form, { state: response.form_props });
                    }
                }>SEARCH</button>                
                <button id="confirmUserButton" disabled={error.inProgress} onClick={
                    async () => {
                        nav('/Revolution/Home');
                    }
                }>CANCEL</button>
            </div>
        </div>
    );
}
