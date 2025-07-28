

import './CoronaBar.css';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

function tryParseDouble(value, defaultValue) {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
}

export default function ReferenceEditField(props) {
    let placeholder = '';
    let json_field_name = '';
    let value = '';

    return <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
            if (props.onChange) {
                let v = tryParseDouble(e.target.value, 0);
                props.update(json_field_name, v);
            }
        }}
        pattern={match_pattern} />
}

