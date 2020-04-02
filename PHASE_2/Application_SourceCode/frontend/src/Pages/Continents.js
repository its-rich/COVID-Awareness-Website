import React, {Component} from 'react';
import '../App.css';
import data from '../Data/continents.json';

class Continents extends Component {
    render(){
        let item = data.map(continent=>
                <div id={continent.countries}>
                {continent.countries}
                </div>
            );
        return (
            <div>
                <center className="Title"> All Continents</center>
                <div id="disease-names">
                {item}
                </div>
            </div>
        );
    }
}

export default Continents;
