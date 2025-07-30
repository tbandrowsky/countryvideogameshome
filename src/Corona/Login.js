
import '../App.css'
import '../index.css'
import CoronaBar from './CoronaBar.js';
import EditForm from './EditForm.js';
import { coronaLoginUser } from './Service.js';
import { useNavigate } from "react-router";

export default function Login(props) {

    let edit_props = { 
        body_fields: [
            { json_field_name: "username", field_type: "string", placeholder: "Username", max_length: 50, min_length: 3 }, 
            { json_field_name: "password", field_type: "string", placeholder: "Password", max_length: 50, min_length: 3 }
        ],
        data: {},
        update: function (json_field_name, value) {
            if (edit_props.field.json_field_name === json_field_name) {
                edit_props.data[json_field_name] = value;
            }
        },
    };

    let nav = useNavigate();

    return (
        <div class="contentbackground">
            <CoronaBar props={{ applicationName: props.applicationName, formName:"Login" }} />
            <h2 class="countrytitle1">{props.applicationName}</h2>
            <h3 class="countrytitle1">Login</h3>
            <EditForm {...edit_props} />
            <div>
                <button id="loginButton" onClick={
                    async () => {
                        let request = this.edit_props.data;
                        let response = coronaLoginUser(request);
                        nav(response.form, response.form_props);
                    }
                }>Login</button>
                <button id="createUserButton" onClick={
                    async () => {
                        nav('./CreateAccount');
                    }
                }>Register</button>
            </div>
        </div>
    );
}
