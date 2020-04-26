import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './components/Navigation/Nav.js';
import NavIn from './components/Navigation/NavIn.js';
import './App.css';
import Simulator from './Pages/Simulator.js'
import Infected from './Pages/Infected.js'
import Home from './Pages/Home.js';
import SignIn from './Pages/SignIn.js';
import SignUp from './Pages/SignUp.js';
import firebase from "./components/Firebase/config.js";
import PasswordReset from './Pages/PasswordReset.js';
import PhoneAuthScreen from './Pages/PhoneAuthScreen.js';
import Profile from './Pages/Profile.js';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null;
    auth = firebase.auth();

    componentDidMount() {
        let auth = firebase.auth();
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({ currentUser: user });
            // console.log(this.state.currentUser);
            // console.log("Changed");
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        if (this.state.currentUser) {
            return (
                <Router>
                    <div className="App">
                        <NavIn />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/coronavirus-simulator" exact component={Simulator} />
                            <Route path="/infected" render={(props) => <Infected uid={this.state.currentUser.uid} email={this.state.currentUser.email} />} />
                            <Route path="/signin" exact component = {SignIn} />
                            <Route path="/signup" exact component = {SignUp} />
                            <Route path="/profile" render={(props) => <Profile uid={this.state.currentUser.uid} email={this.state.currentUser.email} />}/>
                            <Route path="/phone" exact component = {PhoneAuthScreen} />
                        </Switch>
                    </div>
                </Router>
            );
        } else {
            return (
                <Router>
                    <div className="App">
                        <Nav />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/coronavirus-simulator" exact component={Simulator} />
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
