/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react';
import './CoronaBar.css';
import './EditForm.css';
import EditForm from './EditForm.js';
import 'react-tabs/style/react-tabs.css';
import { coronaLoginUser } from './Service.js';
import { AppSettings } from '../AppSettings.js'; 

export default function Login(props) {

    let edit_props = { 
        fields: [
            { json_field_name: "username", field_type: "text", placeholder: "Username", max_length: 50, min_length: 3 }, 
            { json_field_name: "password", field_type: "text", placeholder: "Password", max_length: 50, min_length: 3 }
        ]
    };

    let new_props = {
        ...props,
        getData: async function () {
            let result = {};
            for (const field of edit_props.fields) {
                result[field.json_field_name] = field.value;
            }
            return result;
        },
        onLogin: async function () {
            let request = this.getData();
            let result = await coronaLoginUser(request);
        },
        onCreateUser : async function () {

        }
    };

    edit_props.push(props.edit_props);
    return (
        <div class="login_form">
            <h2 class="countrytitle1">{props.applicationName}</h2>
            <h3 class="countrytitle1">Login</h3>
            <EditForm {...edit_props} />
            <div>
                <button id="loginButton" onClick={() => new_props.onLogin()}>Login</button>"
                <button id="createUserButton" onClick={() => new_props.onCreateUser()}>Login</button>"
            </div>
        </div>
    );
}
