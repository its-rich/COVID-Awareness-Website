import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Navigation/Nav.js';
import './App.css';
import Continents from './Pages/Continents.js';
import Diseases from './Pages/Diseases.js';
import Home from './Pages/Home.js';
import Reports from './Pages/Reports.js';
import News from './Pages/News.js';
<<<<<<< HEAD
import DatePicker from './components/DatePicker.js';
import PickDate from './components/PickDate.js';
=======
import Risk from './Pages/Risk.js';
>>>>>>> 8a27f7c4764fcc1b1a2165f3329fa1b08b585e83

function App () {
    return (
        <Router>
            <div className="App">
                <Nav />
                <Switch>
                    <PickDate />
                    {/* <Route path="/" exact component={Home} />
                    <Route path="/diseases" exact component={Diseases} />
                    <Route path="/continents" exact component={Continents} />
                    <Route path="/reports" exact component={Reports} />
                    <Route path="/latestnews" exact component={News} />
<<<<<<< HEAD
                    <Route path="/dates" exact component={DatePicker} /> */}
=======
                    <Route path="/risk" exact component={Risk} />
>>>>>>> 8a27f7c4764fcc1b1a2165f3329fa1b08b585e83
                </Switch>
            </div>
        </Router>
    );
}

export default App
