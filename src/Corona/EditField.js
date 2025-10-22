
import './EditField.css';
import React from "react";
import TextEditField from "./TextEditField";
import DoubleEditField from "./DoubleEditField";
import IntegerEditField from "./IntegerEditField";
import DateTimeEditField from "./DateTimeEditField";
import ReferenceEditField from "./ReferenceEditField";
import GoogleAd from '../GoogleAd';

export default function EditField(props) {

    let style = { gridRow: props.field.row, gridColumn: props.field.column };

    if (props.field.field_type === "title") { return (
        <React.Fragment>
            <h2 className="coronatitle" style={style}>{props.field.text}</h2>
        </React.Fragment>)}

    else if (props.field.field_type === "subtitle") { return (
        <React.Fragment>
            <h3 className="coronasubtitle" style={style}>{props.field.text}</h3>
        </React.Fragment>)}

    else if (props.field.field_type === "chaptertitle") { return (
        <React.Fragment>
            <h4 className="coronachaptertitle" style={style}>{props.field.text}</h4>
        </React.Fragment>)}

    else if (props.field.field_type === "chaptersubtitle") { return (
        <React.Fragment>
            <p className="coronachaptersubtitle" style={style}>{props.field.text}</p>
        </React.Fragment>)}

    else if (props.field.field_type === "paragraph") { return (
        <React.Fragment>
            <p className="coronaparagraph" style={style}>{props.field.text}</p>
        </React.Fragment>)}
    else return (
        <div className="edit_field_container" style={style} >
            {(props.field.field_type === "string") &&
                <React.Fragment>
                    <h2 className="countrylabelright">{props.field.placeholder}</h2>
                    <TextEditField {...props} />
                </React.Fragment>}
            {(props.field.field_type === "double") &&
                <React.Fragment>
                    <h2 className="countrylabelright">{props.field.placeholder}</h2>
                    <DoubleEditField {...props} />
                </React.Fragment>}
            {(props.field.field_type === "number") &&
                <React.Fragment>
                    <h2 className="countrylabelright">{props.field.placeholder}</h2>
                    <DoubleEditField {...props} />
                </React.Fragment>}
            {(props.field.field_type === "int64") &&
                <React.Fragment>
                    <h2 className="countrylabelright">{props.field.placeholder}</h2>
                    <IntegerEditField {...props} />
                </React.Fragment>}
            {(props.field.field_type === "datetime") &&
                <React.Fragment>
                    <h2 className="countrylabelright">{props.field.placeholder}</h2>
                    <DateTimeEditField {...props} />
                </React.Fragment>}
            {(props.field.field_type === "reference") &&
                <React.Fragment>
                    <h2 className="countrylabelright">{props.field.placeholder}</h2>
                    <ReferenceEditField {...props} />
                </React.Fragment>}
            {(props.field.field_type === "advertisement") && 
                <React.Fragment>
                    <GoogleAd slot="6300978111" googleAdId="ca-pub-3940256099942544" style={{ display: 'block', width: '250px', height: '300px' }} />
                </React.Fragment>}
        </div>
    );
}
