import './App.css';
import colorpartystore from './images/colorpartymsstore.png'

function Home() {
  return (
      <div class="pagebackground">
          <div class="colorparty">
              <h2>Color Party Outside</h2>
              <br/>
              <a href="ms-windows-store://pdp/?productid=9PP1DQXGWG0N">Buy Color Party for your PC</a>
              <p>Willie built a projection screen on Russellville Rd in Bowling Green, KY, and used Color Party to make 
              light shows out of the traffic to test it out.</p>
               <iframe width="560" height="315" src="https://www.youtube.com/embed/bd6F8wUNgQ4?si=uR6m5DDIzBgaEZiI&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
               <br/>
               <br/>
              <p>
              You can get this at the Microsoft Store on your Windows PC, to which, we are greatly appreciative, 
              and we say out here "Windows is the best", down here. 
              </p>
              <p>
              <a href="ms-windows-store://pdp/?productid=9PP1DQXGWG0N"><img src={colorpartystore} width="500" alt="Color Party in Windows Store"/></a>
              </p>
          </div>
      </div>
  );
}

export default Home;
