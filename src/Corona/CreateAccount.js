
import '../App.css'
import '../index.css'
import { useState } from "react";
import CoronaBar from './CoronaBar.js';
import EditForm from './EditForm.js';
import Error from './Error.js';
import { coronaCreateUser } from './Service.js';
import { useNavigate } from "react-router";

export default function CreateAccount(props) {

    const [request, setRequest] = useState({});
    const [error, setError] = useState({ success: false, message: "", inProgress: false });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    let edit_props = {
        presentation: {
            gridTemplateColumns: "repeat( 4 fr )",
            gridTemplateRows: "40px 90px 40px 90px 90px 40px 90px 100px"
        },
        body_fields: [
            { column: '1/4', row: 1, field_type: "chaptertitle", text: "Account" },
            { json_field_name: "username", column:1, row:2,  field_type: "string", format: "name", placeholder: "Username", max_length: 30, min_length: 4 },
            { json_field_name: "password1", column: 2, row: 2, field_type: "string", format: "password", placeholder: "Password 1", max_length: 50, min_length: 8 },
            { json_field_name: "password2", column: 3, row: 2, field_type: "string", format: "password", placeholder: "Password 2", max_length: 50, min_length: 8 },
            { column: '1/4', row: 3, field_type: "chaptertitle", text: "Contact" },
            { json_field_name: "first_name", column: 1, row: 4, field_type: "string", format: "name", placeholder: "First Name", max_length: 100, min_length: 1 },
            { json_field_name: "last_name", column: 2, row: 4, field_type: "string", format: "name", placeholder: "Last Name", max_length: 100, min_length: 1 },
            { json_field_name: "email", column: 1, row: 5, field_type: "string", format: "email", placeholder: "E-Mail", max_length: 100, min_length: 10 },
            { json_field_name: "phone", column: 2, row: 5, field_type: "string", format: "tel", placeholder: "Phone", max_length: 20  },
            { column: '1/4', row: 6, field_type: "chaptertitle", text: "Address" },
            { json_field_name: "street", column: '1/4', row: 7, field_type: "string", format: "text", placeholder: "Street", max_length: 50, min_length: 8 },
            { json_field_name: "city", column: 1, row: 8, field_type: "string", format: "text", placeholder: "City", max_length: 50, min_length: 8 },
            { json_field_name: "state", column: 2, row: 8, field_type: "string", format: "text", placeholder: "State", max_length: 20, min_length: 2 },
            { json_field_name: "zip", column: 3, row: 8, field_type: "string", format: "text", placeholder: "Zip", max_length: 10, min_length: 5 }
        ],
        put_value
    };

    let nav = useNavigate();

    return (
        <div class="contentbackgroundform">
            <CoronaBar applicationName={props.applicationName} formName="ENLISTMENT APPLICATION" formNumber="(FORM 1A)" />
            <Error {...error} />
            <EditForm {...edit_props} />
            <div className="buttonBar">
                <button id="createUserButton" onClick={
                    async () => {
                        setError({ success: true, message: "Creating Your Account.", inProgress: true });
                        let response = await coronaCreateUser(request);
                        setError({ success: response.success, message: response.message, inProgress: false });
                        nav(response.form, response.form_props);
                    }
                }>SUBMIT</button>
                <button id="cancelButton" disabled={error.inProgress} onClick={
                    async () => {
                        nav('/Corona/Login');
                    }
                }>CANCEL</button>
            </div>
        </div>
    );
}
