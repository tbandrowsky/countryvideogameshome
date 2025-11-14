import '../App.css'
import '../index.css'
import './ErrorControl.css'
/* eslint-disable react/jsx-no-undef */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function ErrorControl(props) {
    return (
        <h3 className={props.success ? "statusCommon statusOk" : "statusCommon statusError"} style={{ display:props.message ? "block" : "none", paddingLeft: "0px", marginLeft: "16px", marginTop: "8px", marginBottom: "0px", marginRight:"16px", borderBottom: props.success ? "dashed 1px darkgreen" : "dashed 1px red" }} >
            {props.message && (props.success ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTrashCan} />)}
            {props.message && <span style={{ margin:"0px", padding: "0px" }}>{props.message}</span>}
            {props.count !== undefined && <span className="statusTimer">{props.count} rows</span>}
            {props.seconds && <span className="statusTimer">{Math.floor(props.seconds * 1000)} ms</span>}
        </h3>
    );
}
