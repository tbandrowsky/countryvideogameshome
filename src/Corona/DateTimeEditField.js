
import './CoronaBar.css';
import React, { useState } from 'react';
import DateTime from 'react-datetime';

export default function DateTimeEditField(props) {
    let placeholder = '';
    let json_field_name = '';
    let value = '';

    if ('json_field_name' in props) {
        json_field_name = props.json_field_name;
    }

    if ('value' in props) {
        value = props.value;
    }

    if ('placeholder' in props) {
        placeholder = props.placeholder;
    }

    return <DateTime
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
            if (props.update) {
                let v = e.target.value;
                props.update(json_field_name, v);
            }
        }}
 />
}
