import Caption from './Caption';
import colorparty1 from './images/colorparty1.png'
import colorparty3 from './images/colorparty3.png'
import cameradisconnected from './images/cameradisconnected.png'
import cameranotfoundstartup from './images/cameranotfoundstartup.png'

function ColorParty() {
  return (
      <div class="pagebackground">
      <h1>Check out Color Party</h1>
      <h2>
      Great fun for churches and raves alike.
      </h2>
      <p>
      Put on that web came and fire up Color Party and you've got yourself
      a room full of people with something to do.  See, they are all looking 
      at themselves dancing with that one camera so its a screen, and then,
      they might start talking to each other.
      </p>
      <p>Color Party is great for any gathering, or just killing time making 
      some art on your own.</p>
      <p>
        <img src={colorparty1} alt="Color Party Screen"/>
      </p>
      <p>
         <img src={colorparty3} alt="Color Party Screen"/>
      </p>
      <h2>
      We worked on that Camera.
      </h2>
      <p>
      How is it that so many applications have a hard time finding your camera?
      We tried to make it so that Color Party just fires up, and, you can plug in 
      your web camera any time you want and it should work.
      </p>
      <p>
        <img src={cameradisconnected} alt="Camera Disconnected"/>
      </p>
      <p>
        <img src={cameranotfoundstartup} alt="Camera Not Found"/>
       </p>
      </div>
  );
}

export default ColorParty;
