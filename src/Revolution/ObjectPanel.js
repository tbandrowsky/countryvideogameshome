
import '../App.css'
import '../index.css'
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCopy, faEdit } from '@fortawesome/free-solid-svg-icons';
import { coronaEditObject } from './Service.js';
import NameOfObject from './NameOfObject.js';

export default function ObjectPanel(props) {

    let nav = useNavigate();
    let gridRows = [];
    if (props.rows && props.rows && Array.isArray(props.rows)) {
        gridRows = props.rows;
    }

    return (
        <div className="objectpanel">
                    <button title={JSON.stringify(props.object)} onClick={
                        async () => {
                            props.setError({ success: true, message: "Edit " + props.class_name, inProgress: true });
                            let response = await coronaEditObject(props.object, {
                                successForm: '/Revolution/ObjectEdit',
                                redoForm: '/Revolution/Home',
                                redoMessage: 'select failed.',
                                formProps: props
                            });
                            let nav_state = {};
                            if (response.success) {
                                nav_state = { user: props.user, ...response };
                            } else {
                                nav_state = { ...props };
                            }
                            props.setError({ success: response.success, message: response.message, inProgress: false });
                            console.log({ "edit object nav_state": nav_state });
                            nav(response.form, { state: nav_state });
                        }
                    }>
                        <FontAwesomeIcon icon={faEdit}/>
                        {NameOfObject(props.object)}
                    </button>
        </div>
    );
}
