import React from 'react';
import '../App.css';
import MapContainer from '../components/MapContainer';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            disease: "",
            dateRange: 202000,
            switch: "infected",
            deaths: 0,
            infected: 0
        };
    }

    updateSlider = (date) => {
        this.setState({dateRange: date});
    }

    updateDisease = (disease) => {
        this.setState({disease: disease});
    }

    updateSwitch = (state) => {
        if (state === true) {
            this.setState({switch: "dead"});
        } else {
            this.setState({switch: "infected"});
        }
    }

    updateStats = (death, infected) => {
        this.setState({deaths: death, infected: infected});
    }

    render(){

        return (
        <div id='mapinteraction'>
            <div id='setmap'>
                <SearchBar infected={this.state.infected} deaths={this.state.deaths} switch={this.state.switch} disease={this.state.disease} dateRange={this.state.dateRange} updateSwitch={this.updateSwitch.bind(this)} updateDisease={this.updateDisease.bind(this)} updateSlider={this.updateSlider.bind(this)}/>
                {/* <FilterBar disease={this.state.disease} dateRange={this.state.dateRange} updateDisease={this.updateDisease.bind(this)} updateStartSlider={this.updateStartSlider.bind(this)}/> */}
                <MapContainer updateStats={this.updateStats.bind(this)} switch={this.state.switch} dateRange={this.state.dateRange} disease={this.state.disease} />
            </div>
        </div>
    )};
}

export default Home;
