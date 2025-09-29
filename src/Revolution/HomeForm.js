
import '../App.css'
import '../index.css'
import RevolutionBarControl from './RevolutionBarControl.js';
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { coronaSetTeam } from './Service.js';
import { useState } from "react";
import ErrorControl from './ErrorControl.js';
import GridControl from './GridControl.js';

export default function HomeForm(formProps) {
    const [error, setError] = useState({ success: false, message: "", inProgress: false, errors: [] });

    let nav = useNavigate();
    let loc = useLocation();
    let props = { ...formProps, ...loc.state };
    console.log({ props, "title": "Home" });


    let ticketColumns = [
        { key: 'class_name', name: 'Class' },
        { key: 'object_id', name: 'ObjectId' },
        { key: 'name', name: 'Name' },
        { key: 'description', name: 'Description' },
        { key: 'created', name: 'Created' },
        { key: 'createdby', name: 'CreatedBy' },
        { key: 'modified', name: 'Modified' },
        { key: 'modifiedby', name: 'ModifiedBy' },
    ];

    let articleColumns = [
        { key: 'class_name', name: 'Class' },
        { key: 'object_id', name: 'ObjectId' },
        { key: 'name', name: 'Name' },
        { key: 'description', name: 'Description' },
        { key: 'created', name: 'Created' },
        { key: 'createdby', name: 'CreatedBy' },
        { key: 'modified', name: 'Modified' },
        { key: 'modifiedby', name: 'ModifiedBy' },
    ];

    let classColumns = [
        { key: 'class_name', name: 'Class' },
        { key: 'class_description', name: 'ObjectId' }
    ];

    return (
        <div class="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName="HOME" formNumber="FORM 005" />
            <ErrorControl {...error} />
            <div className="section">Teams</div>
            <div className="sectionbuttons">
                {props.data.team.allowed_teams.map((field, index) => {
                    return <button key={index} onClick={
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
            <div className="section">{props.data.team.team_name}</div>
            <div className="subsection">Tickets</div>
            {props.data.team.tickets && props.data.team.tickets.length > 0 && <GridControl columns={ticketColumns} rows={props.data.team.tickets} /> }

            <div className="subsection">Articles</div>
            {props.data.team.articles && props.data.team.articles.length > 0 && <GridControl columns={articleColumns} rows={props.data.team.articles} />}

            <div className="subsection">Collections</div>
            {props.data.team.classes && props.data.team.classes.length > 0 && <GridControl columns={classColumns} rows={props.data.team.classes} />}
        </div>
    );
}
