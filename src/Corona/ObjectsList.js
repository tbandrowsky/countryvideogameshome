
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

    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', marginTop:'16px', marginRight:"16px", width:"90%", height:"90%", overflow:"scroll", alignContent:"flex-start"  }}>
            {props.childrenMap && Object.keys(props.childrenMap).map((className,idx) => (
                <React.Fragment key={idx}>
                    <div className="coronachaptersubtitle" style={{marginLeft:"16px", marginTop:"16px", width:"90%"}}>{className}</div>
                    {props.childrenMap[className] &&
                        <ObjectPanel onNavigate={props.onNavigate} classDef={props.classes[className]} objects={props.childrenMap[className]} class_name={className} user={props.user} setError={props.setError} style={{width:"400px"}} />
                    }
                </React.Fragment>
            ))}
        </div>
    );
}
