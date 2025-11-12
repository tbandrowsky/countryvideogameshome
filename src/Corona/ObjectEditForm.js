
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
import { faEllipsisVertical, faAdd, faSquareCaretLeft, faPlay } from '@fortawesome/free-solid-svg-icons';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { coronaGetCurrent, coronaGoHome, coronaEditObject, coronaGoFoward, coronaRunObject } from './Service.js';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';


export default function ObjectEditForm(props) {


    let current_state = coronaGetCurrent();
    console.log({ 'ObjectEditForm': { props, current_state } });

    const [data, setData] = useState(current_state.data.object);
    const [error, setError] = useState({ success: false, message: "", inProgress: false, field_errors: {} });

    const put_value = (json_field_name, value) => {
        setData(prev => ({ ...prev, data: { ...prev.data, [json_field_name]: value } }));
    };

    const get_value = (json_field_name) => {
        if (json_field_name in data.data)
            return data.data[json_field_name];
        else
            return "";
    }

    console.log({ 'ObjectEditForm': { props, data } });

    let objdef = data.data.object;

    let rowSize = " 60px";

    let form_name = "EDIT";
    let class_name = "object";
    let class_description = "This is an object"
    let class_order = [];

    let this_object_tabs = [];
    let child_object_tabs = [];
    let query_tabs = [];    

    let all_classes = data.data.classes || {};

    let current_class = "";
    let number_of_classes = Object.keys(all_classes).length;
    
    let edit_request = {};

    // this part deals with setting up edit tabs for "this_object"
    // find our class then work to the base.

    current_class = objdef.class_name;
    let master_class_name = objdef.class_name;
    let master_object_id = objdef.object_id;

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
            let row_id = 0;
            let tab_index = 0;

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
                    tab_index += 1;
                    let new_edit_field = { json_field_name: field.field_name, 
                        row: field.grid_row, 
                        column: field.grid_column, 
                        field_type: field.field_type, 
                        format: field.field_format, 
                        placeholder: field.placeholder || field.label || field.field_name, 
                        max_length: field.max_length,                         
                        min_length: field.min_length,
                        tab_index : field.tabindex || tab_index,
                        "display": field.display || ''};

                    if (field.grid_row =="" || field.grid_row == null) {
                        new_edit_field.row = row_id;
                    }
                    if (field.grid_column =="" || field.grid_column == null) {
                        new_edit_field.column = 1;
                    }
                    class_edit_props.body_fields.push( new_edit_field );
                    if (auto_grid_rows) {
                        if (field.display === 'markdown') { 
                            new_edit_field.grid_row = new_edit_field.row + " / span 4";
                            row_id += 3;
                        }
                        class_edit_props.presentation.gridTemplateRows = class_edit_props.presentation.gridTemplateRows +rowSize;
                    }
                    row_id += 1;
                }
                else if (field.field_type === "array" || field.field_type === "object" || field.field_type === "query") {
                    let item = objdef.hasOwnProperty(field.field_name) ? objdef[ field.field_name ] : [];
                    let childrenMap ={};
                    let child_tab = { name: field.label || field.field_name, description: field.description || "", edit_props: {}, objects:item, childrenMap: childrenMap, classes: props.data.child_classes }

                    if (field.field_type === "query") {
                        query_tabs.push( child_tab );
                    } 
                    else {
                        child_object_tabs.push( child_tab );
                    }

                    if (field.child_objects)
                    {
                        child_tab.tab_create = [];
                        let child_classes = Object.keys(field.child_objects);
                        for (let i = 0; i < child_classes.length; i++) {
                            let xclass_name = child_classes[i];
                            child_tab.tab_create.push( field.child_objects[xclass_name] );
                        }
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

    console.log({ this_object_tabs, child_object_tabs,  query_tabs });

    let nav = useNavigate();
    let run_object = { "data" : objdef };

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
                                if (response.success) {
                                    setData(response.data);
                                } 
                                setError({ success: response.success, message: response.message, inProgress: false });
                            }
                        }><FontAwesomeIcon icon={faPlay} />RUN</Button>
                        <Button id="cancelButton" variant="contained" onClick={
                            async () => {
                                console.log( {"cancel / home with":props});
                                coronaGoHome({name: 'Home', type:'home',path:'/Corona/Home', response:{}});
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
                                    <div className="button_bar" style={{ display:"flex", flexDirection:"row", flexWrap:"wrap", marginBottom:"8px" }}>
                        {tab_data.tab_create && tab_data.tab_create.map( (child, index) => (                            
                            <Button key={index} id="createObject" variant='contained' color="primary" style={{width:"250px"}} onClick={
                                async () => {
                                    setError({ success: true, message: "Create " + child.child_class_name, inProgress: true });
                                    edit_request = { class_name: child.child_class_name };
                                    if (child.copy_values) {
                                        let temp = Object.keys( child.copy_values );
                                        for (let i=0;i<temp.length;i++) {
                                            let key = temp[i];
                                            edit_request[key] = objdef[ child.copy_values[key] ];
                                        }
                                    }
                                    let response = await coronaEditObject( {data:edit_request}, {
                                        successForm: '/Corona/ObjectEdit',
                                        redoForm: '/Corona/Home',
                                        redoMessage: 'Edit Object failed.',
                                        formProps: props
                                    });
                                    if (response.success) {
                                        coronaGoFoward({name: edit_request.class_name, type:'object', path:'/Corona/ObjectEdit', request: {data:edit_request}, data:response.data});
                                    } 
                                    setError({ success: response.success, message: response.message, inProgress: false });
                                }
                            }><FontAwesomeIcon icon={faAdd} />{child.child_class_name}</Button>
))}
</div>
</TabPanel>
                        )}

                        {query_tabs.map((tab_data, idx) => 
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
