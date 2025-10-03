
import '../App.css'
import '../index.css'
import RevolutionBarControl from './RevolutionBarControl.js';
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { coronaSetTeam, coronaCreateObject, coronaEditObject } from './Service.js';
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

    let inventoryMap = Object.fromEntries(props.data.inventory.map(obj => [obj.class_name, obj]));
    console.log({'inventory':inventoryMap});

    return (
        <div class="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName="HOME" formNumber="FORM 005" />
            <ErrorControl {...error} />
            <h2 style={{marginLeft:"16px"}}>Inventory</h2>
            <div className="sectionbuttons">
                {props.data.inventory && props.data.inventory.map((field, index) => {
                    return <button key={index} onClick={
                        async () => {
                            setError({ success: true, message: "Edit " + field.class_name, inProgress: true });
                            let response = await coronaEditObject(field, {
                                successForm: '/Revolution/ObjectEdit',
                                redoForm: '/Revolution/Home',
                                redoMessage: 'select failed.',
                                formProps: formProps
                            });
                            nav(response.form, { state: response.form_props });
                            setError({ success: response.success, message: response.message, inProgress: false });
                        }
                    }>{field.class_name}</button>
                }
                )}
            </div>
            <h2 style={{marginLeft:"16px"}}>Teams</h2>
            <div className="sectionbuttons">
                {props.data.team.allowed_teams.map((field, index) => {
                    let isSelected = props.data.team.team_name === field;
                    return <button key={index} className={isSelected ? 'button-selected' : ''} onClick={
                        async () => {
                            setError({ success: true, message: "Selecting Team", inProgress: true });
                            let response = await coronaSetTeam({'team_name':field }, {
                                successForm: '/Revolution/Home',
                                redoForm: '/Revolution/Home',
                                redoMessage: 'select failed.'
                            });
                            nav(response.form, { state: response.form_props });
                            setError({ success: response.success, message: response.message, inProgress: false });
                        }
                    }>{field}</button>;
                }
                )}
            </div>
            <h3 style={{marginLeft:"16px"}}>{props.data.team.team_name} - {props.data.team.team_decription}</h3>           

            <Tabs style={{marginLeft:"16px", marginRight:"16px", height:"320px", border:"var(--rock1) solid 1px", borderRadius:"5px", padding:"8px", backgroundColor:"var(--rock6)"}}>
                <TabList>
                    <Tab>Data</Tab>
                    <Tab>Tickets</Tab>
                </TabList>
                    <TabPanel>
            {(props.data.team && props.data.team.permissions && props.data.team.permissions.length >0) && 
                <div className="sectionbuttons"> 
                  {props.data.team.permissions.map((item,index) => {
                    let filteredMap = item.grant_classes.filter((grant_class_name, index)=> { return !(grant_class_name in inventoryMap)});
                    if (item.put !== "any" && item.put !== "team") filteredMap = [];
                    return filteredMap.map((field,index) => {
                      return (<button key={index} onClick={
                        async () => {
                            setError({ success: true, message: "Creating " + field, inProgress: true });
                            let response = await coronaCreateObject({'class_name':field }, {
                                successForm: '/Revolution/ObjectEdit',
                                redoForm: '/Revolution/Home',
                                redoMessage: 'Create failed.',
                                formProps: formProps
                            });
                            nav(response.form, { state: response.form_props });
                            setError({ success: response.success, message: response.message, inProgress: false });
                        }}>{field}</button>);
                        })
                  })}</div>
                  }
                </TabPanel>    
                    <TabPanel>
            {props.data.team &&props.data.team.tickets && props.data.team.tickets.length > 0 && <GridControl columns={ticketColumns} rows={props.data.team.tickets} /> }
                    </TabPanel>
<TabPanel>
            {props.data.team && props.data.team.articles && props.data.team.articles.length > 0 && <GridControl columns={articleColumns} rows={props.data.team.articles} />}

</TabPanel>
<TabPanel>
            {props.data.team&&props.data.team.classes && props.data.team.classes.length > 0 && <GridControl columns={classColumns} rows={props.data.team.classes} />}
    </TabPanel>
        </Tabs>
        </div>
    );
}
