import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Navigation/Nav.js';
import './App.css';
import VirusAvoider from './Pages/VirusAvoider.js';
import VirusSimulator from './Pages/VirusSimulator.js'
import Infected from './Pages/Infected.js'
import Home from './Pages/Home.js';
import Register from './Pages/Register.js';
import Login from './Pages/SignIn.js';

function App () {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/coronavirus-avoider" exact component={VirusAvoider} />
                    <Route path="/coronavirus-simulator" exact component={VirusSimulator} />
                    <Route path="/infected" exact component={Infected} />
                    <Route path="/register" exact component ={Register} />
                </Switch>
            </div>
        </Router>
    );
}
    // <PickDate />

export default App
