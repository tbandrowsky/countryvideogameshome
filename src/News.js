import './App.css';

let newsItems = [
    {
        title: "Web Site",
        info: "Home",
        url: "https://github.com/tbandrowsky/countryvideogameshome",
        description: "Web site getting new look and Corona integration."
    },
    {
        title: "Corona Server",
        info: "Corona",
        url: "https://github.com/tbandrowsky/countrybit",
        description: "Corona gets beta OpenAPI 3.x support.",
        download: "coronaserver.zip"
    },
    {
        title: "Color Party",
        url: "https://github.com/tbandrowsky/countrybit",
        description: "Color Party is hanging out there.  Haven't done anything with it."
    }
];

function News()
{
  return (
      <div class="contentbackground">   
          <h2>News and Activity</h2>
          <h3>Using Corona and React, we're going to do some capabilities shows.</h3>
          {newsItems.map((item) => (
              <div class="newstory">
                  <h3><a style={{ display: "inline-block", width: "250px" }} href={item.url}>{item.title}</a></h3>
                  <p>{item.description}</p>
              </div>
          ))}
      </div>
  );
}

export default News;
