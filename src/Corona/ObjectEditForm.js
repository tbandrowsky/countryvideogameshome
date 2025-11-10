
import '../App.css'
import '../index.css'
import './EditForm.css'
import { useState } from "react";
import RevolutionBarControl from './RevolutionBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import ObjectsList from './ObjectsList.js';
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
import { coronaRunObject } from './Service.js';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';


export default function ObjectEditForm(props) {

    let loc = useLocation();
    props = { ...props, ...loc.state };


    const [request, setRequest] = useState({ ...props.data.object });
    const [error, setError] = useState({ success: false, message: "", inProgress: false, field_errors: {} });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    const get_value = (json_field_name) => {
        if (json_field_name in request)
            return request[json_field_name];
        else
            return "";
    }

    let objdef = props.data.object;


    let rowSize = " 60px";

    let form_name = "EDIT";
    let class_name = "object";
    let class_description = "This is an object"
    let class_order = [];

    let this_object_tabs = [];
    let child_object_tabs = [];
    let query_tabs = [];    

    let all_classes = props.data.classes || {};

    let current_class = "";
    let number_of_classes = Object.keys(all_classes).length;
    

    // this part deals with setting up edit tabs for "this_object"
    // find our class then work to the base.

    current_class = objdef.class_name;

    let classorder = [ current_class ];
    let base_found = true;
    while (base_found) {
        base_found = false;
        let tempclass = all_classes[current_class];
        if (tempclass) {
            classorder.unshift(current_class);
            current_class = tempclass.base_class_name;
            base_found = true;
        }
    }

    let last_class_fields = {};
    let class_edit_props = {};
    let auto_grid_rows = false;

    let object_tab = {};

    for (const classname of classorder) {
        let classdef = all_classes[classname];
        if (classdef) {


            object_tab = { "name": classdef.class_name, "description": classdef.class_description, "edit_props": {} };
            // main fields
            // the last one is the base class so this works
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
            object_tab.edit_props = class_edit_props;
            let row_id = 1;

            let new_edit_field = {
                row: row_id, 
                column: 1, 
                field_type: "chaptersubtitle", 
                text: class_description  };

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
                
                if (field.field_type === 'string' || field.field_type === 'number' ||field.field_type === 'double' || field.field_type === 'boolean' || field.field_type === 'datetime') {
                    let new_edit_field = { json_field_name: field.field_name, 
                        row: field.grid_row, 
                        column: field.grid_column, 
                        field_type: field.field_type, 
                        format: field.field_format, 
                        placeholder: field.placeholder || field.label || field.field_name, 
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
                else if (field.field_type === "array" || field.field_type === "object" || field.field_type === "query") {
                    let item = objdef.hasOwnProperty(field.field_name) ? objdef[ field.field_name ] : [];
                    let childrenMap ={};
                    let child_tab = { name: field.label || field.field_name, description: field.description || "", edit_props: {}, objects:item, childrenMap: childrenMap, classes: props.data.child_classes }
                    child_object_tabs.push( child_tab );

                    if (field.child_objects && field.child_objects.base_constructors)
                    {
                        child_tab.tab_create = field.child_objects.base_constructors;
                    }

                    if (Array.isArray(item)) {
                        for (let i = 0; i < item.length; i++) {
                            let childobj = item[i];
                            let childclass = childobj.class_name;
                            if (childclass > '') {
                                if (!childrenMap[childclass]) {
                                    childrenMap[childclass] = [];
                                }
                                childrenMap[childclass].push( childobj );
                            }
                        }
                    }                     
                    else 
                    {
                        let childobj = item;
                        let childclass = childobj.class_name;
                        if (childclass > '') {
                            if (!childrenMap[childclass]) {
                                childrenMap[childclass] = [];
                            }
                            childrenMap[childclass].push( childobj );
                        }
                    }
                }
            }

            if (object_tab.edit_props.body_fields.length > 0) {
                this_object_tabs.push( object_tab );
            }

            last_class_fields = classdef.fields;
        }
    }


    let nav = useNavigate();
    let run_object = { "data" : request };

    return (
        <div className="contentbackgroundformrevolution">
            <RevolutionBarControl applicationName={props.applicationName} formName={form_name} formNumber="FORM 007" />
            <ErrorControl {...error} />
            <div style={{display:"grid", gridTemplateColumns:"1.0fr", gridTemplateRows:"96.0px 80vh" }}>
                <div style={{gridColumn:"1", gridRow:1}}>
                    <Paper style={{ padding:"16px", marginLeft:"16px", marginTop:"16px", marginRight:"16px"}}>
                        <Button id="runButton" variant="contained" color="success" style={{marginRight:"16px"}} onClick={
                            async () => {
                                setError({ success: true, message: "Edit " + class_name, inProgress: true });                               
                                let response = await coronaRunObject(run_object, {
                                    successForm: '/Corona/ObjectEdit',
                                    redoForm: '/Corona/ObjectEdit',
                                    redoMessage: 'Run failed.',
                                    formProps: props
                                });
                                let nav_state = {};
                                if (response.success) {
                                    nav_state = { user:props.user, ...response };
                                } else {
                                    nav_state = { ...props };
                                }
                                setError({ success: response.success, message: response.message, inProgress: false });
                                console.log({"edit object nav_state":nav_state});
                                nav(response.form, { state: nav_state });
                            }
                        }><FontAwesomeIcon icon={faPlay} />RUN</Button>
                        <Button id="cancelButton" variant="contained" onClick={
                            async () => {
                                console.log( {"cancel / home with":props});
                                nav('/Corona/Home', {state:{...props} } );
                            }
                        }><FontAwesomeIcon icon={faSquareCaretLeft} />HOME</Button>
                    </Paper>
                </div>
                <div style={{ gridColumn:'1', gridRow:'2', height:"100%"  }}>
                    <Paper style={{ margin:"16px", paddingBottom:"16px", paddingTop:"16px", paddingLeft:"16px", paddingRight:"16px", height:"100%" }}>
                        <Tabs style={{width:"100%", height:"80%"}}>
                            <TabList>
                                {this_object_tabs.map((tab_data, idx) => <Tab key={idx}>{tab_data.name}</Tab>)}
                                {child_object_tabs.map((tab_data, idx) => <Tab key={idx}>{tab_data.name}</Tab>)}
                                {query_tabs.map((tab_data, idx) => <Tab key={idx}>{tab_data.name}</Tab>)}
                            </TabList>
                                {this_object_tabs.map((tab_data, idx) => 
                                <TabPanel style={{ height:"75%", overflow:"auto" }}  key={idx}>                
                                    <EditForm {...tab_data.edit_props} error={error} ></EditForm>
                                </TabPanel>)}

                                {child_object_tabs.map((tab_data, idx) => 
                                <TabPanel style={{ height:"75%", overflow:"auto" }} >
                                            <div key={idx} style={{ display:"flex", flexDirection:"row", flexGrow:1, flexWrap:"wrap", overflowY:"scroll" }}>
                                                <ObjectsList classes={tab_data.classes} childrenMap={tab_data.childrenMap} user={props.user} style={{  overflowY:"auto", width:"calc(100% - 64px)", height:"calc(100% - 96px)" }} setError={setError} />
                                            </div>
                                </TabPanel>
                                )}

                        </Tabs>
                    </Paper>
                </div>
            </div>
        </div>
    );
}
