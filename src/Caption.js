import './Caption.css';
import { Link } from "react-router-dom";

function Caption() {
  return (
    <div class="Caption">
      <div class="countrytitle1">COUNTRY VIDEO GAMES</div>
      <div class="countrytitle2">Proudly located in Bowling Green, Kentucky, USA</div>
      <div>
          <Link to="/Home">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Privacy">Privacy</Link>
          <Link to="/ColorParty">Color Party</Link>
      </div>
    </div>
  );
}

export default Caption;
