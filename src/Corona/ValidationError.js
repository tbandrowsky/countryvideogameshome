import '../App.css'
import '../index.css'
import './ValidationError.css'
/* eslint-disable react/jsx-no-undef */

export default function ValdidationError(props) {
    console.log("Error props", props);
    return (
        <p className="validation_error" style={{ padding: "0px"}} >
            {props.error_message}
        </p>
    );
}
