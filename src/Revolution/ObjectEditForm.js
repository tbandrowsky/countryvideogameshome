
import '../App.css'
import '../index.css'
import { useState } from "react";
import RevolutionBarControl from './RevolutionBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import ObjectsList from './ObjectsList.js';
import { coronaQuery } from './Service.js';
import { useNavigate } from "react-router";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faSquareCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
import GridControl from './GridControl.js';

export default function ObjectEditForm(props) {

    const [request, setRequest] = useState({});
    const [error, setError] = useState({ success: false, message: "", inProgress: false, field_errors: {} });

    let loc = useLocation();
    props = { ...props, ...loc.state };

    console.log({ props, "title": "Edit" });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
        console.log({ request });
    };

    const get_value = (json_field_name) => {
        if (json_field_name in request)
            return request[json_field_name];
        else
            return "";
    }

    let edit_props = {
        presentation: {
            gridTemplateRows: "",
            gridTemplateColumns: "100%"
        },
        body_fields: [
        ],
        put_value,
        get_value
    };

    let classdef = props.class;
    let objdef = props.object;

    let row_id = 1;

    let system_fields = { "class_name": true, "object_id": true, "created": true, "updated": true, "created_by": true, "updated_by": true };

    let rowSize = " 60px";
    let childObjects = [
        ];

    let form_name = "EDIT";

    if (classdef) {
        // main fields
        form_name = classdef.class_name.toUpperCase();
        for (const fieldname in classdef.fields) {
            if (system_fields.hasOwnProperty(fieldname)) {
                continue;
            }
            let field = classdef.fields[fieldname];
            edit_props.presentation.gridTemplateRows += rowSize;

            if (field.field_type === 'string') {
                edit_props.body_fields.push( { json_field_name: field.field_name, row: row_id, column:1, field_type: field.field_type, format: field.field_format, placeholder: field.placeholder || field.field_name, max_length: field.max_length, min_length: field.min_length });
                row_id += 1;
            }
            
            if (field.field_type == "array" || field.field_type == "object") {
                childObjects.push(objdef[ field.field_name ] );
            }
        }
        // base fields
        for (const fieldname in classdef.fields) {
            if (!system_fields.hasOwnProperty(fieldname)) {
                continue;
            }
            let field = classdef.fields[fieldname];
            edit_props.presentation.gridTemplateRows += rowSize;
            if (field.field_type === 'string') {
                edit_props.body_fields.push( { json_field_name: field.field_name, row: row_id, column:1, field_type: field.field_type, format: field.field_format, placeholder: field.placeholder || field.field_name, max_length: field.max_length, min_length: field.min_length });
                row_id += 1;
            }
        }

        console.log( {"edit_props":edit_props});
    }

    let nav = useNavigate();

    return (
        <div className="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName={form_name} formNumber="FORM 007" />
            <ErrorControl {...error} />
            <div style={{height:"450px", overflow:"auto", display: 'grid', gridTemplateColumns: '325px 1fr'}}>
                <div>
                <EditForm {...edit_props} error={error} style={{ gridColumn: '1' }} />
                </div>
                <div>
                    <ObjectsList objects={childObjects} setError={setError} user={props.user} style={{ gridColumn: '2' }}/>
                </div>
            </div>
            <div className="buttonBar">
                <button id="cancelButton" onClick={
                    async () => {
                        nav('/Revolution/Home', {state:{...props} } );
                    }
                }><FontAwesomeIcon icon={faSquareCaretLeft} />HOME</button>
            </div>
        </div>
    );
}
