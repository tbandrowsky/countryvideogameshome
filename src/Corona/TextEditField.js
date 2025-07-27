

import './CoronaBar.css';
import React from 'react';
import InputMask from 'react-input-mask';

export default function TextEditField(props)
{

    if ('input_mask' in props)
    {
        return <InputMask mask={props.input_mask} placeholder={props.placeholder} />
    }

    let format = '';
    if ('format' in props) {

    }
    if ('max_length' in props) {

    }
    if ('min_length' in props) {

    }
    
    if ('input_mask' in props || 'placeholder' in props)
    {
        return <InputMask mask={props.input_mask} placeholder={props.placeholder} />
    }

    else if ()
    {
        return <input type="text" maxLength={maxLength}></input>
    }
    else if ()
    {
        return <input type="text" maxLength={maxLength}></input>
    }

}
