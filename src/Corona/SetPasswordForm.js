/* eslint-disable react/jsx-no-undef */
import EditField from './EditField.js';
import { useState } from 'react';
import Button from '@mui/material/Button';
export default function SetPasswordForm(props) {

    const [editProps, setEditProps] = useState({ ...props });

    let put_value = (json_field_name, value) => {
        setEditProps(prev => ({ ...prev, [json_field_name]: value }));
        props.put_value(json_field_name, value);
    };

    let get_value = (json_field_name) => {
        return editProps[json_field_name] || '';
    };

    let errorsByField = new Map();
    if (props && props.error && props.error.errors) {
        let error_fields = props.error.errors;
        for (let i = 0; i < error_fields.length; i++) {
            let item = error_fields[i];
            console.log({ error: item });
            if (item.field_name && item.message) {
                errorsByField.set(item.field_name, item.message);
            }
        }
    }

    let get_error = (json_field_name) => {
        let error = errorsByField.has(json_field_name) && errorsByField.get(json_field_name);
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
