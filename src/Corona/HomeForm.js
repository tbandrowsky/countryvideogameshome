
import '../App.css'
import '../index.css'
import RevolutionBarControl from './RevolutionBarControl.js';
import { AppSettings } from './AppSettings.js';
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { coronaGoFoward,  coronaGetUser, coronaSetTeam, coronaEditObject, coronaGetClass, coronaSetUser } from './Service.js';
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
    const [show_all, set_show_all] = useState(false);

    let nav = useNavigate();
    let user = coronaGetUser();

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

    let inventoryMap = Object.fromEntries(user.inventory.map(obj => [obj.class_name, obj]));

    let top_level_classes = {};

    let combinedPermissions = [];
    if (user.team && user.team.permissions) {
        user.team.permissions.forEach(perm => {
            combinedPermissions.push(perm);
            if (perm.root_classes) {
                for (let i = 0; i < perm.root_classes.length; i++) {
                    top_level_classes[perm.root_classes[i]] = true;
                }
            }
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
            <RevolutionBarControl applicationName={AppSettings.applicationName} formName="HOME" formNumber="FORM 005" />
            <ErrorControl {...error} />
            <div style={{display:"grid", gridTemplateRows:"auto auto", gridTemplateColumns:"1fr"}}>
            <Paper style={{ marginTop:"16px", marginRight:"16px", marginLeft:"16px",gap:"8px", display:"flex", flexDirection:"row", flexWrap:"wrap", padding:"8px", backgroundColor:"white", borderRadius:"5px", border:"var(--rock1) solid 1px"}}>
                {user.allowed_teams.map((field, index) => {
                    let isSelected = user.team.team_name === field;
                    return <Button variant="contained" key={index} onClick={
                        async () => {
                            setError({ success: true, message: "Selecting Team", inProgress: true });
                            let response = await coronaSetTeam({'team_name':field }, {
                                successForm: '/Corona/Home',
                                redoForm: '/Corona/Home',
                                redoMessage: 'select failed.'
                            });
                            if (response.success) {
                                coronaSetUser(response.data);
                            }

                            setError({ success: response.success, seconds:response.seconds, message: response.message, inProgress: false });
                        }
                    }><FontAwesomeIcon icon={isSelected ? faCheck:faTeamspeak} style={{marginRight:"8px"}}/>{field}</Button>;
                }
                )}
            </Paper>


            <Paper style={{margin:"16px", height:"100%", border:"var(--rock1) solid 1px", borderRadius:"5px", padding:"8px",paddingTop:"0px", backgroundColor:"white"}}>
            <h3 style={{marginLeft:"16px"}}>{user.team.team_name}</h3>           

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
                                        if (show_all || (class_name in top_level_classes) === true) {
                                            dataclasses.push(class_name);
                                        }
                                    }
                                }
                            }
                            return <div key={index2} style={{flexDirection:"row", display:"flex", flexWrap:"wrap", gap:"8px"}}>
                                {dataclasses.map((field, index3) => {                            
                                return (<Button variant="contained" key={index3} style={{width:"250px", marginBottom:"8px", marginRight:"18px"}} sx={{backgroundColor:(perm.class_colors && perm.class_colors.hasOwnProperty(base_name)) ? perm.class_colors[base_name] : user.home_team.class_color}}  onClick={
                                async () => {
                                    setError({ success: true, message: "Editing " + field, inProgress: true });
                                    let response = await coronaGetClass({'class_name':field }, {
                                        successForm: '/Corona/ObjectSearch',
                                        redoForm: '/Corona/Home',
                                        redoMessage: 'Create failed.'
                                    });
                                    if (response.success) {
                                        coronaGoFoward({name: field + " search", type:'search', path:'/Corona/ObjectSearch', class:response.data.class});
                                        nav(response.form);
                                    } 
                                    setError({ success: response.success, message: response.message, inProgress: false });
                                }}><FontAwesomeIcon icon={faDatabase} style={{marginRight:"8px"}}/>{field}</Button>);                                
                            })}</div>})}
                      </div>
                </div>}
                  </TabPanel>    
                    <TabPanel style={{overflow:"auto"}}>
                      <div className="sectionbuttons">
                {user.inventory && user.inventory.map((field, index) => {
                    return <Button variant="contained" sx={{backgroundColor:field.class_color}}  key={index} onClick={
                        async () => {
                            setError({ success: true, message: "Edit " + field.class_name, inProgress: true });
                            let edit_request = {...field, "include_children":true};
                            let response = await coronaEditObject(edit_request, {
                                successForm: '/Corona/ObjectEdit',
                                redoForm: '/Corona/Home',
                                redoMessage: 'select failed.'
                            });
                            if (response.success) {
                                coronaGoFoward({name: field.class_name, type:"object", path:'/Corona/ObjectEdit', navigation : response});
                                nav(response.form);
                                setError({ success: response.success, message: response.message, inProgress: false });
                            } 
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
