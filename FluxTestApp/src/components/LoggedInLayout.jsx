import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import AboutPage from './AboutPage.jsx'
import SessionStore from '../stores/SessionStore';
import TasklistsPage from '../containers/TasklistsPage.jsx';

import './LoggedInLayout.less';

class LoggedInLayout extends React.Component{
    render() {
        return (
            <div className='LoggedInLayout'>
                <div className='LoggedInLayout__content'>
                    {this.props.children}
                </div>
                <Route render={requireAuth}/>
                <Route path='/about' component={AboutPage}/>
                <Route path='/lists' component={TasklistsPage}/>

            </div>
        );
    }
}

var requireAuth = function(nextState){    
    if (!SessionStore.isLoggedIn()) 
       return <Redirect to={{
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        }}/>     
        return '';   
};

export default LoggedInLayout;
