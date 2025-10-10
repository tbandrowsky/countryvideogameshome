
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
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
import ObjectsList from './ObjectsList.js';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

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
        if (json_field_name in request)
            return request[json_field_name];
        else
            return "";
    }

    let edit_props = {
        presentation: {
            gridTemplateRows: "60px",
            gridTemplateColumns: "40% 40%",
            gap: "20px"
        },
        body_fields: [
        ],
        put_value,
        get_value
    };

    let classdef = props.class.class;

    let form_name = "SEARCH";
    let class_name = "object";

    let edit_field_names = [];

    edit_props.body_fields.push( { json_field_name: "search_text", row: 1, column:"1/3", field_type: "string", format: "", placeholder: "Search:", max_length: 200, min_length: 0 });
    edit_props.body_fields.push( { json_field_name: "start_date", row: 2, column:'1', field_type: "datetime", format: "", placeholder: "From:", max_length: 200, min_length: 0 });
    edit_props.body_fields.push( { json_field_name: "stop_date", row: 2, column:'2', field_type: "datetime", format: "", placeholder: "To:", max_length: 200, min_length: 0 });

    if (classdef) {
        // main fields

        class_name = classdef.class_name;
        form_name = class_name.toUpperCase();
        for (const fieldname in classdef.fields) {
            let field = classdef.fields[fieldname];
            edit_props.presentation.gridTemplateRows += "60px";

            if (field.field_type === 'string') {
                edit_field_names.push(field.field_name);    
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
            <div style={{display: 'grid', gridTemplateColumns: '400px 1fr', gridTemplateRows:'1fr', marginRight:"16px"}}>
                <div style={{ gridColumn: '1'}}>
                    <h4 style={{ marginLeft:"16px", marginTop:"16px"}}>Search for {class_name}</h4>
                    <EditForm {...edit_props} error={error} style={{ gridColumn: '1' }} >
                        <div className="buttonBar">
                            <Button id="searchButton" onClick={
                                async () => {
                                    setError({ success: true, message: "Searching...", inProgress: true });
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
                                    edit_field_names.forEach( (fieldname, index) => {                            
                                        const field = classdef.fields[fieldname];
                                        let v = get_value("search_text");
                                        if (v && v.length > 0) {
                                            search_request.stages[0].condition.conditions.push({ class_name:"contains", value_path: fieldname, value:v });
                                        }
                                    });
                                    let start = get_value("start_date");
                                    let stop = get_value("stop_date");
                                    if (start && start.length > 0) {
                                        search_request.stages[0].condition.conditions.push({ class_name:"gte", value_path: "updated", value:start });
                                    }
                                    if (stop && stop.length > 0) {
                                        search_request.stages[0].condition.conditions.push({ class_name:"lte", value_path: "updated", value:stop });
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
                            }><FontAwesomeIcon icon={faSearch} />SEARCH</Button>
                            <Button id="cancelButton" onClick={
                                async () => {
                                    nav('/Revolution/Home', {state:{...props} } );
                                }
                            }><FontAwesomeIcon icon={faSquareCaretLeft} />HOME</Button>
                        </div>
                    </EditForm>
                    <h4 style={{ marginLeft:"16px", marginTop:"16px", marginBottom:"0px"}}>Create new {class_name}</h4>
                    <Paper elevation={3} style={{ marginLeft:"16px", marginTop:"16px", marginRight:"16px"}}>
                        {classdef && classdef.descendants && classdef.descendants.map( (descendant, index) => (
                            <Button id="searchButton" onClick={
                                async () => {
                                    setError({ success: true, message: "Searching...", inProgress: true });
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
                                    edit_field_names.forEach( (fieldname, index) => {                            
                                        const field = classdef.fields[fieldname];
                                        let v = get_value("search_text");
                                        if (v && v.length > 0) {
                                            search_request.stages[0].condition.conditions.push({ class_name:"contains", value_path: fieldname, value:v });
                                        }
                                    });
                                    let start = get_value("start_date");
                                    let stop = get_value("stop_date");
                                    if (start && start.length > 0) {
                                        search_request.stages[0].condition.conditions.push({ class_name:"gte", value_path: "updated", value:start });
                                    }
                                    if (stop && stop.length > 0) {
                                        search_request.stages[0].condition.conditions.push({ class_name:"lte", value_path: "updated", value:stop });
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
                            }><FontAwesomeIcon icon={faAdd} />{descendant}</Button>
))}
                    </Paper>
                </div>
                <div style={{ gridColumn: '2', width:'90%', height:"100%"}}>
                    <h4 style={{ marginBottom:"0px", marginTop:"16px", marginBottom:"20px"}}>{class_name} Search Results</h4>
                    <ObjectsList objects={gridRows} style={{ gridColumn: '2', marginRight:"16px" }} setError={setError} />
                </div>
            </div>
        </div>
    );
}
