
import DateTime from 'react-datetime';
import ValidationError from './ValidationError.js';

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

    let max_value = 1000;
    let min_value = 0;
    let div_style = { margin: '0px', padding: '0px' };
    let has_max_value = false;
    let has_min_value = false;

    if ('max_value' in field_props) {
        max_value = parseFloat(field_props.max_value);
        has_max_value = true;
    }

    if ('min_length' in field_props) {
        min_value = parseFloat(field_props.min_value);
        has_min_value = true;
    }

    value = parseFloat(props.get_value(json_field_name));

    let error_message = '';

    if (has_min_value && value < min_value) {
        error_message = "Must be at least " + min_value;
    }
    else if (has_max_value && value > max_value) {
        error_message = "Cannot be longer than " + max_value;
    }

    return <div style={div_style}><DateTime
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
            if (props.update) {
                let v = e.target.value;
                props.update(json_field_name, v);
            }
        }}
    />
        {error_message && <ValidationError error_message={error_message} server_message={props.server_message} />}
    </div>
}
