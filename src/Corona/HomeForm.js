
import '../App.css'
import '../index.css'
import RevolutionBarControl from './RevolutionBarControl.js';
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { coronaGoFoward,  coronaSetTeam, coronaEditObject, coronaGetClass } from './Service.js';
import { useState } from "react";
import ErrorControl from './ErrorControl.js';
import ObjectsList from './ObjectsList.js';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faDatabase, faFile } from '@fortawesome/free-solid-svg-icons';
import { faTeamspeak } from '@fortawesome/free-brands-svg-icons';

export default function HomeForm(formProps) {
    const [error, setError] = useState({ success: false, message: "", inProgress: false, errors: [] });

    let nav = useNavigate();
    let loc = useLocation();
    let props = { ...formProps, ...loc.state };

    let ticketColumns = [
        { key: 'class_name', name: 'Class' },
        { key: 'object_id', name: 'ObjectId' },
        { key: 'ticket_name', name: 'Name' },
        { key: 'ticket_description', name: 'Description' },
        { key: 'created', name: 'Created' },
        { key: 'created_by', name: 'CreatedBy' },
        { key: 'modified', name: 'Modified' },
        { key: 'modifiedby', name: 'ModifiedBy' },
    ];

    let articleColumns = [
        { key: 'class_name', name: 'Class' },
        { key: 'object_id', name: 'Object Id' },
        { key: 'article_name', name: 'Name' },
        { key: 'description', name: 'Description' },
        { key: 'created', name: 'Created' },
        { key: 'created_by', name: 'Created By' },
        { key: 'modified', name: 'Modified' },
        { key: 'modified_by', name: 'Modified By' },
    ];

    let classColumns = [
        { key: 'class_name', name: 'Class' },
        { key: 'class_description', name: 'Description' }
    ];

    let inventoryMap = Object.fromEntries(props.user.inventory.map(obj => [obj.class_name, obj]));

    let combinedPermissions = [];
    if (props.user.team && props.user.team.permissions) {
        props.user.team.permissions.forEach(perm => {
            combinedPermissions.push(perm);
        });
    }
 
    
    let referenced_classes = {};
    let filteredMap = [];

    combinedPermissions.map((perm,index) => {
        let tempFilteredMap = Object.keys(perm.all_granted_classes);
        for (let i=0;i<tempFilteredMap.length;i++) {
            let base_name = tempFilteredMap[i];
            if (!(base_name in referenced_classes)) {
                filteredMap.push(base_name);
                referenced_classes[base_name] = perm;
            }
        }
        return perm;
    });

    return (
        <div className="contentbackgroundformrevolution">
            <RevolutionBarControl applicationName={props.applicationName} formName="HOME" formNumber="FORM 005" />
            <ErrorControl {...error} />
            <div style={{display:"grid", gridTemplateRows:"auto auto", gridTemplateColumns:"1fr"}}>
            <Paper style={{ marginTop:"16px", marginRight:"16px", marginLeft:"16px",gap:"8px", display:"flex", flexDirection:"row", flexWrap:"wrap", padding:"8px", backgroundColor:"white", borderRadius:"5px", border:"var(--rock1) solid 1px"}}>
                {props.user.allowed_teams.map((field, index) => {
                    let isSelected = props.user.team.team_name === field;
                    return <Button variant="contained" key={index} onClick={
                        async () => {
                            setError({ success: true, message: "Selecting Team", inProgress: true });
                            let response = await coronaSetTeam({'team_name':field }, {
                                successForm: '/Corona/Home',
                                redoForm: '/Corona/Home',
                                redoMessage: 'select failed.',
                                formProps: props
                            });
                            let nav_state = {};
                            if (response.success) {
                                nav_state = { user:response.data, ...response };
                            } else {
                                nav_state = { ...props };
                            }

                            setError({ success: response.success, seconds:response.seconds, message: response.message, inProgress: false });
                            nav(response.form, { state: nav_state });
                        }
                    }><FontAwesomeIcon icon={isSelected ? faCheck:faTeamspeak} style={{marginRight:"8px"}}/>{field}</Button>;
                }
                )}
            </Paper>


            <Paper style={{margin:"16px", height:"100%", border:"var(--rock1) solid 1px", borderRadius:"5px", padding:"8px",paddingTop:"0px", backgroundColor:"white"}}>
            <h3 style={{marginLeft:"16px"}}>{props.user.team.team_name}</h3>           

            <Tabs >
                <TabList>
                    <Tab>Data</Tab>
                    <Tab>Inventory</Tab>
                </TabList>
                    <TabPanel>
            {(filteredMap && filteredMap.length > 0) &&
                <div className="sectionbuttons" style={{height:"50vh", overflow:"auto"}}> 
                    <div>
                        {filteredMap.map((base_name,index2) => {
                            let dataclasses = [ base_name];
                            let perm = referenced_classes[base_name];
                            if (perm) {
                                let permkeys = perm.all_granted_classes[base_name];
                                for (let i=0;i<permkeys.length;i++) {
                                    let class_name = permkeys[i];
                                    if (class_name != base_name) {
                                        dataclasses.push(class_name);
                                    }
                                }
                            }
                            return <div key={index2} style={{flexDirection:"row", display:"flex", flexWrap:"wrap", gap:"8px"}}>
                                {dataclasses.map((field, index3) => {                            
                                return (<Button variant="contained" key={index3} style={{width:"250px", marginBottom:"8px", marginRight:"18px"}} sx={{backgroundColor:(perm.class_colors && perm.class_colors.hasOwnProperty(base_name)) ? perm.class_colors[base_name] : props.user.home_team.class_color}}  onClick={
                                async () => {
                                    setError({ success: true, message: "Editing " + field, inProgress: true });
                                    let response = await coronaGetClass({'class_name':field }, {
                                        successForm: '/Corona/ObjectSearch',
                                        redoForm: '/Corona/Home',
                                        redoMessage: 'Create failed.',
                                        formProps: props.formProps
                                    });
                                    let nav_state = {};
                                    if (response.success) {
                                        nav_state = { user:props.user, class:response.data, ...response };
                                        coronaGoFoward({name: field.class_name, type:'search', path:'/Corona/ObjectSearch', response:response});
                                    } else {
                                        nav_state = { ...props, class:{}};
                                    }
                                    setError({ success: response.success, message: response.message, inProgress: false });
                                    nav(response.form, { state: nav_state });
                                }}><FontAwesomeIcon icon={faDatabase} style={{marginRight:"8px"}}/>{field}</Button>);                                
                            })}</div>})}
                      </div>
                </div>}
                  </TabPanel>    
                    <TabPanel style={{overflow:"auto"}}>
                      <div className="sectionbuttons">
                {props.user.inventory && props.user.inventory.map((field, index) => {
                    return <Button variant="contained" sx={{backgroundColor:field.class_color}}  key={index} onClick={
                        async () => {
                            setError({ success: true, message: "Edit " + field.class_name, inProgress: true });
                            let edit_request = {...field, "include_children":true};
                            let response = await coronaEditObject(edit_request, {
                                successForm: '/Corona/ObjectEdit',
                                redoForm: '/Corona/Home',
                                redoMessage: 'select failed.',
                                formProps: props
                            });
                            let nav_state = {};
                            if (response.success) {
                                nav_state = { user:props.user, ...response };
                                coronaGoFoward({name: field.class_name, type:"object", path:'/Corona/ObjectEdit', request : response});                                
                            } else {
                                nav_state = { ...props };
                            }
                            setError({ success: response.success, message: response.message, inProgress: false });
                            nav(response.form, { state: nav_state });
                        }
                    } style={{width:"250px", marginBottom:"8px", marginRight:"18px"}}><FontAwesomeIcon icon={faFile} style={{marginRight:"8px"}}/>{field.class_name}</Button>
                }
                )}
            </div>
  
    </TabPanel>
        </Tabs>
</Paper>
</div>
        </div>
    );
}
