import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Navigation/Nav.js';
import './App.css';
import VirusAvoider from './Pages/VirusAvoider.js';
import VirusSimulator from './Pages/VirusSimulator.js'
import Infected from './Pages/Infected.js'
import Home from './Pages/Home.js';
import SignUp from './Pages/SignUp.js';
import PasswordReset from './Pages/PasswordReset.js';

class App extends React.Component {

    render(){
        return (
            <Router>
                <div className="App">
                    <Nav />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/coronavirus-avoider" exact component={VirusAvoider} />
                        <Route path="/coronavirus-simulator" exact component={VirusSimulator} />
                        <Route path="/infected" exact component={Infected} />
                        <Route path="/signup" exact component = {SignUp} />
                        <Route path="/passwordReset" exact component = {PasswordReset} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App
