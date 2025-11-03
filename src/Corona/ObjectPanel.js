
import '../App.css'
import '../index.css'
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { coronaEditObject } from './Service.js';
import ObjectCard from './ObjectCard.js';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';


export default function ObjectPanel(props) {

    let nav = useNavigate();

    console.log({"ObjectPanel props":props});
    
    return ( <div className="sectionbuttons">

                {props.object && <Button variant="contained" color={props.object.class_color} key={props.object.id} onClick={
                    async () => {
                        props.setError({ success: true, message: "Edit " + props.object.class_name, inProgress: true });
                        let response = await coronaEditObject( { ...props.object, "include_children":true }, {
                            successForm: '/Corona/ObjectEdit',
                            redoForm: '/Corona/Home',
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
                } style={{width:"250px", marginBottom:"8px", marginRight:"18px"}}><FontAwesomeIcon icon={faFile} style={{marginRight:"8px"}}/><ObjectCard field={props.object} use_field={props.use_field} classDef={props.classDef} /></Button>}

                {props.objects && props.objects.map((obj, index) => {
                    return <Button variant="contained" color={obj.class_color} key={index} 
                        onClick={
                            async () => {
                                props.setError({ success: true, message: "Edit " + obj.class_name, inProgress: true });
                                let response = await coronaEditObject({ ...obj, "include_children":true }, {
                                    successForm: '/Corona/ObjectEdit',
                                    redoForm: '/Corona/Home',
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
                        } 
                        style={{width:"250px", marginBottom:"8px", marginRight:"18px"}}>
                            <FontAwesomeIcon icon={faFile} style={{marginRight:"8px"}}/>
                            <ObjectCard use_field={props.use_field} obj={obj} classDef={props.classDef} />
                    </Button>
                }
                )}
            </div>
    );
}
