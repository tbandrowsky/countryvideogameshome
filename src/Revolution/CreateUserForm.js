
import '../App.css'
import '../index.css'
import { useState } from "react";
import RevolutionBarControl from './RevolutionBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import { coronaCreateUser } from './Service.js';
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom } from '@fortawesome/free-solid-svg-icons';
import { faSquareCaretLeft } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';

export default function CreateUserForm(props) {

    const [request, setRequest] = useState({ });
    const [error, setError] = useState({ success: false, message: "", inProgress: false, errors:[] });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    const get_value = (json_field_name) => {
        if (json_field_name in request)
            return request[json_field_name];
        else
            return "";
    }

    let edit_props = {
        presentation: {
            gridTemplateColumns: "250px 250px 250px 250px",
            gridTemplateRows: "auto auto auto auto auto auto"
        },
        body_fields: [
            { json_field_name: "user_name", column: '1/4', row: 1, field_type: "string", format: "email", placeholder: "E-Mail", max_length: 100, min_length: 4, autocomplete: 'email' },
            { json_field_name: "password1", column: 1, row: 2, field_type: "string", format: "password", placeholder: "Password 1", max_length: 50, min_length: 8, autocomplete: 'new-password' },
            { json_field_name: "password2", column: 2, row: 2, field_type: "string", format: "password", placeholder: "Password 2", max_length: 50, min_length: 8, autocomplete: 'new-password' },
            { json_field_name: "first_name", column: 1, row: 3, field_type: "string", format: "name", placeholder: "First Name", max_length: 100, min_length: 1, autocomplete: 'given_name' },
            { json_field_name: "last_name", column: 2, row: 3, field_type: "string", format: "name", placeholder: "Last Name", max_length: 100, min_length: 1, autocomplete: 'family_name' },
            { json_field_name: "phone", column: 3, row: 3, field_type: "string", format: "tel", placeholder: "Phone", max_length: 20, autocomplete: 'true'  },
            { json_field_name: "street", column: '1/4', row: 4, field_type: "string", format: "text", placeholder: "Street", max_length: 50, min_length: 8, autocomplete: 'address-line1' },
            { json_field_name: "city", column: 1, row: 5, field_type: "string", format: "text", placeholder: "City", max_length: 50, min_length: 8, autocomplete: 'address-level2' },
            { json_field_name: "state", column: 2, row: 5, field_type: "string", format: "text", placeholder: "State", max_length: 20, min_length: 2, autocomplete: 'address-level1' },
            { json_field_name: "zip", column: 3, row: 5, field_type: "string", format: "text", placeholder: "Zip", max_length: 10, min_length: 5, autocomplete: 'postal-code' }
    ],
        put_value,
        get_value
    };

    let nav = useNavigate();

    return (
        <div class="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName="ENLIST" formNumber="FORM 004" />
            <ErrorControl {...error} />
            <EditForm {...edit_props} error={error} >
                <div className="buttonBar" style={{gap:"16px"}}>
                    <Button id="createUserButton" variant='contained' color="primary" onClick={
                        async () => {
                            setError({ success: true, message: "Processing Application.", inProgress: true });
                            let response = await coronaCreateUser({ data: request }, {
                                successForm: '/Revolution/ConfirmCode',
                                redoForm: '/Revolution/CreateUser',
                                redoMessage: 'Unable to process application.'
                            });
                            setError({ success: response.success, message: response.message, inProgress: false, errors:response.errors });
                            let nav_state = {};
                            if (response.success) {
                                nav_state = { user:response.data,...response };
                            } else {
                                nav_state = { ...props};
                            }

                            nav(response.form, { state: nav_state });
                        }
                    }><FontAwesomeIcon icon={faAtom} />ENLIST</Button>
                    <Button id="cancelButton" variant='contained' color="secondary" disabled={error.inProgress} onClick={
                        async () => {
                            nav('/Revolution/Login');
                        }
                    }><FontAwesomeIcon icon={faSquareCaretLeft} />CANCEL</Button>

                </div>
            </EditForm>
        </div>
    );
}
