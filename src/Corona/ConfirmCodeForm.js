
import '../App.css'
import '../index.css'
import { useState } from "react";
import CoronaBarControl from './CoronaBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import { coronaConfirmUserCode } from './Service.js';
import { useNavigate } from "react-router";

export default function ConfirmCodeForm(props) {

    const [request, setRequest] = useState({});
    const [error, setError] = useState({ success: false, message: "", inProgress: false });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    let edit_props = {
        presentation: {
            gridTemplateRows: "100.0px 100.0px",
            gridTemplateColumns: "30% 30% 30%"
        },
        body_fields: [
            { json_field_name: "username", row: "1", column: "1", field_type: "string", format: "name", placeholder: "E-Mail", max_length: 50, min_length: 4 },
            { json_field_name: "validation_code", row: "2", column: "1", field_type: "string", format: "text", placeholder: "Confirm Code", max_length: 50, min_length: 8 }
        ],
        put_value
    };

    let nav = useNavigate();

    return (
        <div class="contentbackgroundform">
            <CoronaBarControl applicationName={props.applicationName} formName="CONFIRM ACCESS" />
            <ErrorControl {...error} />
            <EditForm {...edit_props} error={error} />
            <div className="buttonBar">
                <button id="loginButton" onClick={
                    async () => {
                        setError({ success: true, message: "Confirming code", inProgress: true });
                        let response = await coronaConfirmUserCode(request);
                        setError({ success: response.success, message: response.message, inProgress: false });
                        nav(response.form, response.form_props);
                    }
                }>CONFIRM</button>
                <button id="createUserButton" disabled={error.inProgress} onClick={
                    async () => {
                        nav('/Corona/Login');
                    }
                }>CANCEL</button>
            </div>
        </div>
    );
}
