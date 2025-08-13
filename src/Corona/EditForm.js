/* eslint-disable react/jsx-no-undef */
import EditField from './EditField.js';
import { useState } from 'react';

export default function EditForm(props) {

    const [editProps, setEditProps] = useState({ ...props });

    console.log("EditForm props", props, editProps);

    let put_value = (json_field_name, value) => {
        setEditProps(prev => ({ ...prev, [json_field_name]: value }));
        props.put_value(json_field_name, value);
    };

    let get_value = (json_field_name) => {
        if (editProps.errors) { }
        return editProps[json_field_name] || '';
    };

    let get_error = (json_field_name) => {
        let error = "";
        if (editProps.hasOwnProperty(json_field_name)) {
            error = editProps.errors ? editProps.errors[json_field_name] : "";
        }
        console.log({ "get_error": json_field_name, error });
        return error;
    };

    let form_styles = {
        display: "grid",
        gridTemplateColumns: props.presentation.gridTemplateColumns || "auto",
        gridTemplateRows: props.presentation.gridTemplateRows || "auto",
    };


    return (
        <div className="EditForm" style={form_styles}>
            {editProps.body_fields.map((field, index) => {
                return <EditField key={index} field={field} get_value={get_value} put_value={put_value} get_error={get_error} />;
            }
            )}
        </div>
    );
}
