
import '../App.css'
import '../index.css'
import RevolutionBarControl from './RevolutionBarControl.js';
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { coronaSetTeam, coronaEditObject, coronaGetClass } from './Service.js';
import { useState } from "react";
import ErrorControl from './ErrorControl.js';
import ObjectsList from './ObjectsList.js';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function HomeForm(formProps) {
    const [error, setError] = useState({ success: false, message: "", inProgress: false, errors: [] });

    let nav = useNavigate();
    let loc = useLocation();
    let props = { ...formProps, ...loc.state };
    console.log({ props, "title": "Home" });

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
    console.log({'inventory':inventoryMap});


    let combinedPermissions = [];
    if (props.user.team && props.user.team.permissions) {
        props.user.team.permissions.forEach(perm => {
            combinedPermissions.push(perm);
        });
    }
    if (props.user.home_team && props.user.home_team.permissions) {
        props.user.home_team.permissions.forEach(perm => {
            combinedPermissions.push(perm);
        });
    }
    let referenced_classes = {};

    return (
        <div className="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName="HOME" formNumber="FORM 005" />
            <ErrorControl {...error} />
            <h2 style={{marginLeft:"16px"}}>Teams</h2>
            <div className="sectionbuttons">
                {props.user.allowed_teams.map((field, index) => {
                    let isSelected = props.user.team.team_name === field;
                    return <button key={index} className={isSelected ? 'button-selected' : ''} onClick={
                        async () => {
                            setError({ success: true, message: "Selecting Team", inProgress: true });
                            let response = await coronaSetTeam({'team_name':field }, {
                                successForm: '/Revolution/Home',
                                redoForm: '/Revolution/Home',
                                redoMessage: 'select failed.',
                                formProps: props
                            });
                            let nav_state = {};
                            if (response.success) {
                                nav_state = { user:response.data, ...response };
                            } else {
                                nav_state = { ...props };
                            }

                            setError({ success: response.success, message: response.message, inProgress: false });
                            nav(response.form, { state: nav_state });
                        }
                    }>{field}</button>;
                }
                )}
            </div>
            <h3 style={{marginLeft:"16px"}}>{props.user.team.team_name}</h3>           

            <Tabs style={{marginLeft:"16px", marginRight:"16px", height:"320px", border:"var(--rock1) solid 1px", borderRadius:"5px", padding:"8px", backgroundColor:"var(--rock6)"}}>
                <TabList>
                    <Tab>Data</Tab>
                    <Tab>Tickets</Tab>
                    <Tab>Articles</Tab>
                    <Tab>Inventory</Tab>
                </TabList>
                    <TabPanel style={{overflow:"auto"}}>
            {(combinedPermissions && combinedPermissions.length > 0) &&
                <div> 
                  {combinedPermissions.map((perm,index) => {
                    console.log({"permissions":perm});
                    let tempFilteredMap = Object.keys(perm.all_granted_classes);
                    let filteredMap = [];                    
                    for (let i=0;i<tempFilteredMap.length;i++) {
                        let base_name = tempFilteredMap[i];
                        if (!(base_name in referenced_classes)) {
                            filteredMap.push(base_name);
                            referenced_classes[base_name] = true;
                        }
                    }
                    if (perm.put !== "any" && perm.put !== "team") filteredMap = [];
                    return (
                    <div key={index}>
                        {filteredMap && filteredMap.map((base_name,index2) => {
                            let fields = [];
                            if (perm.all_granted_classes[base_name]) {
                                fields = fields.concat(perm.all_granted_classes[base_name]);
                            }
                            return <div style={{flexDirection:"row", display:"flex", flexWrap:"wrap"}}>
                                {fields.map((field, index3) => {                            
                                return (<button key={index3} onClick={
                                async () => {
                                    setError({ success: true, message: "Editing " + field, inProgress: true });
                                    let response = await coronaGetClass({'class_name':field }, {
                                        successForm: '/Revolution/ObjectSearch',
                                        redoForm: '/Revolution/Home',
                                        redoMessage: 'Create failed.',
                                        formProps: props.formProps
                                    });
                                    let nav_state = {};
                                    if (response.success) {
                                        nav_state = { user:props.user, class:response.data, ...response };
                                    } else {
                                        nav_state = { ...props, class:{}};
                                    }
                                    setError({ success: response.success, message: response.message, inProgress: false });
                                    nav(response.form, { state: nav_state });
                                }}>{field}</button>);
                            })}</div>})}
                    </div>)})}
                  </div>}
                  </TabPanel>    
                    <TabPanel style={{overflow:"auto"}}>
            {props.user.team &&props.user.team.tickets && props.user.team.tickets.length >= 0 && <ObjectsList user={props.user} objects={props.user.team.tickets} setError={setError}/> }
                    </TabPanel>
<TabPanel>
            {props.user.team && props.user.team.articles && props.user.team.articles.length >= 0 && <ObjectsList user={props.user}objects={props.user.team.articles}  setError={setError}/>}

</TabPanel>
<TabPanel style={{overflow:"auto"}}>
                      <div className="sectionbuttons">
                {props.user.inventory && props.user.inventory.map((field, index) => {
                    return <button key={index} onClick={
                        async () => {
                            setError({ success: true, message: "Edit " + field.class_name, inProgress: true });
                            let response = await coronaEditObject(field, {
                                successForm: '/Revolution/ObjectEdit',
                                redoForm: '/Revolution/Home',
                                redoMessage: 'select failed.',
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
                    }>{field.class_name}</button>
                }
                )}
            </div>
  
    </TabPanel>
        </Tabs>
        </div>
    );
}
