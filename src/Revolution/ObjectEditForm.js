
import '../App.css'
import '../index.css'
import './EditForm.css'
import { useState } from "react";
import RevolutionBarControl from './RevolutionBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import ObjectsList from './ObjectsList.js';
import { coronaQuery } from './Service.js';
import { useNavigate } from "react-router";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faSquareCaretLeft, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

export default function ObjectEditForm(props) {

    let loc = useLocation();
    props = { ...props, ...loc.state };

    const [request, setRequest] = useState({ ...props.data.object });
    const [error, setError] = useState({ success: false, message: "", inProgress: false, field_errors: {} });

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


    let objdef = props.data.object;


    let rowSize = " 60px";
    let childObjects = [
        ];

    let form_name = "EDIT";
    let class_name = "object";
    let class_description = "This is an object"
    let class_order = [];
    let edit_props_by_base = {

    };

    let all_classes = props.data.classes || {};

    let current_class = "";
    let number_of_classes = Object.keys(all_classes).length;
    // find the class with no base - usually sys_object
    for (const classname in all_classes) {
        let tempclass = all_classes[classname];
        if (tempclass.base_class_name == null || tempclass.base_class_name == "") {
            current_class = classname;
            break;
        }
    }

    let classorder = [ current_class ];
    let base_found = true;
    while (base_found) {
        base_found = false;
        for (const classname in all_classes) {
            let tempclass = all_classes[classname];
            if (tempclass.base_class_name == current_class) {
                classorder.push(classname);
                current_class = tempclass.class_name;
                base_found = true;
            }
        }
    }

    let last_class_fields = {};
    let class_edit_props = {};
    let auto_grid_rows = false;

    for (const classname of classorder) {
        let classdef = all_classes[classname];
        if (classdef) {
            // main fields
            class_description = classdef.class_description;
            class_name = classdef.class_name;   
            form_name = class_name.toUpperCase();

            auto_grid_rows = false;
            class_edit_props = { 
                body_fields:[], 
                presentation: { 
                    "classdef": classdef, 
                    gridTemplateRows: classdef.grid_template_rows, 
                    gridTemplateColumns: classdef.grid_template_columns, 
                    gap: "10px", 
                    padding: "10px" 
                },
                "put_value": put_value, 
                "get_value": get_value
            };    

            if (class_edit_props.presentation.gridTemplateRows == "" || class_edit_props.presentation.gridTemplateRows == null) {
                class_edit_props.presentation.gridTemplateRows = "";
                auto_grid_rows = true;
            }
            if (class_edit_props.presentation.gridTemplateColumns == "" || class_edit_props.presentation.gridTemplateColumns == null) {
                class_edit_props.presentation.gridTemplateColumns = "1.0fr";
            }
            edit_props_by_base[class_name] = class_edit_props;
            let row_id = 1;

            let new_edit_field = {
                row: row_id, 
                column: 1, 
                field_type: "chaptersubtitle", 
                text: class_description  };

            class_edit_props.body_fields.push( new_edit_field );
            row_id += 1;
            if (auto_grid_rows) {
                class_edit_props.presentation.gridTemplateRows = class_edit_props.presentation.gridTemplateRows +rowSize;
            }

            for (const fieldname in classdef.fields) {

                if (last_class_fields.hasOwnProperty(fieldname)) {
                    // already processed in a base class
                    continue;
                }

                let field = classdef.fields[fieldname];
                let field_class = field.field_class;
                
                if (field.field_type === 'string' || field.field_type === 'number' || field.field_type === 'boolean' || field.field_type === 'datetime') {
                    let new_edit_field = { json_field_name: field.field_name, 
                        row: field.grid_row, 
                        column: field.grid_column, 
                        field_type: field.field_type, 
                        format: field.field_format, 
                        placeholder: field.placeholder || field.field_name, 
                        max_length: field.max_length,                         
                        min_length: field.min_length };

                    if (field.grid_row =="" || field.grid_row == null) {
                        new_edit_field.row = row_id;
                    }
                    if (field.grid_column =="" || field.grid_column == null) {
                        new_edit_field.column = 1;
                    }
                    class_edit_props.body_fields.push( new_edit_field );
                    row_id += 1;
                    if (auto_grid_rows) {
                        class_edit_props.presentation.gridTemplateRows = class_edit_props.presentation.gridTemplateRows +rowSize;
                    }
                }
                else if (field.field_type == "array") {
                    let item = objdef.hasOwnProperty(field.field_name) ? objdef[ field.field_name ] : [];
                    childObjects.push(item);
                }
                else if (field.field_type == "object") {
                    let item = objdef.hasOwnProperty(field.field_name) ? objdef[ field.field_name ] : {};
                    childObjects.push(item);
                }
            }
            last_class_fields = classdef.fields;
        }
    }

    classorder.reverse();
    
    let final_classes = [];
    for (const classname of classorder) {

        if (all_classes[classname].display == "none") {
            continue;
        }
        let edit_props = edit_props_by_base[classname];
        if (edit_props.body_fields.length == 1) {
            // only the chapter title - skip
            continue;
        }
        final_classes.push(classname);
    }

    let nav = useNavigate();

    return (
        <div className="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName={form_name} formNumber="FORM 007" />
            <ErrorControl {...error} />
            <div style={{display:"grid", gridTemplateColumns:"1.0fr", gridTemplateRows:"96.0px 1.0fr" }}>
                <div style={{gridColumn:"1", gridRow:1}}>
                    <Paper style={{ padding:"16px", marginLeft:"16px", marginTop:"16px", marginRight:"16px"}}>
                        <Button id="runButton" variant="contained" color="success" style={{marginRight:"16px"}} onClick={
                            async () => {
                                console.log( {"cancel / home with":props});
                                nav('/Revolution/Home', {state:{...props} } );
                            }
                        }><FontAwesomeIcon icon={faPlay} />RUN</Button>
                        <Button id="cancelButton" variant="contained" onClick={
                            async () => {
                                console.log( {"cancel / home with":props});
                                nav('/Revolution/Home', {state:{...props} } );
                            }
                        }><FontAwesomeIcon icon={faSquareCaretLeft} />HOME</Button>
                    </Paper>
                </div>
                <div style={{ gridColumn:'1', gridRow:"2", overflow:"scroll", display:"flex", flexDirection:"row", height:"60vh", flexWrap:"wrap" }}>
                        {final_classes.map((classname, idx)=>{
                            let class_name = all_classes[classname].class_name;
                            let class_description = all_classes[classname].class_description;
                            let edit_props = edit_props_by_base[classname];
                            console.log({"render class": edit_props});
                            return (<div key={idx} style={{ width:"400px" }}>
                                <EditForm {...edit_props} error={error}  >
                                </EditForm>
                            </div>)
                        })}
                        <div style={{ display:"flex", flexDirection:"row", height:"auto",  flexWrap:"wrap" }}>
                            <ObjectsList objects={childObjects} setError={setError} user={props.user} />
                        </div>
                </div>
            </div>
        </div>
    );
}
