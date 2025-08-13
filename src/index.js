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
import HomeForm from './Corona/HomeForm';
import ClassSearchForm from './Corona/ClassSearchForm';
import ClassEditForm from './Corona/ClassEditForm';
import CreateUserForm from './Corona/CreateUserForm';
import ConfirmCodeForm from './Corona/ConfirmCodeForm';
import LoginForm from './Corona/LoginForm';
import SetPasswordForm from './Corona/SetPasswordForm';
import SendCodeForm from './Corona/SendCodeForm';
import ObjectEditForm from './Corona/ObjectEditForm';
import ObjectSearchForm from './Corona/ObjectSearchForm';

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
                    <Route path="/Corona/Home" element={<HomeForm applicationName="REVOLUTION" />} />
                    <Route path="/Corona/Login" element={<LoginForm applicationName="REVOLUTION" />} />
                    <Route path="/Corona/CreateUser" element={<CreateUserForm applicationName="REVOLUTION" />} />
                    <Route path="/Corona/SetPassword" element={<SetPasswordForm applicationName="REVOLUTION" />} />
                    <Route path="/Corona/SendCode" element={<SendCodeForm applicationName="REVOLUTION" />} />
                    <Route path="/Corona/ObjectEdit" element={<ObjectEditForm applicationName="REVOLUTION" />} />
                    <Route path="/Corona/ObjectSearch" element={<ObjectSearchForm applicationName="REVOLUTION" />} />
                    <Route path="/Corona/ClassEdit" element={<ClassEditForm applicationName="REVOLUTION" />} />
                    <Route path="/Corona/ClassSearch" element={<ClassSearchForm applicationName="REVOLUTION" />} />
                    <Route path="/Corona/ConfirmCode" element={<ConfirmCodeForm applicationName="REVOLUTION" />} />
                </Routes>
            </div>
     </div>
   </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
