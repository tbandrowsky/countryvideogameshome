/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react';
import './CoronaBar.css';
import './EditForm.css';
import EditForm from './EditForm.js';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function ObjectEdit(props) {

    let body_fields = [];
    let tab_fields = [];

    for (const field of props.fields) {
        if (field.field_type === 'array' || field.field_type === 'object') {
            tab_fields.push(field);
        } else {
            body_fields.push(field);
        }
    }

    let new_props = { ...props, body_fields: body_fields, tab_fields: tab_fields, class_name: "countryeditcontainer" };

    return (
        <div class="EditForm">
            <div class="countrytitle1">{props.applicationName}</div>
            <div class="countrytitle1">{props.formName}</div>
            <EditForm {...new_props} />
            {(tab_fields.length > 0) && <Tabs>
                <TabList>
                    {tab_fields.map((field, index) => <Tab key={index}>{field.jsonFieldName}</Tab>)}
                </TabList>

                {tab_fields.map((field, index) =>
                    <TabPanel key={index}>
                        {field.field_type === "object" && <EditForm key={index} />}
                        {field.field_type === "array" && <SearchForm key={index} />}
                    </TabPanel>)
                }

            </Tabs>}
        </div>
    );
}
