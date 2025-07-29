/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react';
import './CoronaBar.css';
import './EditForm.css';
import EditForm from './EditForm.js';
import 'react-tabs/style/react-tabs.css';
import { coronaLoginUser } from './Service.js';
import { AppSettings } from '../AppSettings.js'; 
import { useNavigate } from "react-router";

export default function Login(props) {

    let edit_props = { 
        fields: [
            { json_field_name: "username", field_type: "text", placeholder: "Username", max_length: 50, min_length: 3 }, 
            { json_field_name: "password", field_type: "text", placeholder: "Password", max_length: 50, min_length: 3 }
        ],
        data: {},
        update: function (json_field_name, value) {
            if (field.json_field_name === json_field_name) {
                data[json_field_name] = value;
                break;
            }
        },
    };

    let nav = useNavigate();

    return (
        <div class="login_form">
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
