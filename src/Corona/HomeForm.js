
import '../App.css'
import '../index.css'
import { useState } from "react";
import CoronaBarControl from './CoronaBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import { coronaLoginUser } from './Service.js';
import { useNavigate } from "react-router";

export default function HomeForm(props) {

    const [request, setRequest] = useState({});
    const [error, setError] = useState({ success: false, message: "", inProgress: false, field_errors: {} });

    let nav = useNavigate();

    return (
        <div class="contentbackgroundform">
            <CoronaBarControl applicationName={props.applicationName} formName="HOME" formNumber="FORM 005" />
            <ErrorControl {...error} />
            <div className="buttonBar">
                buttons go here
            </div>
        </div>
    );
}
