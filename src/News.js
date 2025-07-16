import './App.css';
import colorpartystore from './images/colorpartymsstore.png'

function News() {
  return (
      <div class="contentbackground">
          <h1>MEANWHILE</h1>
          <i>AT THE SECRET COUNTRY VIDEOGAMES COMPOUND</i>
          <h2>WEB SITE</h2>
          <h3>REPO</h3>
          <a href="https://github.com/tbandrowsky/countryvideogameshome">Website Repo</a>
          <h3>UPDATE</h3>
          <p>We're working on our web site to be more friendly and modern.  Our vision is as CountryVideoGames as sort of a flea market
              rural or hood feel.  Expanding out pages, cleaning up the navigation is a focus.  We're going to use Corona to
              add collaboration features and demonstrations to showcase our power, and have microgames throughout.</p>

          <h2>CORONA API SERVER</h2>
          <h3>REPO</h3>
          <a href="https://github.com/tbandrowsky/countrybit">Corona Repo</a>
          <h3>UPDATE</h3>
          <p>Create web apis and services instantly from a class definition file.</p>
            <p>
                <a href="coronaserver.zip">Download Corona Preview (11/28/2024)</a>
            </p>

            <h2>Color Party</h2>
              <h3>REPO</h3>
              <a href="https://github.com/tbandrowsky/countrybit">Corona Repo (includes color party)</a>
            <p>Color Party.  We haven't done anything here in a bit, but it is a fun application.</p>
            <p>
                <a href="ms-windows-store://pdp/?productid=9PP1DQXGWG0N"><img src={colorpartystore} width="500" alt="Color Party in Windows Store" /></a>
            </p>
      </div>
  );
}

export default News;
