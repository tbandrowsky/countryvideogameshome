import './App.css';
import colorpartystore from './images/colorpartymsstore.png'

function Home() {
  return (
      <div class="pagebackground">
          <div class="colorparty">
              <h1>Welcome to Country Video Games</h1>
              <h2>All our applications are $1, or close to it.</h2>

              <h2>Color Party</h2>
              <p>Color Party.  Color Party lets you make light shows out of anything that moves instantly, with one or more web cams attacked to your Windows laptop or desktop.</p>
              <p>
                  <a href="ms-windows-store://pdp/?productid=9PP1DQXGWG0N"><img src={colorpartystore} width="500" alt="Color Party in Windows Store" /></a>
              </p>

              <h2>Corona App Server</h2>
              <p>Create web apis instantly from a class definition file.</p>
              <p>Download zip, extract to folder, and either run from the terminal or invoke the batch.</p>
              <p>
                  <a href="coronaserver.zip">Download Corona Preview (11/18/2024)</a>
              </p>

          </div>
      </div>
  );
}

export default Home;
