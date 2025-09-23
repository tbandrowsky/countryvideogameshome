
import './EditField.css';
import React from "react";
import TextEditField from "./TextEditField";
import DoubleEditField from "./DoubleEditField";
import IntegerEditField from "./IntegerEditField";
import DateTimeEditField from "./DateTimeEditField";
import ReferenceEditField from "./ReferenceEditField";
import GoogleAd from '../GoogleAd';

export default function EditField(props) {
    console.log("EditField props", props);
    return (
        <div className="edit_field_container" style={{ gridRow: props.field.row, gridColumn: props.field.column }}>
            {(props.field.field_type === "title") &&
                <React.Fragment>
                    <h2 className="coronatitle">{props.field.text}</h2>
                </React.Fragment>}
            {(props.field.field_type === "subtitle") &&
                <React.Fragment>
                    <h3 className="coronasubtitle">{props.field.text}</h3>
                </React.Fragment>}
            {(props.field.field_type === "chaptertitle") &&
                <React.Fragment>
                    <h4 className="coronachaptertitle">{props.field.text}</h4>
                </React.Fragment>}
            {(props.field.field_type === "chaptersubtitle") &&
                <React.Fragment>
                    <p className="coronachaptersubtitle">{props.field.text}</p>
                </React.Fragment>}
            {(props.field.field_type === "paragraph") &&
                <React.Fragment>
                    <p className="coronaparagraph">{props.field.text}</p>
                </React.Fragment>}
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
