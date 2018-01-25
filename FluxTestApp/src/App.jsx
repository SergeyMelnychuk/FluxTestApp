import React, { Component } from 'react';
import { Link, Route, Switch  } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LoggedInLayout from './components/LoggedInLayout.jsx';
import LoginPage from './containers/LoginPage.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './styles/base.less';

class App extends React.Component{       
    render() {
        return (
            <MuiThemeProvider>    
                <div className='App'>   
                             
                    {this.props.children}
                    
                    {/* Routing */}
                    <Route path='/login' component={LoginPage}/>  
                    <Route component={LoggedInLayout}/>           
                </div>
             </MuiThemeProvider>
        );
    }
}



export default App;
