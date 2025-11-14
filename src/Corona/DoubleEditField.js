

import React from 'react';
import InputMask from 'react-input-mask';
import ValidationError from './ValidationError';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Input from '@mui/material/Input';

function tryParseDouble(value, defaultValue) {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
}

export default function DoubleEditField(props) {
    let placeholder = '';
    let json_field_name = '';
    let value = '';
    let field_props = props.field || {};    

    if ('json_field_name' in field_props) {
        json_field_name = field_props.json_field_name;
    }

    if ('value' in field_props) {
        value = field_props.value;
    }

    if ('placeholder' in field_props) {
        placeholder = field_props.placeholder;
    }

    let max_value = 1000;
    let min_value = 0;
    let div_style = { margin: '0px', padding: '0px' };
    let has_max_value = false;
    let has_min_value = false;
    let server_message = props.get_error(props.field.json_field_name);

    if ('max_value' in field_props) {
        max_value = parseFloat(field_props.max_value);
        has_max_value = true;
    }

    if ('min_length' in field_props) {
        min_value = parseFloat(field_props.min_value);
        has_min_value = true;
    }

    value = parseFloat(props.get_value(json_field_name));

    let client_message = '';

    if (has_min_value && value < min_value) {
        client_message = "Must be at least " + min_value;
    }
    else if (has_max_value && value > max_value) {
        client_message = "Cannot be longer than " + max_value;
    }

    if ('enum' in props) {
        let options = props.enum;
        return <div style={div_style}><Typeahead tabIndex={props.tab_index} 
            id="basic-typeahead"
            onChange={(e) => {
                if (props.put_value) {
                    let v = tryParseDouble(e.target.value, 0);
                    props.put_value(json_field_name, v);
                }
            }}
            options={options}
            placeholder={placeholder}
            selected={value} />
            {client_message && <ValidationError client_message={client_message} server_message={server_message} />}
            </div>;
    }
    else if ('input_mask' in props) {
        let input_mask = props.input_mask;
        return <div style={div_style}><InputMask  tabIndex={props.tab_index} mask={input_mask} placeholder={placeholder} onChange={(e) => {
            if (props.put_value) {
                let v = tryParseDouble(e.target.value, 0);
                props.put_value(json_field_name, v);
            }
        }}
        />
            {client_message && <ValidationError client_message={client_message} server_message={server_message} />}
        </div>;
    }
    else {
        let match_pattern = '';

        if ('match_pattern' in props) {
            match_pattern = props.match_pattern;
        }
        return <div style={div_style}><Input tabIndex={props.tab_index} 
            type="text"
            placeholder={placeholder}
            value={props.get_value(json_field_name).toString()}
            onChange={(e) => {
                if (props.put_value) {
                    let v = tryParseDouble(e.target.value, 0);
                    props.put_value(json_field_name, v);
                }
            }}
            pattern={match_pattern} />
            {client_message && <ValidationError client_message={client_message} server_message={server_message} />}
        </div>;
    }
}
