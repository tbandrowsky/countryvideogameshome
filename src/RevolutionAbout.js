import './App.css'
import TitleBar from './TitleBar'
import { Link } from "react-router-dom";
// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';
import React, { useEffect, useState } from 'react';

// import styles bundle
import 'swiper/css/bundle';

function Corona() {
    let [mySwiper, setMySwiper] = useState(null);
    useEffect(() => {
        let swiper = new Swiper('.swiper', {
            direction: 'vertical',
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        swiper.direction = 'vertical';
        setMySwiper(swiper);
    }, []);
    return (
        <div className="contentbackground">
            <TitleBar title="REVOLUTION" />
            <div style={{ display: "grid", gridColumnTemplate: "30% 30% 30%", backgroundColor: "darkgreen" }} >
                <Link style={{ paddingLeft: "16px", gridColumn: "1", textAlign: "left" }} to="/Revolution/Login">LOGIN OR ENLIST</Link>
                <a style={{ paddingLeft: "16px", gridColumn: "2", textAlign: "left" }} href="downloads/">Downloads</a>
            </div>
            <div className="contentwrapper">
                <div className="content" >
                    <div className="swiper">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide slide-sized">
                                <h2>A BETTER GOVERNMENT</h2>
                                <p>Don't argue about theoretics.  Get rid of virtue cultures and appeals to heaven.
                                    Advance your cause by hosting a better government out of the box.</p>
                                <ol>
                                    <li>A standard court and a reparations process</li>
                                    <li>A system for government insurances</li>
                                    <li>Better permits</li>
                                    <li>Integrated risk modelling and management</li>
                                </ol>

                            </div>
                            <div className="swiper-slide slide-sized">
                                <h2>THE MEANS TO OBTAIN IT</h2>
                                <p>Revolution provides tools for state of the art political advocacy.</p>
                                <ol>
                                    <li>Colonize rival gerrymandered "safe" districts.</li>
                                    <li>Gather intelligence to support colonies.</li>
                                    <li>Build a policy process from the get go.</li>
                                    <li>Logistical support for time and place coordinated activism.</li>
                                    <li>Track candidates, political action committees, and their donors.</li>
                                    <li>Model policy choices with exact implications shown for individuals.</li>
                                    <li>End to End Encryption.</li>
                                </ol>
                            </div>
                            <div className="swiper-slide slide-sized">
                                <h2>COLONIZE RED AMERICA</h2>
                                <p>Organize strategic migrations to red counties to flip states blue.</p>
                                <ol>
                                    <li>Intelligence to gather information.</li>
                                    <li>Policy for strategic guidance.</li>
                                    <li>Colony for political action.</li>
                                    <li>Demonstration of modern government.</li>
                                    <li>Track candidates, political action committees, and their donors.</li>
                                    <li>End to End Encryption.</li>
                                </ol>

                            </div>
                            <div className="swiper-slide slide-sized">
                                <h2>ADVANCED TECHNOLOGY</h2>
                                <p>
                                    Revolution is built on Corona, a modern C++ based web server and object oriented database service.
                                </p>
                                <ol>
                                    <li>Fast 2MB C++ Service EXE.  Runs on Windows Servers with 100's of cores, or a local Windows 10/11 PC.</li>
                                    <li>Low Cost/Transaction - we will be less expensive to operate than most other stacks.</li>
                                    <li>Superior workflow.</li>
                                    <li>Integrates with enterprise databases such as SQL Server, so that, you can use your own data without moving it.</li>
                                    <li>Create database classes with polymorphic query methods and join across classes no matter their source.</li>
                                    <li>Open Source.</li>
                                    <li>Integrates with SendGrid for email.</li>
                                </ol>
                            </div>
                            <div className="swiper-slide slide-sized">
                                <h2>ROADMAP</h2>
                                <p>
                                    We're building out Revolution to have new capabilities continuously.
                                </p>
                                <ol>
                                    <li>Free geocoding and simple mapping - TIGER/LINE ESRI shapefile support</li>
                                    <li>MCP support, so you can use AI to help you take over</li>
                                    <li>Presentations and charting</li>
                                    <li>Extend ODBC support for MySQL/Oracle</li>
                                    <li>Foreign classes - link APIs to Corona classes</li>
                                    <li>Always improve performance</li>
                                    <li>Linux native port and embedded systems ports</li>
                                    <li>AI model support and training</li>
                                    <li>Native Apps</li>
                                    <li>Torrent style sharing.</li>
                                    <li>Support for Azure blob store.</li>
                                </ol>
                            </div>
                            <div className="swiper-slide slide-sized">
                                <h2>INVEST IN YOUR SURVIVAL</h2>
                                <ol>
                                    <li>Check it out</li>
                                    <li>Donate to our kickstarters</li>
                                    <li>Help with coding and ux</li>
                                    <li>Start your own revolution!</li>
                                </ol>
                            </div>
                        </div>
                        <div className="swiper-pagination"></div>
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </div>



                </div>
            </div>
        </div>
    );
}

export default Corona;
