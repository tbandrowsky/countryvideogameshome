import './App.css'
import TitleBar from './TitleBar'
import { Link } from "react-router-dom";

function Corona() {
    return (
        <div class="contentbackground">
            <TitleBar title="CORONA" />
            <div style={{ display: "grid", gridColumnTemplate: "185px 185px 185px 185px", width: "800px" }} >
                <Link style={{ paddingRight: "16px", width: "175px", gridColumn: "1" }} to="/Corona/Login">Sample </Link>
                <a style={{ paddingRight: "16px", width: "175px", gridColumn: "2" }} href="coronaserver20220806.zip">Corona (8/7/2025)</a>
                <a style={{ paddingRight: "16px", width: "175px", gridColumn: "3" }} href="corona_quickstart.pdf">Installation(7/23/2025)</a>
                <a style={{ paddingRight: "16px", width: "175px", gridColumn: "4" }} href="corona_manual.pdf">Manual(7/23/2025)</a>
            </div>
            <div className="content">
                <h2>Be fast to market</h2>
                <p>Corona lets you create complex workflow instantly.  You supply a configuration file representating your schema and Corona will create and run both the database and the services for it.
                    Corona handles all the boiler plate for object access, transparent SQL Server integration, and user account management.  Edit a schema file and have the service reflect and data be correct as you edit it.</p>
                <h2>Create organizations from sets of teams</h2>
                <p>No more need to wrestle with complicated workflows and endless security nightmares.  Corona correctly implements
                    teams.  Create teams with your own enterprise's people, people from other domains, and any mix that you prefer.
                </p>
                <h2>Open Source</h2>
                <p>
                    Corona is an open source and available for free either from this download page or from our repo.
                </p>
                <h2>Object Oriented Database Service</h2>
                <p>Corona is a database engine and a web server rolled together.  It has all the crud methods for objects,
                    so you have instant CRUD. It has a full login and sign up scenario with MFA.  Right now we use email but we can use cell phones.
                </p>
                <h2>Get Started</h2>
                <p>Download zip, extract to folder, and either run from the terminal or invoke the batch. There's a word document that is a manual,
                    and we'll have examples to get you started as we go.  Included are the revolution and insurance schemas presently
                    being discussed on linked in.</p>
                <div style={{ display:"grid", gridColumnTemplate: "185px 185px 185px 185px", width:"800px" }} >
                    <Link style={{ paddingRight: "16px", width:"175px", gridColumn:"1" }} to="/Corona/Login">Sample </Link>
                    <a style={{ paddingRight: "16px", width: "175px", gridColumn: "2" }} href="coronaserver20220806.zip">Corona (8/7/2025)</a>
                    <a style={{ paddingRight: "16px", width: "175px", gridColumn: "3" }} href="corona_quickstart.pdf">Installation(7/23/2025)</a>
                    <a style={{ paddingRight: "16px", width: "175px", gridColumn: "4" }} href="corona_manual.pdf">Manual(7/23/2025)</a>
                </div>
                <h2>
                    User Account and Login Build In
                </h2>
                <p>
                    Don't get bogged down in sign up logic and verification.
                    Corona supercharges your multi-user application development by providing a complete user sign on and password management experience.
                    Corona can create teams of users, and associate domains to teams, to create true first class globally collaborative applications.
                </p>
                <h2>
                    Express Performance
                </h2>
                <p>
                    Fast and Powerful, Corona can handle thousands of puts per second, and, reads
                    are far faster.  Using Windows IO completion ports for both disk and network i/o, Corona is
                    designed to be competitive in performance to node.js on Windows.
                </p>
                <h2>
                    Polymorphic Oriented Programming REST
                </h2>
                <p>
                    "POOR" Corona can manage polymorphic collections so well that you can create applications
                    whose users can grow themselves organically.
                </p>
                <h2>
                    Rich Query Power Up
                </h2>
                <p>
                    Join, filter, and project any collection from any source to any other collection.
                </p>
                <h2>
                    Easy set up
                </h2>
                <p>
                    Edit a simple configuration file to build your entire api and databases.
                </p>
                <h2>
                    Enterprise Designed
                </h2>
                <p>
                    Perfect for large or small businesses, Corona can be used to build line of business applications from enterprise data sources safely with pro-features like automatic use of environment variables for sensitive passwords,
                    separate config files that let you say where your database will be stored and what ports it will use.
                </p>
                <h2>
                    Performance
                </h2>
                <p>
                    Written in modern C++, Corona leverages the latest in scalable performance technologies for both network and disk to deliver an
                    excellent low cost platform that is incredibly peppy.
                </p>
            </div>
        </div>
    );
}

export default Corona;
