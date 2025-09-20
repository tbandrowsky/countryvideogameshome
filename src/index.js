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
import RevolutionAbout from './RevolutionAbout';
import HomeForm from './Revolution/HomeForm';
import ClassSearchForm from './Revolution/ClassSearchForm';
import ClassEditForm from './Revolution/ClassEditForm';
import CreateUserForm from './Revolution/CreateUserForm';
import ConfirmCodeForm from './Revolution/ConfirmCodeForm';
import LoginForm from './Revolution/LoginForm';
import SetPasswordForm from './Revolution/SetPasswordForm';
import SendCodeForm from './Revolution/SendCodeForm';
import ObjectEditForm from './Revolution/ObjectEditForm';
import ObjectSearchForm from './Revolution/ObjectSearchForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <link rel="icon" type="image/x-icon" href="public/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="public/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="public/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="public/apple-touch-icon.png" />
        <div class="countryvideogamesroot">
            <MenuBar/>
            <div class="countryvideogamescontent">
                <Routes>
                    <Route exact path="/" element={<News />}/>
                    <Route path="/News" element={<News />} />
                    <Route path="/Privacy" element={<Privacy />} />
                    <Route path="/RevolutionAbout" element={<RevolutionAbout />} />
                    <Route path="/ColorParty" element={<ColorParty />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Revolution/Home" element={<HomeForm applicationName="REVOLUTION" />} />
                    <Route path="/Revolution/Login" element={<LoginForm applicationName="REVOLUTION" />} />
                    <Route path="/Revolution/CreateUser" element={<CreateUserForm applicationName="REVOLUTION" />} />
                    <Route path="/Revolution/SetPassword" element={<SetPasswordForm applicationName="REVOLUTION" />} />
                    <Route path="/Revolution/SendCode" element={<SendCodeForm applicationName="REVOLUTION" />} />
                    <Route path="/Revolution/ObjectEdit" element={<ObjectEditForm applicationName="REVOLUTION" />} />
                    <Route path="/Revolution/ObjectSearch" element={<ObjectSearchForm applicationName="REVOLUTION" />} />
                    <Route path="/Revolution/ClassEdit" element={<ClassEditForm applicationName="REVOLUTION" />} />
                    <Route path="/Revolution/ClassSearch" element={<ClassSearchForm applicationName="REVOLUTION" />} />
                    <Route path="/Revolution/ConfirmCode" element={<ConfirmCodeForm applicationName="REVOLUTION" />} />
                </Routes>
            </div>
     </div>
   </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
