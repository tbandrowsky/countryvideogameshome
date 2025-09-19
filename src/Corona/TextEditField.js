
import '../App.css'
import '../index.css'
import InputMask from 'react-input-mask';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import ValidationError from './ValidationError';

export default function TextEditField(props)
{
    let placeholder = '';
    let input_type = 'text';
    let json_field_name = '';

    let field_props = props.field || {};    
    let max_length = 52;
    let min_length = 0;
    let match_pattern = '';
    let div_style = { margin: '0px', padding: '0px', paddingLeft: '0px' };
    let autocomplete = true;

    if ('max_length' in field_props) {
        max_length = field_props.max_length;
    }
    if ('min_length' in field_props) {
        min_length = field_props.min_length;
    }
    if ('match_pattern' in field_props) {
        match_pattern = field_props.match_pattern;
    }
    if ('json_field_name' in field_props) {
        json_field_name = field_props.json_field_name;
    }
    if ('placeholder' in field_props) {
        placeholder = field_props.placeholder;
    }
    if ('autocomplete' in field_props) {
        autocomplete = field_props.autocomplete;
    }

    let value = props.get_value(json_field_name);
    let client_message = '';
    let server_message = props.get_error(props.field.json_field_name);

    if (value != null || value !== undefined) {

        if (min_length > 0 && value === '') {
            client_message = "Required";
        }
        else if (min_length > 0 && value.length < min_length) {
            client_message = "Must be at least " + min_length + " characters";
        }
        else if (max_length > 0 && value.length > max_length) {
            client_message = "Cannot be longer than " + max_length + " characters";
        }
        else if (match_pattern && match_pattern.length > 0 && !value.match(match_pattern)) {
            client_message = "Invalid " + placeholder;
        }
    }

    if ('format' in field_props) {
        let format = field_props.format;
        if ((format === 'password') || (format === 'email') || (format === 'tel')) {
            input_type = format;
        }
    }

    if ('enum' in field_props) {
        console.log("enum in props");
        let options = field_props.enum;
        return <div style={div_style}><Typeahead
            id="basic-typeahead"
            selected={props.get_value(json_field_name)}
            onChange={(e) => {
                props.put_value(json_field_name, e.target.value);
            }}
            options={options}
            placeholder={placeholder}
        />
            {(client_message || server_message) && <ValidationError client_message={client_message} server_message={server_message} />}
        </div>;
    }
    else if ('input_mask' in field_props) {
        let input_mask = field_props.input_mask;
        return <div style={div_style}><InputMask
            mask={input_mask}
            placeholder={placeholder}
            value={props.get_value(json_field_name)}
            onChange={(e) => {
                props.put_value(json_field_name, e.target.value);
            }}
            />
            {(client_message || server_message) && <ValidationError client_message={client_message} server_message={server_message} />}
        </div>;
    }
    else
    {
        return <div style={div_style}><input
            type={input_type}
            placeholder={placeholder}
            max_length={max_length}
            min_length={min_length}
            value={props.get_value(json_field_name)}
            onChange={(e) => {
                props.put_value(json_field_name, e.target.value);
            }}
            pattern={match_pattern} autoComplete={autocomplete} />
            {(client_message || server_message) && <ValidationError client_message={client_message} server_message={server_message} />}
        </div>;
    }
}
