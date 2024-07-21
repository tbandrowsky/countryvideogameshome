import './App.css';
import colorpartystore from './images/colorpartymsstore.png'

function Home() {
  return (
      <div class="pagebackground">
          <div class="colorparty">
              <h1>Welcome to Country Video Games</h1>
              <h2>Color Party</h2>
              <p>Our launch product is Color Party.  Color Party lets you make light shows out of anything that moves instantly, with one or more web cams attacked to your Windows laptop or desktop.</p>
              <p>
                  <a href="ms-windows-store://pdp/?productid=9PP1DQXGWG0N"><img src={colorpartystore} width="500" alt="Color Party in Windows Store" /></a>
              </p>
              <ol>
                  <li>We are building a modern native stack for Windows to develop though provoking, interactive experiences.</li>
                  <li>Our tech stack is built in native C++ to be the absolute lowest cost most performant modern applications for Windows anywhere.</li>
                  <li>We have our own UI and database framework.</li>
                  <li>Our first product is Color Party, which we are using to advance our front end and client based AI.</li>
                  <li>Applications for Color Party technologies include safety and the best identity experience on the planet.</li>
                  <li>We have a plan.</li>
              </ol>
              <h2>Technology Test</h2>
              <p>You can download our simple forms test harness from <a href="Demo.zip">here</a></p>
              <h2>Reparations</h2>
              <p>I, Todd Bandrowsky, have been taking Corona to the next level and using it to build a system of Reparations for Black Americans as a pilot. I'm actually a right wing
                  Republican, pro-gun, and Christian.  The story of how I came to be in favor of reparations is entirely a Christian spiritual struggle, and is a good read I think for other people
                  whose faith and relationship with God might be similar to mine.  I've included the pdf in the zip.
                  This is the same document I posted on gofund me and other places.
              </p>
              <p>Download reparations as I evolve it, here: <a href="reparations.zip">here</a></p>
          </div>
      </div>
  );
}

export default Home;
