
import '../App.css'
import '../index.css'
import { useState } from "react";
import RevolutionBarControl from './RevolutionBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import { coronaSendUserCode, coronaConfirmUserCode } from './Service.js';
import { useNavigate } from "react-router";

export default function ConfirmCodeForm(props) {

    const [request, setRequest] = useState({});
    const [error, setError] = useState({ success: false, message: "", inProgress: false });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    let edit_props = {
        presentation: {
            gridTemplateRows: "auto 100.0px 100.0px",
            gridTemplateColumns: "30% 30% 30%"
        },
        body_fields: [
            { field_type: "paragraph", row: "1", column: "1/3", text: "Enter your confirmation code and the email address you requested it with." }, 
            { json_field_name: "validation_code", row: "2", column: "1", field_type: "string", format: "text", placeholder: "Confirmation Code", max_length: 50, min_length: 8 },
            { json_field_name: "user_name", row: "3", column: "1/3", field_type: "string", format: "email", placeholder: "E-Mail", max_length: 50, min_length: 4 }
        ],
        put_value
    };

    let nav = useNavigate();

    return (
        <div class="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName="CONFIRM ACCESS" formNumber="FORM 002"/>
            <ErrorControl {...error} />
            <EditForm {...edit_props} error={error} />
            <div className="buttonBar">
                <button id="confirmCodeButton" onClick={
                    async () => {
                        setError({ success: true, message: "Confirming code", inProgress: true });
                        let response = await coronaConfirmUserCode(request);
                        setError({ success: response.success, message: response.message, inProgress: false });
                        nav(response.form, response.form_props);
                    }
                }>CONFIRM CODE</button>
                <button id="sendCodeButton" onClick={
                    async () => {
                        setError({ success: true, message: "Send code", inProgress: true });
                        let response = await coronaSendUserCode(request);
                        setError({ success: response.success, message: response.message, inProgress: false });
                        nav(response.form, response.form_props);
                    }
                }>SEND CODE</button>
                <button id="createUserButton" disabled={error.inProgress} onClick={
                    async () => {
                        nav('/Revolution/Login');
                    }
                }>CANCEL</button>
            </div>
        </div>
    );
}
