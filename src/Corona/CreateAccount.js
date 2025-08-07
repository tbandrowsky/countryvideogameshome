
import '../App.css'
import '../index.css'
import { useState } from "react";
import CoronaBar from './CoronaBar.js';
import EditForm from './EditForm.js';
import Error from './Error.js';
import { coronaLoginUser } from './Service.js';
import { useNavigate } from "react-router";

export default function CreateAccount(props) {

    const [request, setRequest] = useState({});
    const [error, setError] = useState({ success: false, message: "", inProgress: false });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    let edit_props = {
        body_fields: [
            { json_field_name: "username", field_type: "string", format: "name", placeholder: "Username", max_length: 30, min_length: 4 },
            { json_field_name: "email", field_type: "string", format: "email", placeholder: "E-Mail", max_length: 100, min_length: 10 },
            { json_field_name: "phone", field_type: "string", format: "tel", placeholder: "Phone", max_length: 20  },
            { json_field_name: "password1", field_type: "string", format: "password", placeholder: "Password 1", max_length: 50, min_length: 8 },
            { json_field_name: "password2", field_type: "string", format: "password", placeholder: "Password 2", max_length: 50, min_length: 8 },
            { json_field_name: "street", field_type: "string", format: "text", placeholder: "Street", max_length: 50, min_length: 8 },
            { json_field_name: "city", field_type: "string", format: "text", placeholder: "City", max_length: 50, min_length: 8 },
            { json_field_name: "state", field_type: "string", format: "text", placeholder: "State", max_length: 20, min_length: 2 },
            { json_field_name: "zip", field_type: "string", format: "text", placeholder: "Zip", max_length: 10, min_length: 5 }
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
                        setError({ success: true, message: "Attempting to login", inProgress: true });
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
