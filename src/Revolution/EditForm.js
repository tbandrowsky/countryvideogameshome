/* eslint-disable react/jsx-no-undef */
import EditField from './EditField.js';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

export default function EditForm(props) {

    const [editProps, setEditProps] = useState({ ...props });

    let put_value = (json_field_name, value) => {
        setEditProps(prev => ({ ...prev, [json_field_name]: value }));
        props.put_value(json_field_name, value);
    };

    let get_value = (json_field_name) => {
        return editProps[json_field_name] || '';
    };

    let errorsByField = {};
    if (props && props.error && props.error.errors) {
        let error_fields = props.error.errors;
        for (let i = 0; i < error_fields.length; i++) {
            let item = error_fields[i];
            console.log({ error: item });
            if (item.field_name && item.message) {
                errorsByField[item.field_name] = item.message;
            }
        }
    }

    let get_error = (json_field_name) => {
        let error = errorsByField.hasOwnProperty(json_field_name) && errorsByField[json_field_name];
        return error;
    };

    let paper_styles = {
        height:"auto",
        width:"auto",
        marginLeft:"16px",
        marginRight:"16px",
        marginTop:"16px",
        paddingLeft:"16px",
        paddingBottom:"16px",
        ...props.style
    };

    let form_styles = {
        display: "grid",
        gridTemplateColumns: props.presentation.gridTemplateColumns || "auto",
        gridTemplateRows: props.presentation.gridTemplateRows || "auto",
        gap: props.presentation.gap || "12px"
    };

    console.log({ 'edit_props': editProps, 'form_styles': form_styles, 'paper_styles': paper_styles });

    return (
        <Paper elevation={3} style={paper_styles} >
            <div style={form_styles}>
            {editProps.body_fields.map((field, index) => {
                return <EditField key={index} field={field} get_value={get_value} put_value={put_value} get_error={get_error} />;
            }
            )}
            </div>
            {props.children && <Divider />}
            {props.children && props.children}
        </Paper>
    );
}
