

import './CoronaBar.css';
import React from 'react';
import InputMask from 'react-input-mask';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function tryParseDouble(value, defaultValue) {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
}

export default function DoubleEditField(props) {
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
        let options = props.enum;
        return <Typeahead
            id="basic-typeahead"
            onChange={(e) => {
                if (props.onChange) {
                    let v = tryParseDouble(e.target.value, 0);
                    props.update(json_field_name, v);
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
                let v = tryParseDouble(e.target.value, 0);
                props.update(json_field_name, v);
            }
        }}
        />;
    }
    else {
        let match_pattern = '';

        if ('match_pattern' in props) {
            match_pattern = props.match_pattern;
        }
        return <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                if (props.update) {
                    let v = tryParseDouble(e.target.value, 0);
                    props.update(json_field_name, v);
                }
            }} 
            pattern={match_pattern} />
    }
}
