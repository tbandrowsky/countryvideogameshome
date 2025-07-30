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
import Home from './Corona/Home';
import ClassSearch from './Corona/ClassSearch';
import ClassEdit from './Corona/ClassEdit';
import CreateAccount from './Corona/CreateAccount';
import Login from './Corona/Login';
import SetPassword from './Corona/SetPassword';
import SendCode from './Corona/SetPassword';
import ObjectEdit from './Corona/ObjectEdit';
import ObjectSearch from './Corona/ObjectSearch';

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
                    <Route path="/About" element={<About />} />
                    <Route path="/Corona/Home" element={<Home />} />
                    <Route path="/Corona/Login" element={<Login />} />
                    <Route path="/Corona/SetPassword" element={<SetPassword />} />
                    <Route path="/Corona/SendCode" element={<SendCode />} />
                    <Route path="/Corona/ObjectEdit" element={<ObjectEdit />} />
                    <Route path="/Corona/ObjectSearch" element={<ObjectSearch />} />
                    <Route path="/Corona/ClassSearch" element={<ClassSearch />} />
                </Routes>
            </div>
     </div>
   </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
