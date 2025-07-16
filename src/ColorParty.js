import './App.css'

import screencap1release1 from './images/screencap1release1.png'
import colorpartystore from './images/colorpartymsstore.png'

function ColorParty() {
  return (
      <div class="contentbackground">
      <h1>COLOR PARTY can make light shows out of anything that moves</h1>
      <h2>
      Great fun!
          </h2>
          <br />
      <a href="ms-windows-store://pdp/?productid=9PP1DQXGWG0N">Buy Color Party for your PC</a>
          <br />
          <p>
              Color Party is an app for Windows you can get from the Microsoft Store.  Color Party reads 
              whatever web cams you have connected, and produces a live light show on screen (or an attacked projector), 
              of everything moving on the camera.
          </p>
          <p>Color Party is fun!</p>
      <p>
         <img src={screencap1release1} alt="Color Party Screen"/>
      </p>
      <h2>
      We worked on that Camera.
      </h2>
      <p>
      Color Party detects when you plug in or remove web cameras, and does what it can. 
      No fumbling with a bunch of settings. Color Party just give you a list of cameras,
      and then you pick which one you want to display.
      </p>
          <p>Color Party is simple!</p>
          <br />
          <a href="ms-windows-store://pdp/?productid=9PP1DQXGWG0N">Buy Color Party for your PC</a>
          <p>Willie built a projection screen on Russellville Rd in Bowling Green, KY, and used Color Party to make
              light shows out of the traffic to test it out.</p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/bd6F8wUNgQ4?si=uR6m5DDIzBgaEZiI&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <br />
          <br />
          <p>
              You can get this at the Microsoft Store on your Windows PC, to which, we are greatly appreciative,
              and we say out here "Windows is the best", down here.
          </p>
          <p>
              <a href="ms-windows-store://pdp/?productid=9PP1DQXGWG0N"><img src={colorpartystore} width="500" alt="Color Party in Windows Store" /></a>
          </p>
      </div>
  );
}

export default ColorParty;
