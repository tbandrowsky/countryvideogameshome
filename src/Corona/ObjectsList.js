
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
import Paper from '@mui/material/Paper';
import React from "react";

export default function ObjectsList(props) {
    let nav = useNavigate();
    let childrenMap = {};
    if (props.objects && Array.isArray(props.objects)) {
        props.objects.forEach( (obj) => {
            if (obj.class_name) {
                if (!(obj.class_name in childrenMap)) 
                    childrenMap[obj.class_name] = [];
                childrenMap[obj.class_name].push(obj);
            }
        });
    }

    console.log({ 'ObjectsList': props, 'childrenMap': childrenMap });

    return (
        <Paper elevation={3} style={{ margin:"16px", paddingLeft:"16px", paddingBottom:"16px", overflow:"auto",  ...props.style}}>
            <div className="coronachaptersubtitle" style={{marginTop:"16px", width:"100%"}}>Results</div>
                <div style={{ display: 'flex', flexDirection: 'row', width:'100%', flexWrap: 'wrap', gap: '16px', marginTop:'16px' }}>
                    {Object.keys(childrenMap).map((className,idx) => (
                        <React.Fragment key={idx}>
                            <div className="chaptersubtitle">{className}</div>
                            {childrenMap[className].map((obj, idx) => (
                                <ObjectPanel key={idx} object={obj} class_name={className} user={props.user} setError={props.setError} style={{width:"250px"}} />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
        </Paper>
    );
}
