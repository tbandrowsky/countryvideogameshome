/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react';
import './CoronaBar.css';
import './EditForm.css';
import EditForm from './EditForm.js';
import 'react-tabs/style/react-tabs.css';

export default function Login(props) {

    let edit_props = { 
        fields: [
            { json_field_name: "username", field_type: "text", placeholder: "Username", max_length: 50, min_length: 3 }, 
            { json_field_name: "password", field_type: "text", placeholder: "Password", max_length: 50, min_length: 3 }
        ]
    };

    edit_props.push(props.edit_props);
    return (
        <div class="EditForm">
            <h2 class="countrytitle1">{props.applicationName}</h2>
            <h3 class="countrytitle1">{props.formName}</h3>
            <EditForm {...edit_props} />
            <div>
                <button id="loginButton" onClick={() => props.onLogin()}>Login</button>"
                <button id="createUserButton" onClick={() => props.onLogin()}>Login</button>"
            </div>
        </div>
    );
}
