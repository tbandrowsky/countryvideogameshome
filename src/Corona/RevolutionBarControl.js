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
import { coronaGetTrail, coronaEditObject } from './Service.js';
import { faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';

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
interval = setInterval(() => setTime((prev) => prev + 1), 1000);
}
return () => clearInterval(interval); // Cleanup on unmount or pause

}, [isRunning]);    

let period = 30000;
let phase = 28;
let breadcrumbs = coronaGetTrail();
console.log(breadcrumbs);
    let nav = useNavigate();

    return (
        <div className="titlearea"  style={{ backgroundColor:"black"}} >
            <div className="countrytitle2right" style={{color:"green", display:"grid",gridTemplateColumns: "50% 1fr"}}>
                <div><b>{AppSettings.GetApplicationName()}</b></div>
                <div style={{textAlign: "right"}}>{props.formName} - {props.formNumber}</div>
            </div>            
            <div className="countrytitle2right" style={{color:"green", display:"flex", flexDirection:"row"}}>
                {breadcrumbs && breadcrumbs.map((breadcrumb, index) => (
                    <div key={index} style={{marginRight: "10px"}}>
                        {breadcrumb.type == "object" &&<Button id="navButton" variant='contained' color="primary" onClick={
                            async () => {
                                    let response = {};

                                    response = await coronaEditObject(breadcrumb.request, {
                                        successForm: '/Corona/Home',
                                        redoForm: '/Corona/Login',
                                        redoMessage: 'Cannot log in.'
                                    });

                                    let nav_state = {};
                                    if (response.success) {
                                        nav(response.form, { state: nav_state });
                                    }
                                }
                            }><FontAwesomeIcon icon={faSquareCaretRight} />{breadcrumb.name}</Button>
                        }

                        {breadcrumb.type == "home" &&<Button id="navButton" variant='contained' color="primary" onClick={
                                async () => {
                                    nav(breadcrumb.path, breadcrumb.navigation);
                                }
                            }><FontAwesomeIcon icon={faSquareCaretRight} />{breadcrumb.name}</Button>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
