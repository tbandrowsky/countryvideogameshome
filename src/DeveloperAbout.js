import './App.css'
import TitleBar from './TitleBar'
import React from 'react';
import { useNavigate } from "react-router";

import Paper from '@mui/material/Paper';
import colonize1 from './images/revolutionart/colonize1.png';
import intelligence1 from './images/revolutionart/intelligence1.png';
import policy1 from './images/revolutionart/policy1.png';
import colony1 from './images/revolutionart/colony1.png';
import govern1 from './images/revolutionart/govern1.png';
import survive1 from './images/revolutionart/survive1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
// import styles bundle
import 'swiper/css/bundle';
import Card from './Card';


function DeveloperAbout() {
    let corona_examples = [

        {
            title: "Revolution",
            description: "An experiment in society and technology.",
            image: colonize1,
            schema: "revolution_schema.json",
            service_url:"https://mightyware.com:443/revolution"
        },
        {
            title: "Recipe",
            description: "A recipe service.",
            image: intelligence1,
            schema: "recipe_schema.json",
            service_url:"https://mightyware.com:443/recipe"
        },
        {
            title: "Azure",
            description: "Azure simulation.",
            image: colonize1,
            schema: "azure_schema.json",
            service_url:"https://mightyware.com:443/azure_simple"
        }
    ];

    let nav = useNavigate();

    return (
        <div className="contentbackgroundform" style={{  }}>
            <TitleBar title="CORONA" style={{ backgroundColor: "var(--forest3)", color: "var(--rock1)" }} />
            <Paper elevation={3} style={{ height:"60%", width:"80%", margin:"32px", padding:"16px", boxSizing:"border-box", backgroundColor:"#F0F0F0", overflow:"auto" }} >

                <h2>CORONA ABOUT</h2>
                <p>Corona is a Fast API platform. Give it a schema, and it manages a database and an API to it</p>
                <p>Corona schemas are AI friendly and can be generated via AI.</p>

                <h2>CORONA WHERE</h2>
                <ul>
                    <li>Repository - <a href="https://github.com/tbandrowsky/corona/tree/master">https://github.com/tbandrowsky/corona/tree/master</a></li>
                    <li>Download- <a href="https://countryvideogames.com/static/downloads/corona_releases.zip">https://countryvideogames.com/static/downloads/corona_releases.zip</a></li>
                </ul>

                <h2>CORONA SAMPLES</h2>
                {corona_examples.map((example, index) => (
                     <Button id="confirmUserButton" variant='contained' color="primary" style={{ width:"350px", height:"80px", flexDirection:"column", marginRight:"16px", marginBottom:"16px" }} onClick={
                            async () => {
                                sessionStorage.setItem("CoronaUrl", example.service_url);
                                sessionStorage.setItem("CoronaApplicationName", example.title);
                                nav('/Corona/Login');
                            }
                        }>
                        <div className="coronachaptersubtitle" style={{display:"block", color:"white", borderBottom:"1px solid white"}}>
                         {example.title}                        
                         </div>
                         <div style={{display:"block", textTransform:"none"}}>
                         {example.description}
                         </div>
                        </Button>
                ))}
            </Paper>
            </div>
    );
}

export default DeveloperAbout;
