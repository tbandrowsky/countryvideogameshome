import '../App.css'
import '../index.css'
import './ValidationError.css'
/* eslint-disable react/jsx-no-undef */

export default function ValdidationError(props) {
    let message = props.server_message || props.client_message || '';
    return (
        <p className="validation_error" style={{ padding: "0px" }} >
            {message}
        </p>
    );
}
