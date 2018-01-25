import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import { HashRouter, Route } from 'react-router-dom';

import App from './App.jsx';
import LoginPage from './components/LoginPage.jsx';
import SessionActions from './actions/SessionActions';
import SeesionStore from './stores/SessionStore';
import api from './api';

window.handleGoogleApiLoaded = () => {    
    SessionActions.authorize(true, renderApp);
};

function renderApp(){
    ReactDOM.render(           
        <HashRouter >
            <Route path='/' component={App}/>
        </HashRouter >,
        document.getElementById('mount-point')
    );    
};