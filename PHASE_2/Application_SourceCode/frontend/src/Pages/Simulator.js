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
            lockdown: false,
            reset: false
        }
    }

    // Function that the SimController uses to change the date offset
    setDateOffset = (offset) => {
        this.setState({dateOffset: offset});
    }

    // Function that the SimMap uses to change number infected
    setNumberInfected = (numberInfected) => {
        this.setState({numberInfected: numberInfected});
    }

    setLockdown = () => {
        if (this.state.lockdown == false) {
            this.setState({lockdown: true});
        } else {
            this.setState({lockdown: false});
        }
    }

    setReset = () => {
        if (this.state.reset === false) {
            this.setState({reset: true});
            this.setState({dateOffset: 0});
            this.setState({numberInfected: 0});
            this.setState({lockdown: false});
        } else {
            this.setState({reset: false});
        }
    }



    render() {
        return (
            <div>
                <SimController dateOffsetCallback={this.setDateOffset} setReset={this.setReset.bind(this)} numberInfected={this.state.numberInfected} setLockdown={this.setLockdown.bind(this)}/>
                <SimMap currentDateOffset={this.state.dateOffset} setReset={this.setReset.bind(this)} reset={this.state.reset} infectedCallback={this.setNumberInfected} infectionCount={this.state.numberInfected} lockdown={this.state.lockdown}/>
            </div>
        )
    }
}

export default Simulator;
