
import '../App.css'
import '../index.css'
import './CoronaBar.css';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default function TextEditField(props)
{
    let placeholder = '';
    let json_field_name = '';
    let field_props = props.field || {};

    console.log("TextEditField props", field_props);

    if ('json_field_name' in field_props) {
        json_field_name = field_props.json_field_name;
    }

    if ('placeholder' in field_props) {
        placeholder = field_props.placeholder;
    }

    if ('enum' in field_props) {
        console.log("enum in props");
        let options = field_props.enum;
        return <Typeahead
            id="basic-typeahead"
            selected={props.get_value(json_field_name)}
            onChange={(e) => {
                props.put_value(json_field_name, e.target.value);
            }}
            options={options}
            placeholder={placeholder}
        />;
    }
    else if ('input_mask' in field_props) {
        let input_mask = field_props.input_mask;
        return <InputMask
            mask={input_mask}
            placeholder={placeholder}
            value={props.get_value(json_field_name)}
            onChange={(e) => {
                props.put_value(json_field_name, e.target.value);
            }}
        />;
    }
    else
    {
        let max_length = 100;
        let min_length = 0;
        let match_pattern = '';

        if ('max_length' in props) {
            max_length = props.max_length;
        }
        if ('min_length' in props) {
            min_length = props.min_length;
        }
        if ('match_pattern' in props) {
            match_pattern = props.match_pattern;
        }
        return <input
            type="text"
            className="form-control corona-text-edit-field"
            placeholder={placeholder}
            value={props.get_value(json_field_name)}
            onChange={(e) => {
                props.put_value(json_field_name, e.target.value);
            }}
            maxLength={max_length}
            minLength={min_length}
            pattern={match_pattern}/>
    }
}
