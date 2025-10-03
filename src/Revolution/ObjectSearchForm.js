
import '../App.css'
import '../index.css'
import { useState } from "react";
import RevolutionBarControl from './RevolutionBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import { coronaQuery } from './Service.js';
import { useNavigate } from "react-router";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
import GridControl from './GridControl.js';

export default function ObjectSearchForm(props) {

    const [request, setRequest] = useState({});
    const [error, setError] = useState({ success: false, message: "", inProgress: false, field_errors: {} });

    let loc = useLocation();
    props = { ...props, ...loc.state };

    console.log({ props, "title": "Search" });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    const get_value = (json_field_name) => {
        return request.hasOwnProperty(json_field_name) && request[json_field_name];
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

    let classdef = props.class.class;

    let row_id = 1;

    let system_fields = { "class_name": true, "object_id": true, "created": true, "updated": true, "created_by": true, "updated_by": true };

    let rowSize = " 60px";
    let gridColumns = [
        ];

    if (classdef) {
        // main fields
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
            
            if (field.field_type != "array" && field.field_type != "object") {
                gridColumns.push({ key: field.field_name, name: field.field_name });
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
            if (field.field_type != "array" && field.field_type != "object") {
                gridColumns.push({ key: field.field_name, name: field.field_name });
            }
        }


        console.log( {"edit_props":edit_props});
    }

    let nav = useNavigate();

    return (
        <div className="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName={"SEARCH"} formNumber="FORM 007" />
            <ErrorControl {...error} />
            <div>
                <div style={{ display: 'grid', gridTemplateColumns: '325px 1fr' }}>
                <EditForm {...edit_props} error={error} style={{ gridColumn: '1' }} />
                </div>
                {props.data.length > 0 && <GridControl columns={gridColumns} data={props.data || []}  style={{ gridColumn: '2' }}/>}
                <div>
                </div>
            </div>
            <div className="buttonBar">
                <button id="loginButton" onClick={
                    async () => {
                        setError({ success: true, message: "Attempting to login", inProgress: true });
                        let search_request = { "class_name": "query",
                            "filter": {
                                "class_name": classdef.class_name,
                                "name": classdef.class_name
                            },
                            "stages": [ {
                                "class_name": "filter",
                                "input":classdef.class_name,
                                "conditions": [ 
                                    { 
                                        "class_name": "any", 
                                        "conditions" :[]
                                    }
                                ]
                            }]
                        };
                        for (const field of classdef.fields) {
                            if (!system_fields.hasOwnProperty(field.field_name) && field.field_type === 'string') {
                                search_request.stages[0].conditions[0].conditions.push_({ class_name:"contains", value_path: field.field_name, value: get_value(field.field_name)});
                            }
                        }

                        let response = await coronaQuery(request, {
                            successForm: '/Revolution/ObjectSearchForm',
                            redoForm: '/Revolution/ObjectSearchForm',
                            redoMessage: 'Cannot search.'
                        },
                        props.formProps);
                        setError({ success: response.success, message: response.message, inProgress: false });
                        let navparam = { state: { ...response.form_props, data: [] } };
                        console.log({ 'navparam': navparam });
                        nav(response.form, navparam);
                    }
                }><FontAwesomeIcon icon={faSearch} />SEARCH</button>
                <button id="cancelButton" onClick={
                    async () => {
                        nav('/Revolution/Home');
                    }
                }><FontAwesomeIcon icon={faSquareCaretLeft} />HOME</button>
            </div>
        </div>
    );
}
