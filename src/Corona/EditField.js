
import './CoronaBar.css';
import TextEditField from "./TextEditField";
import DoubleEditField from "./DoubleEditField";
import IntegerEditField from "./IntegerEditField";
import DateTimeEditField from "./DateTimeEditField";
import ReferenceEditField from "./ReferenceEditField";

export default function EditField(props) {
    return (
        <div class="edit_field_container">
            <label class="edit_field_label"></label>
            {(props.field.field_type === "string") && <TextEditField {...props} />}
            {(props.field.field_type === "double") && <DoubleEditField {...props} />}
            {(props.field.field_type === "number") && <DoubleEditField {...props} />}
            {(props.field.field_type === "int64") && <IntegerEditField {...props} />}
            {(props.field.field_type === "datetime") && <DateTimeEditField {...props} />}
            {(props.field.field_type === "reference") && <ReferenceEditField {...props} />}
        </div>
    );
}
