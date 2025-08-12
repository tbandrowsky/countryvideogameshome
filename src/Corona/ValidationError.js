import '../App.css'
import '../index.css'
import './ValidationError.css'
/* eslint-disable react/jsx-no-undef */

export default function ValdidationError(props) {
    return (
        <p className="validation_error" style={{ padding: "0px" }} >
            <b>{props.server_message}</b>
            {props.error_message}
        </p>
    );
}
