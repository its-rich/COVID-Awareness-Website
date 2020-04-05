import React, {Component} from 'react';
import '../App.css';
import data from '../Data/disease_list';

class AllDiseases extends Component {

    changeDisease = (e) => {
        this.props.changeDisease(e.target.textContent);
    }

    render() {
        let item = data.map(disease =>
                <div className="alldiseases" key={disease.name} onClick={this.changeDisease.bind(this)}>
                <button>{disease.name}</button>
                </div>
            );
        return (
            <div>
                <center className="Title"> <h3>All Diseases</h3> </center>
                <div className="diseaseList" id="disease-names">
                {item}
                </div>
            </div>
        )
    }
}

export default AllDiseases;
