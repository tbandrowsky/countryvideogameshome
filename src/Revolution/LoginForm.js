
import '../App.css'
import '../index.css'
import { useState } from "react";
import RevolutionBarControl from './RevolutionBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import { coronaLoginUser } from './Service.js';
import { useNavigate } from "react-router";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faAtom } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faWineBottle } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';

export default function LoginForm(props) {

    const [request, setRequest] = useState({});
    const [error, setError] = useState({ success: false, message: "", inProgress: false, field_errors: {} });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    let edit_props = {
        presentation: {
            gridTemplateRows: "60.0px 100.0px 100.0px 60.0px 60.0px",
            gridTemplateColumns: "30% 30% 30%"
        },
        body_fields: [
           { field_type: "paragraph", row: "1", column: "1/3", text: "Enter your E-Mail address to and password to login." },
            { json_field_name: "user_name", row: "2", column: "1/3", field_type: "string", format: "name", placeholder: "Username", max_length: 50, min_length: 4 },
            { json_field_name: "password", row: "3", column: "1", field_type: "string", format: "password", placeholder: "Password", max_length: 50, min_length: 8 },
            { field_type: "paragraph", row: "4", column: "1/3", text: "If you forgot your password, just use RECOVER." },
            { field_type: "paragraph", row: "5", column: "1/3", text: "If you never logged in before, ENLIST." }
        ],
        put_value
    };

    let nav = useNavigate();

    return (
        <div className="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName="LOGIN" formNumber="FORM 006" />
            <ErrorControl {...error} />
            <EditForm {...edit_props} error={error}>
                <div className="buttonBar" style={{gap:"10px"}}>
                    <Button id="loginButton" variant='contained' color="primary" onClick={
                        async () => {
                            setError({ success: true, message: "Attempting to login", inProgress: true });
                            let response = await coronaLoginUser(request, {
                                successForm: '/Revolution/Home',
                                redoForm: '/Revolution/Login',
                                redoMessage: 'Cannot log in.'
                            });
                            setError({ success: response.success, message: response.message, inProgress: false });
                            console.log({ 'login_form_props': response.form_props });
                            let nav_state = {};
                            if (response.success) {
                                nav_state = { user:response.data,...response };
                            } else {
                                nav_state = {};
                            }
                            nav(response.form, { state: nav_state });
                        }
                    }><FontAwesomeIcon icon={faSquareCaretRight} />LOGIN</Button>
                    <Button variant='contained' color="success" id="createUserButton" onClick={
                        async () => {
                            nav('/Revolution/CreateUser');
                        }
                    }><FontAwesomeIcon icon={faAtom} />ENLIST</Button>
                    <Button variant='contained' color="success" id="recoverUserButton" onClick={
                        async () => {
                            nav('/Revolution/SendCode');
                        }
                    }><FontAwesomeIcon icon={faWineBottle} />RECOVER</Button>
                    <Button variant='contained' color="success" id="confirmUserButton" onClick={
                        async () => {
                            nav('/Revolution/ConfirmCode');
                        }
                    }><FontAwesomeIcon icon={faCheckSquare} />CONFIRM</Button>
                </div>
                </EditForm>
        </div>
    );
}
