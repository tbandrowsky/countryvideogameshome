/* eslint-disable react/jsx-no-undef */
import './CoronaBar.css';
import EditField from './EditField.js';

export default function EditForm(props) {
    let myprops = { ...props };
    console.log("EditForm props:", myprops);
    return (
        <div className="EditForm">
            {myprops.body_fields.map((field, index) =>
                <EditField key={index} field={field} data={props.data[field.jsonFieldName]} />
            )}
        </div>
    );
}
