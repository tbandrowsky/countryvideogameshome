

import '../App.css'
import '../index.css'
/* eslint-disable react/jsx-no-undef */
import './CoronaBar.css';
import './EditForm.css';
import EditForm from './EditForm.js';

export default function ObjectEdit(props) {

    let body_fields = [];
    let child_objects = [];

    for (const field of props.fields) {
        if (field.field_type === 'array' || field.field_type === 'object') {
            child_objects.push(field);
        } else {
            body_fields.push(field);
        }
    }

    let new_props = { ...props, body_fields: body_fields, child_objects: child_objects, class_name: "countryeditcontainer" };

    return (
        <div class="EditForm">
            <div class="countrytitle1">{props.applicationName}</div>
            <div class="countrytitle1">{props.formName}</div>
            {props.error && <div class="error_message">{props.error}</div>}
            <EditForm {...new_props} />
            {(child_objects.length > 0) && <div class="countrybitformsection">
                {child_objects.map((field, index) => {
                    if (field.field_type === "object")
                        return <ObjectEdit props={{ ...field, index }} />
                    return <SearchForm props={{ ...field, index }} />
                })}
            </div>}
        </div>
    );
}
