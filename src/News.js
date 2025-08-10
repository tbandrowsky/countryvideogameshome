import './App.css';
import { Link } from "react-router-dom";
import TitleBar from "./TitleBar";

let newsItems = [
    {
        title: "Corona Server",
        info: "/Corona",
        repo: "https://github.com/tbandrowsky/countrybit",
        description: "Corona gets beta OpenAPI 3.x support, and an installer.  Tested on Azure VM WS 2022 2 Core, on Xeon Max 9480 56 Core, and more to tease out a problem with a thread barrier.",
        download: "coronaserver.zip"
    },
    {
        title: "Web Site",
        info: "/News",
        repo: "https://github.com/tbandrowsky/countryvideogameshome",
        description: "Web site getting new look and Corona integration."
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
          <div className="content">
          {newsItems.map((item,index) => (
              <div key={index} className="newstory">
                  <h3><Link style={{ display: "inline-block", width: "250px" }} to={item.info}>{item.title}</Link></h3>
                  <p>{item.description}</p>
              </div>
          ))}
          </div>
      </div>
  );
}

export default News;
