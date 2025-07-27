

import './CoronaBar.css';
import React from 'react';
import InputMask from 'react-input-mask';

export default function TextEditField(props)
{
    let placeholder = '';
    let value = '';

    if ('value' in props) {
        value = props.value;
    };

    if ('placeholder' in props) {
        placeholder = props.placeholder;
    }

    if ('enum' in props) {
        let options = props.enum;
        return <Typeahead
            id="basic-typeahead"
            onChange={setSelected}
            options={options}
            placeholder={placeholder} 
            selected={value} />;
    }
    else if ('input_mask' in props) {
        let input_mask = props.input_mask;
        return <InputMask mask={input_mask} placeholder={placeholder} />
    }
    else
    {
        let format = '';
        let max_length = 0;
        let min_length = 0;
        let match_pattern = '';
        let enum_values = [];

        if ('format' in props) {
            format = props.format;
        }
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
                    props.onChange(e.target.value);
                }
            }}
            maxLength={max_length}
            minLength={min_length}
            pattern={match_pattern}/>
    }
}
