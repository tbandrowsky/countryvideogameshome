
import './CoronaBar.css';

export default function EditField(props) {
    return (
        <div class="edit_field_container">
            <label class="edit_field_label"></label>
            {(props.field_type === "string") && <TextEditField/>}
            {(props.field_type === "double") && <DoubleEditField />}
            {(props.field_type === "number") && <DoubleEditField />}
            {(props.field_type === "int64") && <IntegerEditField />}
            {(props.field_type === "datetime") && <DateTimeEditField/>}
            {(props.field_type === "reference") && <ReferenceEditField />}
        </div>
    );
}
