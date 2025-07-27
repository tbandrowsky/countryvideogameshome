

import './CoronaBar.css';
import React from 'react';
import InputMask from 'react-input-mask';

export default function TextEditField(props)
{

    if ('enum' in props) {

    }
    else if ('input_mask' in props) {
        return <InputMask mask={props.input_mask} placeholder={props.placeholder} />
    }
    else
    {
        let format = '';
        let max_length = 0;
        let min_length = 0;
        let match_pattern = '';
        let enum_values = [];
        let placeholder = '';

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
        if ('placeholder' in props) {
            placeholder = props.placeholder;
        }
    }
}
