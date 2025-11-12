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
import DeveloperAbout from './DeveloperAbout';
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
import SsoLanding from './Corona/SsoLanding';
import GoogleAd from './GoogleAd'; 
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { deepmerge } from '@mui/utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import BreadCrumb from './BreadCrumb';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  typography: {
    fontFamily: [
        'Jost', 'Open Sans', 'Arial', 'Arial', 'sans-serif'
    ].join(','),
  },
});

let google_client_id = "747129738820-elfisfvfplttiogamqur0b1vflljv5ib.apps.googleusercontent.com";

root.render(

<GoogleOAuthProvider clientId={google_client_id}>
    <BrowserRouter>
        <link rel="icon" type="image/x-icon" href="public/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="public/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="public/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="public/apple-touch-icon.png" />

        <div className="countryvideogamesroot" style={{ width: "100%", height: "80vh" }}>
            <ThemeProvider theme={theme}></ThemeProvider>
            <MenuBar/>
            <div className="countryvideogamescontent">
                <Routes>
                    <Route exact path="/" element={<News />} breadcrumb="Home"/>
                    <Route path="/News" element={<News />}  breadcrumb="News"/>
                    <Route path="/Privacy" element={<Privacy />} breadcrumb="Privacy" />
                    <Route path="/DeveloperAbout" element={<DeveloperAbout />}  breadcrumb="Developers"/>
                    <Route path="/ColorParty" element={<ColorParty />}   breadcrumb="Color Party"/>
                    <Route path="/About" element={<About />}   breadcrumb="About"/>
                    <Route path="/Corona/Home" element={<HomeForm />} breadcrumb="Corona Home" />
                    <Route path="/Corona/Login" element={<LoginForm  />} breadcrumb="Login" />
                    <Route path="/Corona/CreateUser" element={<CreateUserForm />}  breadcrumb="Create User"/>
                    <Route path="/Corona/SetPassword" element={<SetPasswordForm />}  breadcrumb="Set Password"/>
                    <Route path="/Corona/SendCode" element={<SendCodeForm />}  breadcrumb="Send Code" />
                    <Route path="/Corona/ObjectEdit" element={<ObjectEditForm />}  breadcrumb="Object Edit"/>
                    <Route path="/Corona/ObjectSearch" element={<ObjectSearchForm />}  breadcrumb="Object Search"/>
                    <Route path="/Corona/ClassEdit" element={<ClassEditForm />}  breadcrumb="Class Edit"/>
                    <Route path="/Corona/ClassSearch" element={<ClassSearchForm />}  breadcrumb="Class Search"/>
                    <Route path="/Corona/ConfirmCode" element={<ConfirmCodeForm />}  breadcrumb="Confirm Code"/>
                    <Route path="/Corona/SsoLanding" element={<SsoLanding />}  breadcrumb="SSO Landing"/>
                </Routes>
            </div>
        </div>
        <GoogleAd slot="6300978111" googleAdId="ca-pub-3940256099942544" containerStyle={{ position: "absolute", left: 0, top: "75vh", width: "100vw", height: "25vh" }} />
    </BrowserRouter>
</GoogleOAuthProvider>
);

//
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
