import './App.css';
import { Link } from "react-router-dom";

let newsItems = [
    {
        title: "Web Site",
        info: "/News",
        repo: "https://github.com/tbandrowsky/countryvideogameshome",
        description: "Web site getting new look and Corona integration."
    },
    {
        title: "Corona Server",
        info: "/Corona",
        repo: "https://github.com/tbandrowsky/countrybit",
        description: "Corona gets beta OpenAPI 3.x support.",
        download: "coronaserver.zip"
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
      <div class="contentbackground">   
          <h1>NEWS</h1>
          {newsItems.map((item) => (
              <div class="newstory">
                  <h3><Link style={{ display: "inline-block", width: "250px" }} to={item.info}>{item.title}</Link></h3>
                  <p>{item.description}</p>
              </div>
          ))}
      </div>
  );
}

export default News;
