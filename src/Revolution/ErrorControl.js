import '../App.css'
import '../index.css'
import './ErrorControl.css'
/* eslint-disable react/jsx-no-undef */

export default function ErrorControl(props) {
    return (
        <h3 className={props.success ? "statusCommon statusOk" : "statusCommon statusError"} style={{ paddingLeft: "0px", marginLeft: "16px", marginTop: "8px", marginBottom: "0px", marginRight:"16px" }} >
            {props.message && <p style={{ margin:"0px", padding: "0px", border: props.success ? "dashed 1px darkgreen" : "dashed 1px red" }}>{props.message}</p>}
        </h3>
    );
}
