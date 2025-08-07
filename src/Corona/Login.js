
import '../App.css'
import '../index.css'
import { useState } from "react";
import CoronaBar from './CoronaBar.js';
import EditForm from './EditForm.js';
import Error from './Error.js';
import { coronaLoginUser } from './Service.js';
import { useNavigate } from "react-router";

export default function Login(props) {

    const [request, setRequest] = useState({});
    const [error, setError] = useState({ success:false, message:"", inProgress:false });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    let edit_props = { 
        body_fields: [
            { json_field_name: "username", field_type: "string", format:"name", placeholder: "Username", max_length: 50, min_length: 4 }, 
            { json_field_name: "password", field_type: "string", format: "password", placeholder: "Password", max_length: 50, min_length: 8 }
        ],
        put_value
    };

    let nav = useNavigate();

    return (
        <div class="contentbackground">
            <CoronaBar applicationName={props.applicationName} formName="LOGIN" />
            <Error {...error} />
            <EditForm {...edit_props} />
            <h2 className="countrylabelright">ACT</h2>
            <div className="buttonBar">
                <button id="loginButton" onClick={
                    async () => {
                        setError({ success: true, message: "Attempting to login", inProgress:true });
                        let response = await coronaLoginUser(request);
                        setError({ success: response.success, message: response.message, inProgress: false });
                        nav(response.form, response.form_props);
                    }
                }>LOGIN</button>                
                <button id="createUserButton" disabled={error.inProgress} onClick={
                    async () => {
                        nav('/Corona/CreateAccount');
                    }
                }>ENLIST</button>
            </div>
        </div>
    );
}
