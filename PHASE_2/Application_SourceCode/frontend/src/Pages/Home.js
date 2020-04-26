import React, { useState } from 'react';
import '../App.css';
import MapContainer from '../components/MapContainer';
import SearchBar from '../components/SearchBar';
import Graph from '../components/Graph'
import PieChart from '../components/PieChart';
import LocationChart from '../components/LocationChart';
import SlidingPane from 'react-sliding-pane';
import Modal from 'react-modal';
import 'react-sliding-pane/dist/react-sliding-pane.css';
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
            isPaneOpen: false
        };
        this.paymentForm = null;
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
    }

    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    render() {
        return (
        <div ref={ref => this.el = ref}>
            <div id='mapinteraction'>
                <div id='setmap'>
                    <button class="reveal_graphs" onClick={() => this.setState({ isPaneOpen: true })}>&#8249;</button>

                    <SearchBar infected={this.state.infected} deaths={this.state.deaths} switch={this.state.switch} disease={this.state.disease} dateRange={this.state.dateRange} updateSwitch={this.updateSwitch.bind(this)} updateDisease={this.updateDisease.bind(this)} updateSlider={this.updateSlider.bind(this)} updateISO={this.updateISO.bind(this)}/>
                    <MapContainer updateStats={this.updateStats.bind(this)} updateLocation={this.updateLocation.bind(this)} switch={this.state.switch} dateRange={this.state.dateRange} disease={this.state.disease} iso={this.state.iso} />
                    <SlidingPane
                    className='some-custom-class'
                    overlayClassName='some-custom-overlay-class'
                    isOpen={ this.state.isPaneOpen }
                    title='Graphs of chosen disease'
                    width='45%'
                    onRequestClose={ () => {
                        // triggered on "<" on left top click or on outside click
                        this.setState({ isPaneOpen: false });
                    } }>
                        {this.state.disease !== '' && <Graph disease={this.state.disease}/>}
                        {this.state.disease !== '' && <PieChart disease={this.state.disease} switch={this.state.switch}/>}
                        {this.state.loc !== '' && <LocationChart disease={this.state.disease} loc={this.state.loc} dateRange={this.state.dateRange} iso={this.state.iso} />}
                    </SlidingPane>
                </div>
            </div>
        </div>
    )};
}

// {this.state.disease !== '' && <PieChart disease={this.state.disease} switch="infected"/>}
// {this.state.location !== '' && <PieChart disease="COVID-19" switch="infected"/>}

let strDate = '2020-01-22';
let movingDate = new Date(strDate);
// let endDate = new Date();
let endDate = new Date('2020-01-31');

while (strDate < endDate.toISOString().slice(0,10)) {
    strDate = movingDate.toISOString().slice(0,10);
    // console.log(String(movingDate).slice(0,15));
    // Object.keys(month1.result).map((item, i) => {
    //     for (var c of month1.result[item]) {
    //         if (c.date == strDate) {
    //             console.log(c.date);
    //             break;
    //         }
    //     }
    //     // month1.result[item].forEach((c, i) => {
    //     //     console.log(c.date);
    //     // });
    // });
    // console.log(strDate);
    movingDate.setDate(movingDate.getDate() + 1);
}

export default Home;
