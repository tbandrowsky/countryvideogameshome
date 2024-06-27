import './App.css';
import colorpartystore from './images/colorpartymsstore.png'

function Home() {
  return (
      <div class="pagebackground">
          <div class="colorparty">
              <h1>Welcome to Country Video Games</h1>
              <ol>
                  <li>We are building a modern native stack for Windows to develop though provoking, interactive experiences.</li>
                  <li>Our tech stack is built in native C++ to be the absolute lowest cost most performant modern applications for Windows anywhere.</li>
                  <li>We have our own UI and database framework.</li>
                  <li>Our first product is Color Party, which we are using to advance our front end and client based AI.</li>
                  <li>Applications for Color Party technologies include safety and the best identity experience on the planet.</li>
                  <li>We have a plan.</li>
              </ol>
              <h2>Color Party</h2>
              <p>Our launch product is Color Party.  Color Party lets you make light shows out of anything that moves instantly, with one or more web cams attacked to your Windows laptop or desktop.</p>
              <p>
                  <a href="ms-windows-store://pdp/?productid=9PP1DQXGWG0N"><img src={colorpartystore} width="500" alt="Color Party in Windows Store" /></a>
              </p>
          </div>
      </div>
  );
}

export default Home;
