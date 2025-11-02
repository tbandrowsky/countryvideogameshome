
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

    console.log({ 'ObjectsList props': props });

    return (
        <Paper elevation={3} style={{ margin:"16px", paddingLeft:"16px", paddingBottom:"16px", overflow:"auto",  ...props.style}}>
                <div style={{ display: 'flex', flexDirection: 'row', width:'90%', flexWrap: 'wrap', gap: '16px', marginTop:'16px', marginRight:"16px" }}>
                    {props.childrenMap && Object.keys(props.childrenMap).map((className,idx) => (
                        <React.Fragment key={idx}>
                            <div className="coronachaptersubtitle" style={{marginTop:"16px", width:"90%"}}>{className}</div>
                            {props.childrenMap[className] &&
                                <ObjectPanel classDef={props.classes[className]} key={idx} objects={props.childrenMap[className]} class_name={className} user={props.user} setError={props.setError} style={{width:"250px"}} />
                            }
                        </React.Fragment>
                    ))}
                </div>
        </Paper>
    );
}
