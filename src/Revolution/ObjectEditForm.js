
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
import { faEllipsisVertical, faSquareCaretLeft, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import H4 from '@mui/material/Button';
import Divider from '@mui/material/Button';

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

    for (const classname in all_classes) {
        let classdef = all_classes[classname];
        if (classdef) {
            // main fields
            class_description = classdef.class_description;
            class_name = classdef.class_name;   
            class_order = [class_name, ...classdef.ancestors];
            form_name = classdef.class_name.toUpperCase();
            let auto_grid_rows = false;
            let new_edit_props = { presentation: { "classdef": classdef, gridTemplateRows: classdef.grid_template_rows, gridTemplateColumns: classdef.grid_template_columns, gap: "10px", padding: "10px" }, body_fields: [] };
            if (new_edit_props.presentation.gridTemplateRows === "") {
                new_edit_props.presentation.gridTemplateRows = "60px";
                auto_grid_rows = true;
            }
            if (new_edit_props.presentation.gridTemplateColumns === "") {
                new_edit_props.presentation.gridTemplateColumns = "1.0fr";
            }
            edit_props_by_base[class_name] = new_edit_props;
            let row_id = 1;
            
            for (const fieldname in classdef.fields) {

                let field = classdef.fields[fieldname];
                let field_class = field.field_class;
                let edit_props = edit_props_by_base[field_class];
                edit_props.presentation.gridTemplateRows += rowSize;

                if (field.field_type === 'string' || field.field_type === 'number' || field.field_type === 'boolean' || field.field_type === 'date') {
                    let new_edit_field = { json_field_name: field.field_name, row: field.grid_row, column: field.grid_column, field_type: field.field_type, format: field.field_format, placeholder: field.placeholder || field.field_name, max_length: field.max_length, min_length: field.min_length };
                    if (field.grid_row ==="") {
                        new_edit_field.row = row_id;
                    }
                    if (field.grid_column ==="") {
                        new_edit_field.column = 1;
                    }
                    edit_props.body_fields.push( new_edit_field );
                    row_id += 1;
                    if (auto_grid_rows) {
                        edit_props.presentation.gridTemplateRows += " 60px";
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
        }
    }

    let nav = useNavigate();

    return (
        <div className="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName={form_name} formNumber="FORM 007" />
            <ErrorControl {...error} />
            {Object.keys(all_classes).map((classname, idx)=>{
                let class_name = all_classes[classname].class_name;
                let class_description = all_classes[classname].class_description;
                let edit_props = edit_props_by_base[classname];
                <div key={idx} style={{display: 'grid', gridTemplateColumns: '325px .9fr', gridTemplateRows: '1fr', gap: '10px' }}>
                    <H4>{class_name}:{class_description}</H4>
                    <EditForm {...edit_props} error={error} style={{ gridRow:1, gridColumn: 1, overflow:"scroll" }} >
                    </EditForm>
                    <ObjectsList objects={childObjects} setError={setError} user={props.user} style={{ gridRow:1, gridColumn: 2, overflow:"scroll" }}/>
                </div>
            })}
            <Divider></Divider>
            <div className="buttonBar">
            <Button id="runButton" onClick={
                async () => {
                    console.log( {"cancel / home with":props});
                    nav('/Revolution/Home', {state:{...props} } );
                }
            }><FontAwesomeIcon icon={faPlay} />RUN</Button>
            <Button id="cancelButton" onClick={
                async () => {
                    console.log( {"cancel / home with":props});
                    nav('/Revolution/Home', {state:{...props} } );
                }
            }><FontAwesomeIcon icon={faSquareCaretLeft} />HOME</Button>
        </div>

        </div>
    );
}
