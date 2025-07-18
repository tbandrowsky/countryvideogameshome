import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MenuBar from './MenuBar';
import News from './News';
import Privacy from './Privacy';
import About from './About';
import ColorParty from './ColorParty';
import Corona from './Corona';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <div class="countryvideogamesroot">
            <MenuBar/>
            <div class="countryvideogamescontent">
                <Routes>
                    <Route exact path="/" element={<News />}/>
                    <Route path="/News" element={<News />} />
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
