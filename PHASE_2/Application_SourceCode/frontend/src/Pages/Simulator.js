import React, {Component} from 'react';
import SimMap from '../components/SimMap.js';
import SimController from '../components/SimulationController.js';
import '../App.css';

class Simulator extends Component {

    constructor(props) {
        super(props)

        // Probs good to store the actual date
        let today = new Date();

        this.state = {
            // The amount of days away from "today"
            dateOffset: 0,
            numberInfected: 0,
        }
    }

    // Function that the SimController uses to change the date offset
    setDateOffset = (offset) => {
        this.setState({dateOffset: offset});
    }

    // Function that the SimMap uses to change number infected
    setNumberInfected = (numberInfected) => {
        this.setState({numberInfected});
    }

    render() {
        return (
            <div>
                <SimController dateOffsetCallback={this.setDateOffset} numberInfected={this.state.numberInfected} />
                <SimMap currentDateOffset={this.state.dateOffset} infectedCallback={this.setNumberInfected} infectionCount={this.state.numberInfected} />
            </div>
        )
    }
}

export default Simulator;
