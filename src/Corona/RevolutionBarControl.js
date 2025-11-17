import '../App.css'
import '../index.css'
import './RevolutionBarControl.css';
import  { AppSettings } from './AppSettings';
import  BreadCrumb from '../BreadCrumb';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faAdd, faSquareCaretLeft, faPlay } from '@fortawesome/free-solid-svg-icons';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { coronaGetTrail, coronaEditObject, coronaSetCurrent, coronaUpdateCurrent } from './Service.js';
import { faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import GotoCrumb from './GotoCrumb.js';

export default function RevolutionBarControl(props) {

const [time, setTime] = useState(0); // Timer value in seconds
const [isRunning, setIsRunning] = useState(true); // Timer running state

// Start or pause the timer
const toggleTimer = () => setIsRunning(!isRunning);

// Reset the timer
const resetTimer = () => {
setIsRunning(false);
setTime(0);
};

// Update the timer every second when running
useEffect(() => {
let interval;
if (isRunning) {
interval = setInterval(() => setTime((prev) => prev + 1), 10000);
}
return () => clearInterval(interval); // Cleanup on unmount or pause

}, [isRunning]);    

let period = 30000;
let phase = 28;
let breadcrumbs = coronaGetTrail();
for (let i = 0; i < breadcrumbs.length; i++) {
    let breadcrumb = breadcrumbs[i];
    if (breadcrumb.navigation) {
        let classdef = breadcrumb.navigation.data.classes[breadcrumb.name];
        let card_title = classdef.card_title ?? classdef.class_name;
        breadcrumb.display_text = breadcrumb.navigation.data.object[card_title];
    }
}
console.log(breadcrumbs);
    let nav = useNavigate();

    return (
        <div className="titlearea"  style={{ backgroundColor:"black"}} >
            <div className="countrytitle2right" style={{color:"green", display:"grid",gridTemplateColumns: "50% 1fr", height:"40px", overflow:"clip"}}>
                <div><b>{AppSettings.GetApplicationName()}</b></div>
                <div style={{textAlign: "right", textWrap: "nowrap"}}>{props.formName} - {props.formNumber}</div>
            </div>            
            <div className="countrytitle2right" style={{color:"green", display:"flex", flexDirection:"row", overflow:"hidden", height:"50px", width:"100%"}}>
                {breadcrumbs && breadcrumbs.map((breadcrumb, index) => (
                    <span key={index} style={{marginRight: "10px"}}>
                        {(index > 0) && <FontAwesomeIcon icon={faEllipsisVertical} />}
                        {breadcrumb.type == "object" &&<Button id="navButton" variant='contained' color="primary" onClick={
                            async () => {
                                await GotoCrumb(nav, breadcrumb, props.onNavigate);
                            }
                        }><FontAwesomeIcon icon={faSquareCaretRight} />{breadcrumb.display_text}</Button>
                        }

                        {breadcrumb.type == "home" &&<Button id="navButton" variant='contained' color="primary" onClick={
                                async () => {
                                    await GotoCrumb(nav, breadcrumb, props.onNavigate);
                                }
                            }><FontAwesomeIcon icon={faSquareCaretRight} />{breadcrumb.name}</Button>
                        }


                        {breadcrumb.type == "search" &&<Button id="navButton" variant='contained' color="primary" onClick={
                                async () => {
                                    await GotoCrumb(nav, breadcrumb, props.onNavigate);
                            }
                            }><FontAwesomeIcon icon={faSquareCaretRight} />{breadcrumb.name}</Button>
                        }

                        {breadcrumb.type == "login" &&<Button id="navButton" variant='contained' color="primary" onClick={
                                async () => {
                                    await GotoCrumb(nav, breadcrumb, props.onNavigate);
                                }
                            }><FontAwesomeIcon icon={faSquareCaretRight} />{breadcrumb.name}</Button>
                        }

                    </span>
                ))}
            </div>
        </div>
    );
}
