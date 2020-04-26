import React from 'react';
import * as Scroll from 'react-scroll';
import '../App.css';
import MapContainer from '../components/MapContainer';
import SearchBar from '../components/SearchBar';
import Graph from '../components/Graph'
import PieChart from '../components/PieChart';
import LocationChart from '../components/LocationChart';
import month1 from '../Data/2020-01-01_2020-02-01.json';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            disease: "",
            dateRange: 201900,
            switch: "infected",
            deaths: 0,
            infected: 0,
            loc: "",
            iso: '',
            flag: false
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

    updateISO = (iso) => {
        this.setState({iso: iso})
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
        // Scroll Down to the graphs
        Scroll.animateScroll.scrollToBottom();
    }

    updateFlag = () => {
        if (this.state.flag === false) {
            this.setState({flag: true});
        } else {
            this.setState({flag: false});
        }
    }

    render() {
        return (
        <div id='mapinteraction'>
            <div id='setmap'>
                <SearchBar infected={this.state.infected} deaths={this.state.deaths} switch={this.state.switch} disease={this.state.disease} dateRange={this.state.dateRange} updateSwitch={this.updateSwitch.bind(this)} updateDisease={this.updateDisease.bind(this)} updateSlider={this.updateSlider.bind(this)} updateISO={this.updateISO.bind(this)} updateFlag={this.updateFlag.bind(this)}/>
                <MapContainer updateStats={this.updateStats.bind(this)} updateLocation={this.updateLocation.bind(this)} switch={this.state.switch} dateRange={this.state.dateRange} disease={this.state.disease} iso={this.state.iso} flag={this.state.flag} updateFlag={this.updateFlag.bind(this)} />
                <div className="FlexRow">
                    {this.state.disease !== '' && <Graph disease={this.state.disease} />}
                    {this.state.disease !== '' && <PieChart disease={this.state.disease} switch={this.state.switch}/>}
                    {this.state.loc !== '' && <LocationChart disease={this.state.disease} loc={this.state.loc} dateRange={this.state.dateRange} iso={this.state.iso} />}
                </div>
            </div>
        </div>
    )};
}

export default Home;
