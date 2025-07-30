/* eslint-disable react/jsx-no-undef */
import './CoronaBar.css';
import EditField from './EditField.js';
import { useState } from 'react';

export default function EditForm(props) {

    const [editProps, setEditProps] = useState({ ...props });

    console.log("EditForm props", props, editProps);

    let put_value = (json_field_name, value) => {
        console.log({ type: 'put', json_field_name, value });
        setEditProps(prev => ({ ...prev, [json_field_name]: value }));
        props.put_value(json_field_name, value);
    };

    let get_value = (json_field_name) => {
        console.log({ type: 'get', json_field_name });
        return editProps[json_field_name] || '';
    };

    return (
        <div className="EditForm">
            {editProps.body_fields.map((field, index) =>
                <EditField key={index} field={field} get_value={get_value} put_value={put_value} />
            )}
        </div>
    );
}
