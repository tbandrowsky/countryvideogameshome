import './App.css';
import { Link } from "react-router-dom";
import TitleBar from "./TitleBar";

let newsItems = [
    {
        title: "Developer",
        info: "/DeveloperAbout",
        repo: "https://github.com/tbandrowsky/corona",
        description: "Samples for our AI friendly API server.",
        download: "revolution.zip"
    },
    {
        title: "Web Site",
        info: "/News",
        repo: "https://github.com/tbandrowsky/countryvideogameshome",
        description: "Web site getting new look."
    },
    {
        title: "Color Party",
        info: "/ColorParty",
        repo: "https://github.com/tbandrowsky/countrybit",
        description: "Color Party is hanging out there.  Haven't done anything with it."
    }
];

function News()
{
  return (
      <div className="contentbackground">   
          <TitleBar title="NEWS" />
          <div className="contentWrapper">
          <div className="content">
          {newsItems.map((item,index) => (
              <div key={index} className="newstory">
                  <p>{item.description}</p>
                  <Link style={{ display: "inline-block", width: "250px" }} to={item.info}>
                      <h3>{item.title}</h3>
                  </Link>
              </div>
          ))}
              </div>
          </div>
      </div>
  );
}

export default News;
