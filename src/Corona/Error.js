import '../App.css'
import '../index.css'
import './Error.css'
/* eslint-disable react/jsx-no-undef */
import { useState } from 'react';

export default function Error(props) {
    console.log("Error props", props);
    return (
        <h3 className={props.success ? "statusOk" : "statusError"} style={{ paddingLeft:"0px", margin: "16px", width:"500px" }} >
            {props.message && <p style={{ padding: "0px", borderBottom: props.success ? "dashed 1px darkgreen" : "dashed 1px red" }}>{props.message}</p>}
        </h3>
    );
}
