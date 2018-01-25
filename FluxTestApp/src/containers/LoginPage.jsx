import React from 'react';
import PropTypes from 'prop-types';
import SessionStore from '../stores/SessionStore';
import SessionActions from '../actions/SessionActions';

import LoginPage from '../components/LoginPage.jsx';

function getStateFromFlux() {   
    return {        
        isLoggedIn: SessionStore.isLoggedIn()
    };
}

class LoginPageContainer extends React.Component{
    constructor(props, context){
        super(props);
        context.router;
        this.state = getStateFromFlux();
    }

    componentDidMount() {        
        SessionStore.addChangeListener(this._onChange);

        if (this.state.isLoggedIn) {
            this.redirectLoggedInUser();
        }
    }

    componentWillUpdate(nextProps, nextState) {     
        if (nextState.isLoggedIn) {
             this.redirectLoggedInUser();
        }
    }

    componentWillUnmount() {
        SessionStore.removeChangeListener(this._onChange);
    }

    handleLogIn() {
        SessionActions.authorize();
    }

    redirectLoggedInUser() {         
        const { location } = this.props

        if (location.state && location.state.nextPathname) {
            this.context.router.history.replace(location.state.nextPathname);
        } else {
            this.context.router.history.replace('/lists');
        }
    }

    render() {
        return (
            <LoginPage onLogIn={this.handleLogIn.bind(this)} />
        );
    }

    _onChange() {
        this.setState(getStateFromFlux());
    }
};

LoginPageContainer.contextTypes = {    
    router: PropTypes.object.isRequired
};
export default LoginPageContainer;