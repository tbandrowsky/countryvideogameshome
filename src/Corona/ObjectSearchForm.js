
import '../App.css'
import '../index.css'
import { useState } from "react";
import RevolutionBarControl from './RevolutionBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import { coronaGoFoward, coronaGetCurrent, coronaQuery, coronaEditObject, coronaGetClass, coronaGetUser } from './Service.js';
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

    let user = coronaGetUser();
    let current_nav = coronaGetCurrent();
    console.log({"search" :current_nav});
    let current_class = current_nav.class;

    const [classes, setClasses] = useState([current_nav.class]);
    const [request, setRequest] = useState({});
    const [results, setResults] = useState({});
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

    let childrenMap = results || {};

    let edit_props = {
        presentation: {
            gridTemplateRows: "20px 20px auto",
            gridTemplateColumns: "40% 40%",
            gap: "20px"
        },
        body_fields: [
        ],
        put_value,
        get_value
    };

    let classdef = current_class;

    let form_name = "SEARCH";
    let class_name = "object";
    let class_description = "";

    let edit_field_names = [];


    if (classdef) {
        // main fields

        class_name = classdef.class_name;
        form_name = class_name.toUpperCase();
        class_description = classdef.description;
        edit_props.body_fields.push( { text: class_name + " (" + classdef.object_count + " objects)", row: 1, column:"1/3", field_type: "chaptersubtitle"  });
        edit_props.body_fields.push( { json_field_name: "search_text", row: 2, column:"1/3", field_type: "string", format: "", placeholder: "Search:", max_length: 200, min_length: 0 });
        edit_props.body_fields.push( { json_field_name: "start_date", row: 3, column:'1', field_type: "datetime", format: "", placeholder: "From:", max_length: 200, min_length: 0 });
        edit_props.body_fields.push( { json_field_name: "stop_date", row:3, column:'2', field_type: "datetime", format: "", placeholder: "To:", max_length: 200, min_length: 0 });

        for (const fieldname in classdef.fields) {
            let field = classdef.fields[fieldname];
            edit_props.presentation.gridTemplateRows += "60px";

            if (field.field_type === 'string') {
                edit_field_names.push(field.field_name);    
            }
        }
    }

    let nav = useNavigate();

    return (
        <div className="contentbackgroundformrevolution">
            <RevolutionBarControl applicationName={props.applicationName} formName={form_name} formNumber="FORM 007" />
            <ErrorControl {...error} />
            <div style={{display: 'grid', gridTemplateColumns: '400px 1fr', gridTemplateRows:'70vh', marginRight:"16px", backgroundColor:"white", borderShadow:"var(--rock1) 0px 0px 4px", borderRadius:"5px", paddingBottom:"16px", paddingTop:"8px", paddingLeft:"16px" }}>
                <div style={{ gridColumn: '1', gridRow:"1"}}>
                    <EditForm {...edit_props} error={error} style={{ gridColumn: '1' }} >
                    <h4 style={{ marginTop:"16px" }}>Search for {class_name}</h4>
                        <div className="buttonBar" style={{gap:"10px", display:"flex", flexDirection:"row", marginBottom:"16px" }}>
                            <Button id="searchButton" variant='contained' color="primary"  onClick={
                                async () => {
                                    setError({ success: true, message: "Searching...", inProgress: true });
                                    let search_request = { "class_name": "query",
                                        "from": [{
                                            "class_name": classdef.class_name,
                                            "name": classdef.class_name,
                                            "filter": { 
                                                "full_text" : get_value("search_text")
                                            }
                                        }],
                                        "stages": [ {
                                            "class_name": "filter",
                                            "input":classdef.class_name,
                                            "condition": { 
                                                    "class_name": "all", 
                                                    "conditions" :[ { class_name:"allow_all"}]
                                            },
                                            "name": "result"
                                        }]
                                    };
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
                                        successForm: '/Corona/ObjectSearch',
                                        redoForm: '/Corona/ObjectSearch',
                                        redoMessage: 'Cannot search.'
                                    },
                                    props.formProps);

                                    let nav_state = {};

                                    if (response.success && response.data && Array.isArray(response.data)) {
                                        const uniqueClassNames = new Set();

                                        childrenMap = {};

                                        // First, build the children map and collect unique class names
                                        response.data.forEach((obj) => {
                                            if (obj.class_name) {
                                                if (!(obj.class_name in childrenMap)) {
                                                    childrenMap[obj.class_name] = [];
                                                }
                                                childrenMap[obj.class_name].push(obj);
                                                uniqueClassNames.add(obj.class_name);
                                            }
                                        });

                                        // Then fetch class definitions for unique class names
                                        const classPromises = Array.from(uniqueClassNames).map(async (className) => {
                                            try {
                                                const classDef = await coronaGetClass({ class_name: className }, { user: user });
                                                return { className, classDef };
                                            } catch (err) {
                                                console.error(`Failed to fetch class ${className}:`, err);
                                                return { className, classDef: null };
                                            }
                                        });

                                        const classResults = await Promise.all(classPromises);
                                        
                                        // Update classes state once with all results
                                        const newClasses = {};
                                        classResults.forEach(({ className, classDef }) => {
                                            if (classDef && classDef.data.class) {
                                                newClasses[className] = classDef.data.class;
                                            }
                                        });
                                        
                                        setResults(childrenMap);
                                        setClasses(newClasses);
                                    }
                                    setError({ success: response.success, message: response.message, count: response?.data?.length ?? 0, seconds:response.seconds, inProgress: false });
                                    if (response.success) {
                                        nav_state = { rows:response.data,...response, user:user, class:props.class, childrenMap:childrenMap };
                                        setResults(childrenMap);
                                    } 
                                }
                            }><FontAwesomeIcon icon={faSearch} />SEARCH</Button>
                            <Button id="cancelButton" variant='contained' color="success"  onClick={
                                async () => {
                                    nav('/Corona/Home', {state:{...props} } );
                                }
                            }><FontAwesomeIcon icon={faSquareCaretLeft} />HOME</Button>
                        </div>
                    </EditForm>
                    <Paper elevation={3} style={{ gridRow:"2", marginLeft:"16px", marginTop:"16px", marginRight:"16px", paddingTop:"4px", paddingBottom:"8px", height:"100%", overflow:"auto" }}>
                    <h4 style={{ marginLeft:"16px", marginTop:"16px", marginBottom:"0px"}}>Create new {class_name}</h4>
                        {classdef && classdef.descendants && classdef.descendants.map( (descendant, index) => (
                            <div key={index} style={{ margin:"8px"}}>
                            <Button key={index} id="createObject" variant='contained' color="primary" style={{width:"90%"}} onClick={
                                async () => {
                                    setError({ success: true, message: "Create " + descendant, inProgress: true });
                                    let response = await coronaEditObject({ data: { class_name: descendant }}, {
                                        successForm: '/Corona/ObjectEdit',
                                        redoForm: '/Corona/ObjectSearch',
                                        redoMessage: 'Edit Object failed.',
                                        formProps: props
                                    });
                                    if (response.success) {
                                        coronaGoFoward({ type:"object", name: descendant, path:'/Corona/ObjectEdit', navigation:response });
                                        nav(response.form);
                                    }
                                    setError({ success: response.success, message: response.message, inProgress: false });
                                }
                            }><FontAwesomeIcon icon={faAdd} />{descendant}</Button>
                            </div>
                            ))}
                    </Paper>
                </div>
                <div style={{ gridColumn: "2", gridRow:"1" }}>
                    <h4 style={{  paddingTop:"10px", paddingLeft:"16px"}}>{class_name} Items</h4>
                    <ObjectsList classes={classes} childrenMap={childrenMap} user={user}  setError={setError} 
                        onNavigate={(response)=> {
                            console.log({"NAVIGATE": response});
                            nav('/Corona/ObjectEdit');
                        }} />
                </div>
            </div>
        </div>
    );
}
