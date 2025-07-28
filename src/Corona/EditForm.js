/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react';
import './CoronaBar.css';
import './EditField.js';

export default function EditForm(props) {
    return (
        <div class="EditForm">
                { props.body_fields.map((field, index) => <EditField key={index} field={field} data={props.data[field.jsonFieldName]} />) }
        </div>
    );
}
