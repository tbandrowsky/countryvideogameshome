import './App.css';
import screencap3release1 from './images/screencap3release1.png'
import { Link } from "react-router-dom";

function Home() {
  return (
      <div class="pagebackground">
          <div class="colorparty">
              <h1>Announcing</h1>
              <h2>Our First Release</h2>
              <p>
              This is ColorParty.  Willie has been working a bit in circles and finally Ma got 
              fed up and said "You can't estimate worth a doodoo" and so he came up with this.  It's a right
              fun family game, just like our site, perfectly great at church parties and raves alike.
              </p>
              <p>
              You can get this at the Microsoft Store, to which, we are greatly appreciative, 
              and we say out here "Windows is the best", down here.
              </p>
              <p>
              <Link to="/ColorParty"><img src={screencap3release1} alt="Color Party Screen Shot"/></Link>
              </p>
          </div>
      </div>
  );
}

export default Home;
