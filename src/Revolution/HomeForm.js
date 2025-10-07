
import '../App.css'
import '../index.css'
import RevolutionBarControl from './RevolutionBarControl.js';
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { coronaSetTeam, coronaEditObject, coronaGetClass } from './Service.js';
import { useState } from "react";
import ErrorControl from './ErrorControl.js';
import GridControl from './GridControl.js';
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

    return (
        <div class="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName="HOME" formNumber="FORM 005" />
            <ErrorControl {...error} />
            <h2 style={{marginLeft:"16px"}}>Inventory</h2>
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
            <h2 style={{marginLeft:"16px"}}>Teams</h2>
            <div className="sectionbuttons">
                {props.user.team.allowed_teams.map((field, index) => {
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
                </TabList>
                    <TabPanel>
            {(props.user.team && props.user.team.permissions && props.user.team.permissions.length >0) && 
                <div className="sectionbuttons"> 
                  {props.user.team.permissions.map((item,index) => {
                    let filteredMap = item.grant_classes.filter((grant_class_name, index)=> { return !(grant_class_name in inventoryMap)});
                    if (item.put !== "any" && item.put !== "team") filteredMap = [];
                    return filteredMap.map((field,index) => {
                      return (<button key={index} onClick={
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
                        })
                  })}</div>
                  }
                </TabPanel>    
                    <TabPanel>
            {props.user.team &&props.user.team.tickets && props.user.team.tickets.length > 0 && <GridControl columns={ticketColumns} rows={props.user.team.tickets} /> }
                    </TabPanel>
<TabPanel>
            {props.user.team && props.user.team.articles && props.user.team.articles.length > 0 && <GridControl columns={articleColumns} rows={props.user.team.articles} />}

</TabPanel>
<TabPanel>
            {props.user.team&&props.user.team.classes && props.user.team.classes.length > 0 && <GridControl columns={classColumns} rows={props.user.team.classes} />}
    </TabPanel>
        </Tabs>
        </div>
    );
}
