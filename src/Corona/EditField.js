
import './CoronaBar.css';

export default function EditField(props) {
    return (
        <div class="edit_field_container">
            <label class="edit_field_label"></label>
            {(props.field_type === "string") && <h1>something</h1>}
            {(props.field_type === "double") && <h1>something</h1>}
            {(props.field_type === "number") && <h1>something</h1>}
            {(props.field_type === "int64") && <h1>something</h1>}
            {(props.field_type === "datetime") && <h1>something</h1>}
            {(props.field_type === "reference") && <h1>something</h1>}
        </div>
    );
}
