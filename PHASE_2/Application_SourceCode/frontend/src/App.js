import React from 'react';
import NavBar from './components/NavBar'
import Pages from './components/Pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Navigation/Nav.js';
import './App.css';
import Continents from './components/Continents.js';
import Diseases from './components/Diseases.js';
import Home from './components/Home.js';

function App () {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/diseases" exact component={Diseases} />
                    <Route path="/continents" exact component={Continents} />
                </Switch>
            </div>
        </Router>
    );
}

export default App
