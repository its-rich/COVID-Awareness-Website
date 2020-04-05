import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Navigation/Nav.js';
import './App.css';
import Continents from './Pages/Continents.js';
import Diseases from './Pages/Diseases.js';
import Home from './Pages/Home.js';
import Reports from './Pages/Reports.js';
import News from './Pages/News.js';
import Risk from './Pages/Risk.js';
import PickDate from './components/PickDate.js'

function App () {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/diseases" exact component={Diseases} />
                    <Route path="/continents" exact component={Continents} />
                    <Route path="/reports" exact component={Reports} />
                    <Route path="/latestnews" exact component={News} />
                    <Route path="/risk" exact component={Risk} />
                    <Route path="/pickDate" exact component={PickDate} />
                </Switch>
            </div>
        </Router>
    );
}

export default App
