import '../App.css'
import '../index.css'
import { useState } from "react";
import RevolutionBarControl from './RevolutionBarControl.js';
import EditForm from './EditForm.js';
import ErrorControl from './ErrorControl.js';
import { coronaSendUserCode } from './Service.js';
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSquareCaretLeft } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';

export default function SendCodeForm(props) {

    const [request, setRequest] = useState({});
    const [error, setError] = useState({ success: false, message: "", inProgress: false });

    const put_value = (json_field_name, value) => {
        setRequest(prev => ({ ...prev, [json_field_name]: value }));
    };

    let edit_props = {
        presentation: {
            gridTemplateRows: "auto 100.0px",
            gridTemplateColumns: "30% 30% 30%"
        },
        body_fields: [
            { field_type: "paragraph", row: "1", column: "1/3", text: "Please enter your E-Mail address to receive a confirmation code." }, 
            { json_field_name: "user_name", row: "2", column: "1/3", field_type: "string", format: "email", placeholder: "E-Mail", max_length: 50, min_length: 4 }
        ],
        put_value
    };

    let nav = useNavigate();

    return (
        <div class="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName="SEND CODE" formNumber="FORM 003"/>
            <ErrorControl {...error} />
            <EditForm {...edit_props} error={error} >
                <div className="buttonBar" style={{gap:"16px"}}>
                    <Button id="loginButton" variant='contained' color="primary" onClick={
                        async () => {
                            setError({ success: true, message: "Sending Code", inProgress: true });
                            let response = await coronaSendUserCode(request);
                            setError({ success: response.success, message: response.message, inProgress: false });
                            let nav_state = {};
                            if (response.success) {
                                nav_state = { ...response };
                            } else {
                                nav_state = { ...props};
                            }
                            nav(response.form, { state: nav_state });

                        }
                    }><FontAwesomeIcon icon={faEnvelope}/>SEND CODE</Button>
                    <Button id="createUserButton" variant='contained' color="secondary" disabled={error.inProgress} onClick={
                        async () => {
                            nav('/Corona/Login');
                        }
                    }><FontAwesomeIcon icon={faSquareCaretLeft} />CANCEL</Button>
                </div>
            </EditForm>
        </div>
    );
}
