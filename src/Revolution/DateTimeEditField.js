
import DateTime from 'react-datetime';
import ValidationError from './ValidationError.js';
import Input from '@mui/material/Input';

export default function DateTimeEditField(props) {
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

    let max_value = new Date(2100, 0, 1);
    let min_value = new Date(1972, 0, 1);
    let div_style = { margin: '0px', padding: '0px' };
    let has_max_value = false;
    let has_min_value = false;

    if ('max_value' in field_props) {
        let temp = new Date(field_props.max_value);
        if (temp.getFullYear() > 1970) {
            max_value = temp;
            has_max_value = true;
        }
    }

    if ('min_value' in field_props) {
        let temp = new Date(field_props.min_value);
        if (temp.getFullYear() > 1970) {
            min_value = temp;
            has_min_value = true;
        }
    }

    value = props.get_value(json_field_name);

    if (value || value > '') {
        let date = new Date(value);
        value = date.toISOString().split('T')[0];
    }

    let client_message = '';
    let server_message = props.get_error(props.field.json_field_name);

    if (has_min_value && value < min_value) {
        client_message = "Must be at least " + min_value;
    }
    else if (has_max_value && value > max_value) {
        client_message = "Cannot be longer than " + max_value;
    }

    return <div style={div_style}>
        <Input type="date"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                console.log({"updated":e.target.value});

                if (props.put_value) {
                    let v = e.target.value;                
                    let date = new Date(v);
                    let iso = date.toISOString();

                    console.log({"iso":iso, "date":date, "v":v});
                    props.put_value(json_field_name, iso);
                }
            }}
    />
        {(client_message || server_message) && <ValidationError client_message={client_message} server_message={server_message} />}
    </div>
}
