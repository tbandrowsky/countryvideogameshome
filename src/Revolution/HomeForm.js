
import '../App.css'
import '../index.css'
import RevolutionBarControl from './RevolutionBarControl.js';
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { coronaGetClasses, coronaSetTeam } from './Service.js';
import { useState } from "react";
import ErrorControl from './ErrorControl.js';
import GridControl from './GridControl.js';

export default function HomeForm(formProps) {
    const [error, setError] = useState({ success: false, message: "", inProgress: false, errors: [] });

    let nav = useNavigate();
    let loc = useLocation();
    let props = { ...formProps, ...loc.state };
    console.log({ props, "title": "HomeForm" });
    let ticketColumns = [
        { key: 'class_name', name: 'Class' },
        { key: 'object_id', name: 'ObjectId' },
        { key: 'name', name: 'Name' },
        { key: 'description', name: 'Description' }
    ];

    return (
        <div class="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName="HOME" formNumber="FORM 005" />
            <ErrorControl {...error} />
            <div className="section">TEAMS</div>
            <div className="sectionbuttons">
                {props.data.team.allowed_teams.map((field, index) => {
                    return <button onClick={
                        async () => {
                            setError({ success: true, message: "Selecting Team", inProgress: true });
                            let response = await coronaSetTeam({}, {
                                successForm: '/Revolution/HomeForm',
                                redoForm: '/Revolution/HomeForm',
                                redoMessage: 'select failed.'
                            });
                            nav(response.form, { state: response.form_props });
                            setError({ success: response.success, message: response.message, inProgress: false });
                        }
                    }>{field}</button>;
                }
                )}
            </div>
            <div className="section">{props.data.team.team_name}</div>
            <div className="subsection">Tickets</div>
            {props.data.team.tickets && props.data.team.tickets.length > 0 && <GridControl columns={ticketColumns} rows={props.data.team.tickets} /> }

            <div className="subsection">Articles</div>
            {props.data.team.articles && props.data.team.articles.length > 0 && <GridControl columns={ticketColumns} rows={props.data.team.articles} />}

            <div className="section">TOOLS</div>
            <div className="sectionbuttons">
                <button id="searchButton" onClick={
                    async () => {
                        setError({ success: true, message: "Searching", inProgress: true });
                        let response = await coronaGetClasses({}, {
                            successForm: '/Revolution/ClassSearchForm',
                            redoForm: '/Revolution/ClassSearchForm',
                            redoMessage: 'Search failed.'
                        });
                        nav(response.form, { state: response.form_props });
                        setError({ success: response.success, message: response.message, inProgress: false });
                    }
                }>Data Explorer</button>                
            </div>
        </div>
    );
}
