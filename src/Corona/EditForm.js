/* eslint-disable react/jsx-no-undef */

import './CoronaBar.css';
import './EditField.js';

export default function EditForm(props) {
    return (
        <div class="EditForm">
                <div class="countrytitle1">{props.applicationName}</div>
                <div class="countrytitle1">{props.formName}</div>
                { props.fields.map((field, index) => <EditField key={index} field={field} data={props.data[field.jsonFieldName]} />) }
        </div>
    );
}
