/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react';
import './CoronaBar.css';
import './EditForm.css';
import EditForm from './EditForm.js';

export default function ObjectEdit(props) {

    let body_fields = [];
    let tab_fields = [];

    for (const field of props.fields) {
        if (field.field_type === 'array' || field.field_type === 'object') {
            tab_fields.push(field);
        } else {
            body_fields.push(field);
        }
    }

    let new_props = { ...props, body_fields: body_fields, tab_fields: tab_fields, class_name: "countryeditcontainer" };

    return (
        <div class="EditForm">
            <div class="countrytitle1">{props.applicationName}</div>
            <div class="countrytitle1">{props.formName}</div>
            <EditForm {...new_props} />
            <div class=""/>
        </div>
    );
}
