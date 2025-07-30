/* eslint-disable react/jsx-no-undef */
import './CoronaBar.css';
import EditField from './EditField.js';
import { useState } from 'react';

export default function EditForm(props) {

    const update = (json_field_name, value) => {
        console.log('update');
        setData(prev => ({ ...prev, [json_field_name]: value }));
    };

    const [myprops, setData] = useState({ ...props, update });

    myprops.update = update;
    return (
        <div className="EditForm">
            {myprops.body_fields.map((field, index) =>
                <EditField key={index} field={field} data={props.data[field.jsonFieldName]} />
            )}
        </div>
    );
}
