import React, {Component} from 'react';
import '../App.css';
import data from '../Data/disease_list';

function getDiseasePage(e) {
    console.log(e.target.textContent)
    return(
        <div>
            <h3>hello</h3>
        </div>
    );
}

class Diseases extends Component {
    render(){
        let item = data.map(disease =>
                <ul className="alldiseases" key={disease.name} onClick={getDiseasePage}>
                {disease.name}
                </ul>
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
