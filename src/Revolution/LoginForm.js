
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
            { json_field_name: "user_name", row: "2", column: "1/3", field_type: "string", format: "name", placeholder: "Username", max_length: 50, min_length: 4 },
            { json_field_name: "password", row: "3", column: "1", field_type: "string", format: "password", placeholder: "Password", max_length: 50, min_length: 8 },
            { field_type: "paragraph", row: "4", column: "1/3", text: "If you forgot your password, just use RECOVER." }
        ],
        put_value
    };

    let nav = useNavigate();

    return (
        <div className="contentbackgroundform">
            <RevolutionBarControl applicationName={props.applicationName} formName="LOGIN" formNumber="FORM 006" />
            <ErrorControl {...error} />
            <EditForm {...edit_props} error={error} />
            <div className="buttonBar">
                <button id="loginButton" onClick={
                    async () => {
                        setError({ success: true, message: "Attempting to login", inProgress: true });
                        let response = await coronaLoginUser(request, {
                            successForm: '/Revolution/Home',
                            redoForm: '/Revolution/Login',
                            redoMessage: 'Cannot log in.'
                        });
                        setError({ success: response.success, message: response.message, inProgress: false });
                        console.log({ 'login_form_props': response.form_props });
                        nav(response.form, { state: response.form_props });
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
            <br/>
            <div style={{ marginLeft: "16px", border: "2px dotted orange", padding: "16px", width: "90%" }}>
                <h2 style={{ fontFamily:"Georgia,Times,Times New Roman" }}>Our Manifesto of Donation Doom and Righteous Goals</h2>
                <p>We will end tyranny once and for all, by creating a new kind of government, and get it, with a new kind of revolution.  We can make any organization we unite to make, instantly, and succeed in any endeavor.</p>
                <p>We can martial our minds and resources to any place instantly with plans and organization to see success.</p>
                <p>We will put an end to violence first with a government that is actually peaceful.</p>
                <p>We will free our experts from any political suppression, so they can free us all as well with the best information obtainable.</p>
                <p>We will create a court that is just, open, and accessible, and we will allow for cases of reparations.  Justice may be done for the sins of the obsolete.</p>
                <p>We will have a sound currency, in a country where everyone is a citizen that was either born here or pays taxes.  If you're helping to pay for the pleasure of our government, you are a citizen of it.</p>
                <p>The clouds and shadows loom across our land, turning every forest leaf and living lake to ruin with the never ending rain of their filthy hell-ash blasphemy.  They will never cease forging of chains to enslave their fellow man with.  Chaining and enslaving is what they are, and eventually, nothing else.
                    You can tell it when they preach of understanding, to understand pogrom after pogrom, to understand that to threaten extermination of someone is peaceful discussion.</p>
<p>Who do these people think they are! if they are people at all.  In their mind, sooner or later,
                    everyone will be a criminal, as they measure human progress only by the happiness of how many people are walking in irons, or worse, swimming with them.</p>
                <i>They will never stop hunting you.</i>
                <p>But we can have a go at hunting them, if you would support us, today.</p>
                <div style={{ height: "100px",width:"200px" }}>
                    <form action="https://www.paypal.com/donate" method="post" target="_top">
                        <input type="hidden" name="business" value="TWXJ467KP823E" />
                        <input type="hidden" name="no_recurring" value="0" />
                        <input type="hidden" name="item_name" value="Not so much a revolution and a government, but a tool to make them that comes with great samples." />
                        <input type="hidden" name="currency_code" value="USD" />
                        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                        <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                    </form>
                </div>
            </div>
        </div>
    );
}
