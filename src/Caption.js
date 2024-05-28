import './Caption.css';
import { Link } from "react-router-dom";

function Caption() {
  return (
    <div class="Caption">
      <div>COUNTRY VIDEO GAMES</div>
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
