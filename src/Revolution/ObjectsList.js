
import '../App.css'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { coronaEditObject } from './Service.js';
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import NameOfObject from './NameOfObject.js';
import ObjectPanel from './ObjectPanel.js';

export default function ObjectsList(props) {
    let nav = useNavigate();
    let childrenMap = {};
    if (props.objects && Array.isArray(props.objects)) {
        props.objects.forEach( (obj) => {
            if (obj.class_name) {
                if (!(obj.class_name in childrenMap)) childrenMap[obj.class_name] = [];
                childrenMap[obj.class_name].push(obj);
            }
        });
    }

    return (
        <div className="objectlist" >
            {Object.keys(childrenMap).map(className => (
                <div key={className}>
                    <h4>{className}</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
                    {childrenMap[className].map((obj, idx) => (
                            <ObjectPanel key={idx} object={obj} class_name={className} user={props.user} setError={props.setError} />
                    ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
