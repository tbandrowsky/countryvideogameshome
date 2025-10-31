
import '../App.css'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { coronaEditObject, coronaGetClass } from './Service.js';
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import ObjectCard from './ObjectCard.js';
import ObjectPanel from './ObjectPanel.js';
import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from 'react';

export default function ObjectsList(props) {

    const [objects, setObjects] = useState(props.objects || []);
    const [classes, setClasses] = useState(props.classes || {});
    const [childrenMap, setChildrenMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let nav = useNavigate();

    console.log({ 'ObjectsList': props, 'childrenMap': childrenMap });

    return (
        <Paper elevation={3} style={{ margin:"16px", paddingLeft:"16px", paddingBottom:"16px", overflow:"auto",  ...props.style}}>
                <div style={{ display: 'flex', flexDirection: 'row', width:'90%', flexWrap: 'wrap', gap: '16px', marginTop:'16px', marginRight:"16px" }}>
                    {Object.keys(childrenMap).map((className,idx) => (
                        <React.Fragment key={idx}>
                            <div className="coronachaptersubtitle" style={{marginTop:"16px", width:"90%"}}>{className}</div>
                            {childrenMap[className].map((obj, idx) => (
                                <ObjectPanel classDef={classes[className]} key={idx} object={obj} class_name={className} user={props.user} setError={props.setError} style={{width:"250px"}} />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
        </Paper>
    );
}
