import React, {Component} from 'react';
import SimMap from '../components/SimMap.js';
import SimController from '../components/SimulationController.js';
import '../App.css';

class Simulator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // The amount of days away from "today"
            dateOffset: 0,
            numberInfected: 0,
            lockdown: false,
            reset: false,
            cure: false,
            newCases: 0,
            lcure: false
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
        if (this.state.lockdown === false) {
            this.setState({lockdown: true});
        } else {
            this.setState({lcure: false});
            this.setState({lockdown: false});
        }
    }

    setCure = () => {
        if (this.state.cure === false) {
            this.setState({cure: true});
        } else {
            this.setState({cure: false});
        }
    }

    setReset = () => {
        if (this.state.reset === false) {
            this.setState({reset: true});
            this.setState({dateOffset: 0});
            this.setState({numberInfected: 0});
            this.setState({newCases: 0});
            this.setState({lockdown: false});
            this.setState({cure: false});
        } else {
            this.setState({reset: false});
        }
    }

    setLockdownCure = () => {
        if (this.state.lcure === false) {
            this.setState({lcure: true});
        } else {
            this.setState({lcure: false});
        }
    }

    setNewCases = (v) => {
        this.setState({newCases: v})
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.cure && this.state.numberInfected === 0 && this.state.dateOffset !== 0) {
            // alert("All carriers of Coronavirus in Australia have been cured!")
        }
    }

    render() {
        return (
            <div>
                <SimController dateOffsetCallback={this.setDateOffset} setReset={this.setReset.bind(this)} numberInfected={this.state.numberInfected} setLockdown={this.setLockdown.bind(this)} setCure={this.setCure.bind(this)} lockdown={this.state.lockdown} cure={this.state.cure} newCases={this.state.newCases} lcure={this.state.lcure}/>
                <SimMap currentDateOffset={this.state.dateOffset} setReset={this.setReset.bind(this)} reset={this.state.reset} infectedCallback={this.setNumberInfected} infectionCount={this.state.numberInfected} lockdown={this.state.lockdown} cure={this.state.cure} setNewCases={this.setNewCases.bind(this)} setLockdownCure={this.setLockdownCure.bind(this)}/>
            </div>
        )
    }
}

export default Simulator;
