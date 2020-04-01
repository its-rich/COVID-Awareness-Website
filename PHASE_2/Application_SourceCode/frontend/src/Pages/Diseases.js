import React, {Component} from 'react';
import '../App.css';
import data from '../Data/disease_list';

class Diseases extends Component {
    render(){
        let item = data.map(disease =>
                <div id={disease.name}>
                {disease.name}
                </div>
            );
        return (
            <div>
                <center className="Title"> All Diseases </center>
                <div id="disease-names">
                {item}
                </div>
            </div>
        );
    }
}

export default Diseases;
