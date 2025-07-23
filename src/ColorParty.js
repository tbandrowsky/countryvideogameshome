import './App.css'
import './index.css'

import screencap1release1 from './images/screencap1release1.png'
import TitleBar from './TitleBar'

function ColorParty() {
  return (
      <div class="contentbackground">
        <TitleBar title="COLOR PARTY"/>
        <h2>PSYCHEDLIC LIGHT SHOWS FROM YOUR WEBCAM</h2>
          <a style={{ marginLeft: "16px" }} href="ms-windows-store://pdp/?productid=9PP1DQXGWG0N">BUY NOW</a>
        <p>
            Color Party is an app for Windows you can get from the Microsoft Store.  Color Party reads 
            whatever web cams you have connected, and produces a live light show on screen (or an attacked projector), 
            of everything moving on the camera.
        </p>
      <p>
         <img src={screencap1release1} alt="Color Party Screen"/>
          </p>

          <h2>REAL TIME AI</h2>
          <p>
              Color Party is integrated with OpenCV for the latest in AI vision, along with its own 
              movement detection and color shifting models.
          </p>

          <h2>OUTDOOR PARTY FUN</h2>
          <p>Get a cheap projector and a laptop and Color Party can turn any place where you can shine a project into an interactive art experience.</p>
          <iframe style={{ marginLeft: "16px" }} width="560" height="315" src="https://www.youtube.com/embed/bd6F8wUNgQ4?si=uR6m5DDIzBgaEZiI&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <p>
              You can get this at the Microsoft Store on your Windows PC, to which, we are greatly appreciative,
              and we say out here "Windows is the best", down here.
          </p>

        <h2>SUPERB CAMERA INTEGRATION.</h2>
      <p>
            Color Party uses the latest Windows API to manage your webcams.  Designed to be
      a base technology for future products, Color Party detects when you plug in or remove web cameras, and does what it can.
      Color Party just give you a list of cameras, and then you pick which one you want to display.
      </p>

      </div>
  );
}

export default ColorParty;
