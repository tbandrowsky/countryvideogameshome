
import '../App.css'
import '../index.css'
import { useState } from "react";
import CoronaBar from './CoronaBar.js';
import EditForm from './EditForm.js';
import { coronaLoginUser } from './Service.js';
import { useNavigate } from "react-router";

export default function Login(props) {

    const [request, setRequest] = useState({});

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    let edit_props = { 
        body_fields: [
            { json_field_name: "username", field_type: "string", placeholder: "Username", max_length: 50, min_length: 3 }, 
            { json_field_name: "password", field_type: "string", placeholder: "Password", max_length: 50, min_length: 3 }
        ],
        put_value
    };

    let nav = useNavigate();

    return (
        <div class="contentbackground">
            <CoronaBar applicationName={props.applicationName} formName="LOGIN" />
            <EditForm {...edit_props} />
            <div className="buttonBar">
                <button id="loginButton" onClick={
                    async () => {
                        console.log("Login request", request);
                        let response = await coronaLoginUser(request);
                        nav(response.form, response.form_props);
                    }
                }>Login</button>
                <button id="createUserButton" onClick={
                    async () => {
                        nav('./Corona/CreateAccount');
                    }
                }>Register</button>
            </div>
        </div>
    );
}
