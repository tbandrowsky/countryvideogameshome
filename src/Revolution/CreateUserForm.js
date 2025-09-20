
import '../App.css'
import '../index.css'
import { useState } from "react";
import CoronaBarControl from './RevolutionBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import { coronaCreateUser } from './Service.js';
import { useNavigate } from "react-router";

export default function CreateUserForm(props) {

    const [request, setRequest] = useState({ });
    const [error, setError] = useState({ success: false, message: "", inProgress: false, errors:[] });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    let edit_props = {
        presentation: {
            gridTemplateColumns: "repeat( 4 fr )",
            gridTemplateRows: "auto auto auto auto auto auto"
        },
        body_fields: [
            { column: '1/4', row: 1, field_type: "chaptertitle", text: "Account" },
            { json_field_name: "user_name", column: '1/4', row: 2, field_type: "string", format: "email", placeholder: "E-Mail", max_length: 100, min_length: 4 },
            { json_field_name: "password1", column: 1, row: 3, field_type: "string", format: "password", placeholder: "Password 1", max_length: 50, min_length: 8, autocomplete:false },
            { json_field_name: "password2", column: 2, row: 3, field_type: "string", format: "password", placeholder: "Password 2", max_length: 50, min_length: 8, autocomplete: false },
            { json_field_name: "first_name", column: 1, row: 4, field_type: "string", format: "name", placeholder: "First Name", max_length: 100, min_length: 1 },
            { json_field_name: "last_name", column: 2, row: 4, field_type: "string", format: "name", placeholder: "Last Name", max_length: 100, min_length: 1 },
            { json_field_name: "phone", column: 3, row: 4, field_type: "string", format: "tel", placeholder: "Phone", max_length: 20  },
            { column: '1/4', row: 5, field_type: "chaptertitle", text: "Address" },
            { json_field_name: "street", column: '1/4', row: 6, field_type: "string", format: "text", placeholder: "Street", max_length: 50, min_length: 8 },
            { json_field_name: "city", column: 1, row: 7, field_type: "string", format: "text", placeholder: "City", max_length: 50, min_length: 8 },
            { json_field_name: "state", column: 2, row: 7, field_type: "string", format: "text", placeholder: "State", max_length: 20, min_length: 2 },
            { json_field_name: "zip", column: 3, row: 7, field_type: "string", format: "text", placeholder: "Zip", max_length: 10, min_length: 5 }
        ],
        put_value
    };

    let nav = useNavigate();

    return (
        <div class="contentbackgroundform">
            <CoronaBarControl applicationName={props.applicationName} formName="ENLIST" formNumber="FORM 004" />
            <ErrorControl {...error} />
            <EditForm {...edit_props} error={error} />
            <div className="buttonBar">
                <button id="createUserButton" onClick={
                    async () => {
                        setError({ success: true, message: "Processing Application.", inProgress: true });
                        let response = await coronaCreateUser({ data: request }, {
                            successForm: '/Revolution/ConfirmCode',
                            redoForm: '/Revolution/CreateUser',
                            redoMessage: 'Unable to process application.'
                        });
                        setError({ success: response.success, message: response.message, inProgress: false, errors:response.errors });
                        nav(response.form, response.form_props);
                    }
                }>ENLIST</button>
                <button id="cancelButton" disabled={error.inProgress} onClick={
                    async () => {
                        nav('/Revolution/Login');
                    }
                }>CANCEL</button>
            </div>
        </div>
    );
}
