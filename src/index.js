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
import GoogleAd from './GoogleAd'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <BrowserRouter>
        <link rel="icon" type="image/x-icon" href="public/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="public/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="public/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="public/apple-touch-icon.png" />

        <div className="countryvideogamesroot" style={{ width: "100%", height: "80vh" }}>
            <MenuBar/>
            <div className="countryvideogamescontent">
                <Routes>
                    <Route exact path="/" element={<News />}/>
                    <Route path="/News" element={<News />} />
                    <Route path="/Privacy" element={<Privacy />} />
                    <Route path="/RevolutionAbout" element={<RevolutionAbout />} />
                    <Route path="/ColorParty" element={<ColorParty />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Revolution/Home" element={<HomeForm />} />
                    <Route path="/Revolution/Login" element={<LoginForm  />} />
                    <Route path="/Revolution/CreateUser" element={<CreateUserForm />} />
                    <Route path="/Revolution/SetPassword" element={<SetPasswordForm />} />
                    <Route path="/Revolution/SendCode" element={<SendCodeForm />} />
                    <Route path="/Revolution/ObjectEdit" element={<ObjectEditForm />} />
                    <Route path="/Revolution/ObjectSearch" element={<ObjectSearchForm />} />
                    <Route path="/Revolution/ClassEdit" element={<ClassEditForm />} />
                    <Route path="/Revolution/ClassSearch" element={<ClassSearchForm />} />
                    <Route path="/Revolution/ConfirmCode" element={<ConfirmCodeForm />} />
                </Routes>
            </div>
        </div>
        <GoogleAd slot="6300978111" googleAdId="ca-pub-3940256099942544" containerStyle={{ position: "absolute", left: 0, top: "70vh", width: "100vw", height: "25vh" }} />
    </BrowserRouter>
);

//
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
