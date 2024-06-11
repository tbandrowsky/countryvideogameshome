import './App.css'

import screencap1release1 from './images/screencap1release1.png'

function ColorParty() {
  return (
      <div class="pagebackground">
      <h1>Color Party</h1>
      <h2>
      Great fun for churches and raves alike.
          </h2>
          <br />
      <a href="ms-windows-store://pdp/?productid=9PP1DQXGWG0N">Buy Color Party for your PC</a>
          <br />
      <p>
      Put on that web came and fire up Color Party and you've got yourself
      a room full of people with something to do.  See, they are all looking 
      at themselves dancing with that one camera so its a screen, and then,
      they might start talking to each other.
      </p>
      <p>Color Party is great for any gathering, or just killing time making 
      some art on your own.</p>
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
      </div>
  );
}

export default ColorParty;
