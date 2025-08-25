import '../App.css'
import '../index.css'
import { useState } from "react";
import CoronaBarControl from './CoronaBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import { coronaSendUserCode } from './Service.js';
import { useNavigate } from "react-router";

export default function SendCodeForm(props) {

    const [request, setRequest] = useState({});
    const [error, setError] = useState({ success: false, message: "", inProgress: false });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    let edit_props = {
        presentation: {
            gridTemplateRows: "auto 100.0px",
            gridTemplateColumns: "30% 30% 30%"
        },
        body_fields: [
            { field_type: "paragraph", row: "1", column: "1/3", text: "Please enter your E-Mail address to receive a confirmation code." }, 
            { json_field_name: "user_name", row: "2", column: "1/3", field_type: "string", format: "name", placeholder: "E-Mail", max_length: 50, min_length: 4 }
        ],
        put_value
    };

    let nav = useNavigate();

    return (
        <div class="contentbackgroundform">
            <CoronaBarControl applicationName={props.applicationName} formName="SEND CODE" />
            <ErrorControl {...error} />
            <EditForm {...edit_props} error={error} />
            <div className="buttonBar">
                <button id="loginButton" onClick={
                    async () => {
                        setError({ success: true, message: "Sending Code", inProgress: true });
                        let response = await coronaSendUserCode(request);
                        setError({ success: response.success, message: response.message, inProgress: false });
                        nav(response.form, response.form_props);
                    }
                }>SEND CODE</button>
                <button id="createUserButton" disabled={error.inProgress} onClick={
                    async () => {
                        nav('/Corona/Login');
                    }
                }>CANCEL</button>
            </div>
        </div>
    );
}
