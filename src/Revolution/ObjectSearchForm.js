
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
import { faEllipsisVertical, faSquareCaretLeft } from '@fortawesome/free-solid-svg-icons';
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

    let classdef = props.class.class;

    let row_id = 1;

    let system_fields = { "class_name": true, "object_id": true, "created": true, "updated": true, "created_by": true, "updated_by": true };

    let rowSize = " 60px";
    let gridColumns = [
        ];

    let form_name = "SEARCH";

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
    let gridRows = [];
    if (props.rows && props.rows && Array.isArray(props.rows)) {
        gridRows = props.rows;
    }

    return (
        <div className="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName={form_name} formNumber="FORM 007" />
            <ErrorControl {...error} />
            <div style={{height:"450px", overflow:"auto", display: 'grid', gridTemplateColumns: '325px 1fr'}}>
                <div>
                <EditForm {...edit_props} error={error} style={{ gridColumn: '1' }} />
                </div>
                <div>
                <GridControl columns={gridColumns} rows={gridRows} style={{ gridColumn: '2' }}/>
                </div>
            </div>
            <div className="buttonBar">
                <button id="searchButton" onClick={
                    async () => {
                        setError({ success: true, message: "Attempting to login", inProgress: true });
                        let search_request = { "class_name": "query",
                            "from": [{
                                "class_name": classdef.class_name,
                                "name": classdef.class_name,
                            }],
                            "stages": [ {
                                "class_name": "filter",
                                "input":classdef.class_name,
                                "condition": { 
                                        "class_name": "any", 
                                        "conditions" :[]
                                },
                                "output": "result"
                            }]
                        };
                        for (const fieldname in classdef.fields) {                            
                            const field = classdef.fields[fieldname];
                            if (!request.hasOwnProperty(field.field_name) && field.field_type === 'string') {
                                let v = get_value(field.field_name);
                                if (v && v.length > 0) {
                                    search_request.stages[0].condition.conditions.push({ class_name:"contains", value_path: field.field_name, value:v });
                                }
                            }
                        }
                        console.log({ "search_request": search_request });
                        let response = await coronaQuery(search_request, {
                            successForm: '/Revolution/ObjectSearch',
                            redoForm: '/Revolution/ObjectSearch',
                            redoMessage: 'Cannot search.'
                        },
                        props.formProps);
                        setError({ success: response.success, message: response.message, inProgress: false });
                        let nav_state = {};
                        if (response.success) {
                            nav_state = { rows:response.data,...response, user:props.user, class:props.class };
                        } else {
                            nav_state = {...props};
                        }
                        nav(response.form, { state: nav_state });
                    }
                }><FontAwesomeIcon icon={faSearch} />SEARCH</button>
                <button id="cancelButton" onClick={
                    async () => {
                        nav('/Revolution/Home', {state:{...props} } );
                    }
                }><FontAwesomeIcon icon={faSquareCaretLeft} />HOME</button>
            </div>
        </div>
    );
}
