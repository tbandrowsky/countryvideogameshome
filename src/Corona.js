import './App.css'
import TitleBar from './TitleBar'
import { Link } from "react-router-dom";

function Corona() {
    return (
        <div class="contentbackground">
            <TitleBar title="CORONA" />
            <div style={{ display: "grid", gridColumnTemplate: "30% 30% 30%", backgroundColor: "darkgreen" }} >
                <Link style={{ paddingLeft: "16px", gridColumn: "1", textAlign: "left" }} to="/Corona/Login">REVOLUTION</Link>
                <a style={{ paddingLeft: "16px", gridColumn: "2", textAlign: "left" }} href="downloads/coronarc1.zip">Download (8/26/2025)</a>
                <a style={{ paddingLeft: "16px", gridColumn: "3", textAlign: "left" }} href="corona_quickstart.pdf">Installation (7/23/2025)</a>
            </div>
            <div className="content">
                <h2>An object oriented api and data server</h2>
                <p>Corona is a database server that is designed to get data driven web apis quickly running.  Corona accepts a schema file
                    with class definitions, data imports, and SQL Server links, and integrates all of that into an object api with consistent and correct
                    CRUD, plus, the ability to define queries consisting of joins, filters, and projections.</p>

                <p>Breathtakingly innovative, Corona takes all the things anyone needs, from database to web, and identity,
                with a powerful, simple appliance weighing in at 1.5Mb.</p>
                <h2>Create organizations from sets of teams</h2>
                <p>No more need to wrestle with complicated workflows and endless security nightmares.  Corona correctly implements
                    teams.  Create teams with your own enterprise's people, people from other domains, and any mix that you prefer.
                </p>

                <h2>Fast to execute</h2>
                <p>Corona is fast.  Corona has of thousands of objects per second, validated and on disk, and roaring queries.</p>
                <p>Logging in, password recovery are all instant.</p>

                <h2>Fast to data</h2>
                <p>Corona lets you edit your api as easy as a simple json file.  Edit a schema file while Corona is running.  Have it rebuild your database from the ground up
                on every change, or just keep editing your file. </p>

                <h2>Fast to people</h2>
                <p>Create teams, each with their own unique permissions.  Users onboard to teams based on their email address.  So you can have teams from
all your partners and friends, each with their own permissions.</p>

                <h2>"Edit my own stuff" security</h2>
                <p>Corona's integrated workflow and security allows you to specify security for "own records".</p>

                <h2>Open Source</h2>
                <p>
                    Corona is an open source and available for free either from this download page or from our repo.
                </p>
                <h2>Object Oriented Database Service</h2>
                <p>Corona is a database engine and a web server rolled together.  It has all the crud methods for objects,
                    so you have instant CRUD. It has a full login and sign up scenario with MFA.  Right now we use email but we can use cell phones.
                </p>
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
