

import './CoronaBar.css';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default function TextEditField(props)
{
    let placeholder = '';
    let json_field_name = '';
    let value = '';

    if ('json_field_name' in props) {
        json_field_name = props.json_field_name;
    }

    if ('value' in props) {
        value = props.value;
    }

    if ('placeholder' in props) {
        placeholder = props.placeholder;
    }

    if ('enum' in props) {
        console.log("enum in props");
        let options = props.enum;
        return <Typeahead
            id="basic-typeahead"
            onChange={(e) => {
                if (props.onChange) {
                    props.update(json_field_name, e.target.value);
                }
            }}
            options={options}
            placeholder={placeholder} 
            selected={value} />;
    }
    else if ('input_mask' in props) {
        let input_mask = props.input_mask;
        return <InputMask mask={input_mask} placeholder={placeholder} onChange={(e) => {
            if (props.onChange) {
                let v = e.target.value || '';
                props.update(json_field_name, v);
            }
        }}
        />
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
            value={value}
            onChange={(e) => {
                if (props.onChange) {
                    props.update(json_field_name, e.target.value);
                }
            }}
            maxLength={max_length}
            minLength={min_length}
            pattern={match_pattern}/>
    }
}
