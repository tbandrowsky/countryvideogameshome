
import './EditField.css';
import TextEditField from "./TextEditField";
import DoubleEditField from "./DoubleEditField";
import IntegerEditField from "./IntegerEditField";
import DateTimeEditField from "./DateTimeEditField";
import ReferenceEditField from "./ReferenceEditField";

export default function EditField(props) {

    return (
        <div className="edit_field_container">
            <h2 className="countrylabelright">{props.field.placeholder}</h2>
            <p>{(props.field.field_type === "string") && <TextEditField {...props} />}</p>
            <p>{(props.field.field_type === "double") && <DoubleEditField {...props} />}</p>
            <p>{(props.field.field_type === "number") && <DoubleEditField {...props} />}</p>
            <p>{(props.field.field_type === "int64") && <IntegerEditField {...props} />}</p>
            <p>{(props.field.field_type === "datetime") && <DateTimeEditField {...props} />}</p>
            <p>{(props.field.field_type === "reference") && <ReferenceEditField {...props} />}</p>
        </div>
    );
}
