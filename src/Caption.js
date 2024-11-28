import './Caption.css';
import { Link } from "react-router-dom";

function Caption() {
  return (
    <div class="Caption">
      <div class="countrytitle1">COUNTRY VIDEO GAMES</div>
      <div class="countrytitle2">Proudly located in Bowling Green, Kentucky, USA</div>
      <div class="countrylinks">
          <Link to="/Home">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/ColorParty">Color Party</Link>
          <Link to="/Corona">Corona</Link>
          <Link to="/Privacy">Privacy</Link>
      </div>
    </div>
  );
}

export default Caption;
