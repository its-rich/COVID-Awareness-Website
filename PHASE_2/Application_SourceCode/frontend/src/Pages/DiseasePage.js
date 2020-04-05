import React, {Component} from 'react';
import '../App.css';
import Graph from '../components/Graph';
import PieChart from '../components/PieChart';

class DiseasePage extends Component {

    changeDisease = () => {
        this.props.changeDisease('');
    }

    render() {
        return (
            <div class="DiseaseGraph">
                <button className="waves-effect waves-light btn" style={{width:"auto", position: "sticky", right:"35%", top: "12%"}} type="button" onClick={this.changeDisease.bind(this)}>Back</button>
                <Graph disease={this.props.disease}/>
                <PieChart disease={this.props.disease} switch="dead"/>
                <PieChart disease={this.props.disease} switch="infected"/>
            </div>
        )
    }
}

export default DiseasePage;
