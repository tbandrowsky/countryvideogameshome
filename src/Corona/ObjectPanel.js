
import '../App.css'
import '../index.css'
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { coronaGoFoward, coronaEditObject } from './Service.js';
import ObjectCard from './ObjectCard.js';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export default function ObjectPanel(props) {
    
    return ( <div className="sectionbuttons">

                {props.object && <Button variant="contained" color={props.object.class_color} key={props.object.id} onClick={
                    async () => {
                        props.setError({ success: true, message: "Edit " + props.object.class_name, inProgress: true });
                        let response = await coronaEditObject( { ...props.object, "include_children":true }, {
                            successForm: '/Corona/ObjectEdit',
                            redoForm: '/Corona/Home',
                            redoMessage: 'Edit failed.',
                            formProps: props
                        });
                        if (response.success) {
                            coronaGoFoward({ type:"object",name: props.object.class_name, path:'/Corona/ObjectEdit', navigation:response });
                            if (props.onNavigate) {
                                props.onNavigate(response);
                            }
                        } 
                        props.setError({ success: response.success, message: response.message, inProgress: false });
                    }
                } style={{width:"400x", marginBottom:"8px", marginRight:"18px"}}><FontAwesomeIcon icon={faFile} style={{marginRight:"8px"}}/><ObjectCard field={props.object} use_field={props.use_field} classDef={props.classDef} /></Button>}

                {props.objects && props.objects.map((obj, index) => {
                    return <Button variant="contained" color={obj.class_color} key={index} style={{marginLeft:"8px", justifyContent:"flex-start"}}
                        onClick={
                            async () => {
                                props.setError({ success: true, message: "Edit " + obj.class_name, inProgress: true });
                                let response = await coronaEditObject({ data: { ...obj }, "include_children":true }, {
                                    successForm: '/Corona/ObjectEdit',
                                    redoForm: '/Corona/ObjectEdit',
                                    redoMessage: 'Edit failed.',
                                    formProps: props
                                });
                                if (response.success) {
                                    coronaGoFoward({ type:"object", name: obj.class_name, path:'/Corona/ObjectEdit', navigation:response });
                                    if (props.onNavigate) {
                                        props.onNavigate(response);
                                    }
                                } 
                               props.setError({ success: response.success, message: response.message, inProgress: false });
                            }
                        } 
                        >
                        <ObjectCard use_field={props.use_field} obj={obj} classDef={props.classDef} />
                    </Button>
                }
                )}
            </div>
    );
}
