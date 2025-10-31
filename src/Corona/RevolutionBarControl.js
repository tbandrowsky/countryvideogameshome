import '../App.css'
import '../index.css'
import './RevolutionBarControl.css';
import { useState, useEffect } from "react";

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

    return (
        <div className="coronabar" style={{ backgroundColor:"black"}} >
            <div className="countrytitle1right" style={{ color:"grey", padding:"0px", margin:"0px"}}>REVOLUTION</div>
            <div className="countrytitle2right" style={{color:"grey", display:"grid",gridTemplateColumns: "1fr 60% 1fr"}}>
                <div>{props.formName}</div>
                { Math.floor(Date.now() / period % phase) === 0 && <div style={{ textAlign: "center", margin:"0px" }}>PUT THE PARTY IN THE PARTY, BABY!</div> }
                { Math.floor(Date.now() / period % phase) === 12 && <div style={{ textAlign: "center", margin:"0px" }}>WHAT COULD POSSIBLY GO WRONG?</div> }
                { Math.floor(Date.now() / period % phase) === 2 && <div style={{ textAlign: "center", margin:"0px" }}>TAKE OVER THE WORLD AND SPLIT IT!</div> }
                { Math.floor(Date.now() / period % phase) === 3 && <div style={{ textAlign: "center", margin:"0px" }}>ANY KIND OF GOVERNMENT</div> }
                { Math.floor(Date.now() / period % phase) === 4 && <div style={{ textAlign: "center", margin:"0px" }}>SO ADVANCED WE ARE THE UFOS</div> }
                { Math.floor(Date.now() / period % phase) === 16 && <div style={{ textAlign: "center", margin:"0px" }}>THAT WASNT TOO MUCH LEAD</div> }
                { Math.floor(Date.now() / period % phase) === 17 && <div style={{ textAlign: "center", margin:"0px" }}>OUR DEATH STAR IS AS LOADED AS US</div> }
                { Math.floor(Date.now() / period % phase) === 5 && <div style={{ textAlign: "center", margin:"0px" }}>TO BREED HUMANS TO PERFECT</div> }
                { Math.floor(Date.now() / period % phase) === 18 && <div style={{ textAlign: "center", margin:"0px" }}>BIG BROTHER DID NOT HAVE A JOB</div> }
                { Math.floor(Date.now() / period % phase) === 6 && <div style={{ textAlign: "center", margin:"0px" }}>TO BREED HUMANS TO EXPAND</div> }
                { Math.floor(Date.now() / period % phase) === 7 && <div style={{ textAlign: "center", margin:"0px" }}>WE LEAVE NO ONE BEHIND</div> }
                { Math.floor(Date.now() / period % phase) === 19 && <div style={{ textAlign: "center", margin:"0px" }}>WHAT WOULD SISKO DO</div> }
                { Math.floor(Date.now() / period % phase) === 8 && <div style={{ textAlign: "center", margin:"0px" }}>WE'RE ACTUALLY GOING TO MAKE THINGS</div> }
                { Math.floor(Date.now() / period % phase) === 9 && <div style={{ textAlign: "center", margin:"0px" }}>THE ARTS ARE THE BACKBONE</div> }
                { Math.floor(Date.now() / period % phase) === 10 && <div style={{ textAlign: "center", margin:"0px" }}>PERFECT OMELETS ALL THE TIME</div> }
                { Math.floor(Date.now() / period % phase) === 11 && <div style={{ textAlign: "center", margin:"0px" }}>A TASK BAR THAT WORKS</div> }
                { Math.floor(Date.now() / period % phase) === 1 && <div style={{ textAlign: "center", margin:"0px" }}>UNITED IN OUR ARMY OF LIGHT</div> }
                { Math.floor(Date.now() / period % phase) === 14 && <div style={{ textAlign: "center", margin:"0px" }}>ITS JUST A VIDEO GAME</div> }
                { Math.floor(Date.now() / period % phase) === 13 && <div style={{ textAlign: "center", margin:"0px" }}>OUR GOD MAKES GREAT QUICHE</div> }
                { Math.floor(Date.now() / period % phase) === 20 && <div style={{ textAlign: "center", margin:"0px" }}>SOMETHING TO DO</div> }
                { Math.floor(Date.now() / period % phase) === 21 && <div style={{ textAlign: "center", margin:"0px" }}>SOON YOU WONT BE BORED</div> }
                { Math.floor(Date.now() / period % phase) === 22 && <div style={{ textAlign: "center", margin:"0px" }}>THE AMERICAN SPIRIT SINCE 1776</div> }
                { Math.floor(Date.now() / period % phase) === 23 && <div style={{ textAlign: "center", margin:"0px" }}>AGE OF REASON, NOT MADNESS</div> }
                { Math.floor(Date.now() / period % phase) === 24 && <div style={{ textAlign: "center", margin:"0px" }}>FOR MY FRIENDS AND CAPTAIN ARAB</div> }
                { Math.floor(Date.now() / period % phase) === 25 && <div style={{ textAlign: "center", margin:"0px" }}>SHARE RECIPES</div> }
                { Math.floor(Date.now() / period % phase) === 26 && <div style={{ textAlign: "center", margin:"0px" }}>HOW TO ARTICLES</div> }
                { Math.floor(Date.now() / period % phase) === 27 && <div style={{ textAlign: "center", margin:"0px" }}>INSTANT GOVERNMENT</div> }
                <div style={{ textAlign: "right" }}>{props.formNumber}</div>
            </div>
        </div>
    );
}
