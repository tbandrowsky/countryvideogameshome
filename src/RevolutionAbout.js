import './App.css'
import TitleBar from './TitleBar'
import { Link } from "react-router-dom";

function Corona() {
    return (
        <div class="contentbackground">
            <TitleBar title="REVOLUTION" />
            <div style={{ display: "grid", gridColumnTemplate: "30% 30% 30%", backgroundColor: "darkgreen" }} >
                <Link style={{ paddingLeft: "16px", gridColumn: "1", textAlign: "left" }} to="/Revolution/Login">LOGIN OR ENLIST</Link>
                <a style={{ paddingLeft: "16px", gridColumn: "2", textAlign: "left" }} href="downloads/revolution.zip">Download (9/16/2025)</a>
                <a style={{ paddingLeft: "16px", gridColumn: "3", textAlign: "left" }} href="revolution_quickstart.pdf">Getting Started</a>
            </div>
            <div className="contentwrapper">
                <div className="content" >
                    <h2>A BETTER GOVERNMENT</h2>
                    <p>Don't argue about theoretics.  Get rid of virtue cultures and appeals to heaven.
                        Advance your cause by hosting a better government out of the box.</p>
                    <ol>
                        <li>Actual Transparent Democracy</li>
                        <li>Accountable Currency, with Audit</li>
                        <li>Provisional courts and a reparations process</li>
                        <li>Integrated risk modelling and management</li>
                        <li>Jobs, education with suitability for a job achievements</li>
                        <li>Better permitting</li>
                    </ol>

                    <h2>THE MEANS TO OBTAIN IT</h2>
                    <p>Revolution provides tools for state of the art political advocacy.</p>
                    <ol>
                        <li>A better home page for voters and members.</li>
                        <li>Colonize rival gerrymandered "safe" districts.</li>
                        <li>Replace brutal NAZI right and left wing pogroms with wise and crafted solutions.</li>
                        <li>Logistical support for time and place coordinated activism.</li>
                        <li>Track candidates, political action committees, and their donors.</li>
                        <li>Model policy choices with exact implications shown for individuals.</li>
                        <li>End to End Encryption.</li>
                    </ol>

                    <h2>INVESTMENT FRIENDLY</h2>
                    <p>Use capitalism wisely.</p>
                    <ol>
                        <li>People all work.  Everyone does something useful to get paid.</li>
                        <li>Superior technology stack and outlook makes every other platform obsolete.</li>
                        <li>Political activity aligned with fiscal interests</li>
                        <li>Stable currency, inflation free.</li>
                        <li>Practical government, not lunacy.</li>
                        <li>Global reach.</li>
                    </ol>

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

                    <h2>INVEST IN YOUR SURVIVAL</h2>
                    <ol>
                        <li>Check it out</li>
                        <li>Donate to our kickstarters</li>
                        <li>Help with coding and ux</li>
                        <li>Start your own revolution!</li>
                    </ol>
                    <div style={{ borderBottom: "1px solid black", height:"16px" }}> </div>
                </div>
            </div>
        </div>
    );
}

export default Corona;
