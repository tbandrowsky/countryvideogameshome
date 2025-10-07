

import '../App.css'
import '../index.css'
/* eslint-disable react/jsx-no-undef */
import './EditForm.css';
import EditForm from './EditForm.js';
import ObjectSearchForm from './ObjectSearchForm.js';
import { useLocation } from "react-router-dom";

export default function ObjectEditForm(props) {

    let body_fields = [];
    let child_objects = [];
    let loc = useLocation();
    props = { ...props, ...loc.state };
    console.log(props);

        
    let edit_props = {
        presentation: {
            gridTemplateRows: "45.0px 45.0px 100.0px 100.0px 45.0px",
            gridTemplateColumns: "30% 30% 30%"
        },
        body_fields: [
            { field_type: "chaptertitle", row: "1", column: "1/3", text: "Welcome to the Revolution" },
            { field_type: "paragraph", row: "2", column: "1/3", text: "Enter your E-Mail address to and password to login." },
            { json_field_name: "user_name", row: "3", column: "1/3", field_type: "string", format: "name", placeholder: "Username", max_length: 50, min_length: 4 },
            { json_field_name: "password", row: "4", column: "1", field_type: "string", format: "password", placeholder: "Password", max_length: 50, min_length: 8 },
            { field_type: "paragraph", row: "5", column: "1/3", text: "If you forgot your password, just use RECOVER." },
            { field_type: "paragraph", row: "6", column: "1/3", text: "If you never logged in before, ENLIST." }
        ],
        put_value
    };

    for (let field in props.data.class.fields) {
        if (props.data.class.fields[field].field_type === 'array' || props.data.class.fields[field].field_type === 'object') {
            child_objects.push(props.data.class.fields[field]);
        } else {
            edit_propsbody_fields.push(field);
        }
    }


    let new_props = { ...props, body_fields: body_fields, child_objects: child_objects, class_name: "countryeditcontainer" };

    return (
        <div class="EditForm">
            <div className="countrytitle1">{props.applicationName}</div>
            <div className="countrytitle1">{props.formName}</div>
            {props.error && <div class="error_message">{props.error}</div>}
            <EditForm {...new_props} />
            {(child_objects.length > 0) && <div class="countrybitformsection">
                {child_objects.map((field, index) => {
                    if (field.field_type === "object")
                        return <EditForm props={{ ...field, index }} />
                    return <ObjectSearchForm props={{ ...field, index }} />
                })}
            </div>}
        </div>
    );
}
