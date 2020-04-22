import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Nav from './components/Navigation/Nav.js';
import NavIn from './components/Navigation/NavIn.js';
import './App.css';
import VirusAvoider from './Pages/VirusAvoider.js';
import VirusSimulator from './Pages/VirusSimulator.js'
import Infected from './Pages/Infected.js'
import Home from './Pages/Home.js';
import SignIn from './Pages/SignIn.js';
import SignUp from './Pages/SignUp.js';
import { auth } from "./components/Firebase/config.js";
import PasswordReset from './Pages/PasswordReset.js';
import PhoneAuthScreen from './Pages/PhoneAuthScreen.js';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({ currentUser: user });
            console.log(this.state.currentUser);
            console.log("Changed");
        });
    }
      
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render(){
        if(this.state.currentUser) {
            return (
                <Router>
                    <div className="App">
                        <NavIn />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/coronavirus-avoider" exact component={VirusAvoider} />
                            <Route path="/coronavirus-simulator" exact component={VirusSimulator} />
                            <Route path="/infected" exact component={Infected} />
                            <Route path="/signin" exact component = {SignIn} />
                            <Route path="/signup" exact component = {SignUp} />
                            <Route path="/phone" exact component = {PhoneAuthScreen} />
                        </Switch>
                    </div>
                </Router>
            );
        } else{
            return (
                <Router>
                    <div className="App">
                        <Nav />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/coronavirus-avoider" exact component={VirusAvoider} />
                            <Route path="/coronavirus-simulator" exact component={VirusSimulator} />
                            <Route path="/infected" exact component={Infected} />
                            <Route path="/signin" exact component = {SignIn} />
                            <Route path="/signup" exact component = {SignUp} />
                            <Route path="/passwordReset" exact component = {PasswordReset} />
                            <Route path="/phone" exact component = {PhoneAuthScreen} />
                        </Switch>
                    </div>
                </Router>
            );
        }
        
    }
}

export default App
