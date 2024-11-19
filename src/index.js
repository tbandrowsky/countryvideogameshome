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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <div>
            <Caption/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/Home" element={<Home/>} />
                <Route path="/Privacy" element={<Privacy/>} />
                <Route path="/ColorParty" element={<ColorParty/>} />
                <Route path="/About" element={<About/>} />
            </Routes>
        </div>
   </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
