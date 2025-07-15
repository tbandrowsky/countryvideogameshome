import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Caption from './Caption';
import Home from './Home';
import Privacy from './Privacy';
import About from './About';
import ColorParty from './ColorParty';
import Corona from './Corona';
import { Link } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
     <div style={{display:'flex',flexDirection:'row'}}>
        <div style={{display:'flex',flexDirection:'column',width:'25%',backgroundColor:'#006644'}}>
            <Caption/>
      <div class="countrytitle2x"></div>
      <div class="countrylinks">
          <Link to="/Home">HOME</Link>
          <Link to="/Corona">CORONA</Link>
          <Link to="/About">ABOUT</Link>
          <Link to="/Privacy">PRIVACY</Link>
          <Link to="/ColorParty">COLOR PARTY</Link>
      </div>
      <div class="countrytitle2a">Proudly heralded</div>
      <div class="countrytitle2b">SELECT GRADE</div>
      <div class="countrytitle2a">Proudly made</div>
      <div class="countrytitle2x"></div>
        </div>
        <div style={{display:'flex',flexDirection:'column',width:'75%'}}>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/Home" element={<Home/>} />
                <Route path="/Privacy" element={<Privacy />} />
                <Route path="/Corona" element={<Corona />} />
                <Route path="/ColorParty" element={<ColorParty />} />
                <Route path="/About" element={<About/>} />
            </Routes>
        </div>
      </div>
   </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
