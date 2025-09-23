
import '../App.css'
import '../index.css'
import { useState } from "react";
import RevolutionBarControl from './RevolutionBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import { coronaLoginUser } from './Service.js';
import { useNavigate } from "react-router";

export default function LoginForm(props) {

    const [request, setRequest] = useState({});
    const [error, setError] = useState({ success: false, message: "", inProgress: false, field_errors: {} });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    let edit_props = { 
        presentation: {
            gridTemplateRows: "45.0px 100.0px 100.0px 45.0px",
            gridTemplateColumns: "30% 30% 30%"
        },
        body_fields: [
            { field_type: "paragraph", row: "1", column: "1/3", text: "Please enter your E-Mail address to and password to login." }, 
            { json_field_name: "user_name", row:"2", column:"1/3", field_type: "string", format:"name", placeholder: "Username", max_length: 50, min_length: 4 }, 
            { json_field_name: "password", row: "3", column: "1", field_type: "string", format: "password", placeholder: "Password", max_length: 50, min_length: 8 },
            { field_type: "paragraph", row: "4", column: "1/3", text: "If you forgot your password, just use RECOVER." },  
        ],
        put_value
    };

    let nav = useNavigate();

    return (
        <div class="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName="LOGIN" formNumber="FORM 006" />
            <ErrorControl {...error} />
            <EditForm {...edit_props} error={error} />
            <div className="buttonBar">
                <button id="loginButton" onClick={
                    async () => {
                        setError({ success: true, message: "Attempting to login", inProgress:true });
                        let response = await coronaLoginUser(request, {
                            successForm: '/Revolution/Home',
                            redoForm: '/Revolution/Login',
                            redoMessage: 'Cannot log in.'
                        });
                        setError({ success: response.success, message: response.message, inProgress: false });
                        nav(response.form, response.form_props);
                    }
                }>LOGIN</button>                
                <button id="createUserButton" disabled={error.inProgress} onClick={
                    async () => {
                        nav('/Revolution/CreateUser');
                    }
                }>ENLIST</button>
                <button id="recoverUserButton" disabled={error.inProgress} onClick={
                    async () => {
                        nav('/Revolution/SendCode');
                    }
                }>RECOVER</button>
                <button id="confirmUserButton" disabled={error.inProgress} onClick={
                    async () => {
                        nav('/Revolution/ConfirmCode');
                    }
                }>CONFIRM</button>
            </div>
        </div>
    );
}
