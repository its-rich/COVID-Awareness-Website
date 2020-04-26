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

export default Home;
