import '../App.css'
import '../index.css'
import './Error.css'
/* eslint-disable react/jsx-no-undef */

export default function Error(props) {
    console.log("Error props", props);
    return (
        <h3 className={props.success ? "statusCommon statusOk" : "statusCommon statusError"} style={{ paddingLeft: "0px", marginLeft: "16px", marginTop: "8px", marginBottom: "0px", width:"500px" }} >
            {props.message && <p style={{ margin:"0px", padding: "0px", borderBottom: props.success ? "dashed 1px darkgreen" : "dashed 1px red" }}>{props.message}</p>}
        </h3>
    );
}
