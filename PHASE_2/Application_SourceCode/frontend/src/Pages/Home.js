import React from 'react';
import '../App.css';
import MapContainer from '../components/MapContainer';
import SearchBar from '../components/SearchBar';
import Graph from '../components/Graph'
import PieChart from '../components/PieChart';
import LocationChart from '../components/LocationChart';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            disease: "",
            dateRange: 201900,
            switch: "infected",
            deaths: 0,
            infected: 0,
            loc: ""
        };
    }

    updateSlider = (date) => {
        this.setState({dateRange: date});
        this.setState({loc: ''});
    }

    updateDisease = (disease) => {
        this.setState({disease: disease});
        this.setState({loc: ''});
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

    updateLocation = (location) => {
        this.setState({loc: location});
    }

    render() {
        return (
        <div id='mapinteraction'>
            <div id='setmap'>
                <SearchBar infected={this.state.infected} deaths={this.state.deaths} switch={this.state.switch} disease={this.state.disease} dateRange={this.state.dateRange} updateSwitch={this.updateSwitch.bind(this)} updateDisease={this.updateDisease.bind(this)} updateSlider={this.updateSlider.bind(this)}/>
                <MapContainer updateStats={this.updateStats.bind(this)} updateLocation={this.updateLocation.bind(this)} switch={this.state.switch} dateRange={this.state.dateRange} disease={this.state.disease} />
                {this.state.disease !== '' && <Graph disease={this.state.disease}/>}
                {this.state.disease !== '' && <PieChart disease={this.state.disease} switch="dead"/>}
                {this.state.loc !== '' && <LocationChart disease={this.state.disease} loc={this.state.loc} dateRange={this.state.dateRange}/>}
            </div>
        </div>
    )};
}

// {this.state.disease !== '' && <PieChart disease={this.state.disease} switch="infected"/>}
// {this.state.location !== '' && <PieChart disease="COVID-19" switch="infected"/>}

// let strDate = '2020-01-22';
// let movingDate = new Date(strDate);
// let endDate = new Date();
//
// while (strDate < endDate.toISOString().slice(0,10)) {
//     strDate = movingDate.toISOString().slice(0,10);
//     console.log(strDate);
//     movingDate.setDate(movingDate.getDate() + 1);
// }

export default Home;
