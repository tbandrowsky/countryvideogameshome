
import './EditField.css';
import TextEditField from "./TextEditField";
import DoubleEditField from "./DoubleEditField";
import IntegerEditField from "./IntegerEditField";
import DateTimeEditField from "./DateTimeEditField";
import ReferenceEditField from "./ReferenceEditField";

export default function EditField(props) {

    return (
        <div className="edit_field_container" style={{ gridRow: props.field.row, gridColumn: props.field.column}}>
            <h2 className="countrylabelright">{props.field.placeholder}</h2>
            <div>{(props.field.field_type === "string") && <TextEditField {...props} />}</div>
            <div>{(props.field.field_type === "double") && <DoubleEditField {...props} />}</div>
            <div>{(props.field.field_type === "number") && <DoubleEditField {...props} />}</div>
            <div>{(props.field.field_type === "int64") && <IntegerEditField {...props} />}</div>
            <div>{(props.field.field_type === "datetime") && <DateTimeEditField {...props} />}</div>
            <div>{(props.field.field_type === "reference") && <ReferenceEditField {...props} />}</div>
        </div>
    );
}
