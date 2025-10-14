
import '../App.css'
import '../index.css'
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { coronaEditObject } from './Service.js';
import NameOfObject from './NameOfObject.js';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';


export default function ObjectPanel(props) {

    let nav = useNavigate();
    let gridRows = [];
    if (props.rows && props.rows && Array.isArray(props.rows)) {
        gridRows = props.rows;
    }

    return ( <div className="sectionbuttons">
                {props.objects && props.objects.map((field, index) => {
                    console.log("field", {"object in panel":field});
                    return <Button variant="contained" color={field.class_color} key={index} onClick={
                        async () => {
                            props.setError({ success: true, message: "Edit " + field.class_name, inProgress: true });
                            let response = await coronaEditObject(field, {
                                successForm: '/Revolution/ObjectEdit',
                                redoForm: '/Revolution/Home',
                                redoMessage: 'select failed.',
                                formProps: props
                            });
                            let nav_state = {};
                            if (response.success) {
                                nav_state = { user:props.user, ...response };
                            } else {
                                nav_state = { ...props };
                            }
                            props.setError({ success: response.success, message: response.message, inProgress: false });
                            console.log({"edit object nav_state":nav_state});
                            nav(response.form, { state: nav_state });
                        }
                    } style={{width:"250px", marginBottom:"8px", marginRight:"18px"}}><FontAwesomeIcon icon={faFile} style={{marginRight:"8px"}}/>{NameOfObject(field, props.use_field)}</Button>
                }
                )}
            </div>
    );
}
