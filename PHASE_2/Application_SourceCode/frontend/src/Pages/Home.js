import React from 'react';
import '../App.css';
import MapContainer from '../components/MapContainer';
import SearchBar from '../components/SearchBar';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            disease: "",
            dateRange: 201900,
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
                <MapContainer updateStats={this.updateStats.bind(this)} switch={this.state.switch} dateRange={this.state.dateRange} disease={this.state.disease} />
            </div>
        </div>
    )};
}

// const state = {
//     disease: "",
//     dateRange: 201900
// }
//
// const reducer = (s = state, action) => {
//     switch(action.type) {
//         case 'DISEASE':
//             console.log(this.state)
//             return this.state;
//         case 'DATE':
//             return this.state;
//     }
// }
//
// const store = createStore(reducer)
//
// store.subscribe(() => console.log(store.getState()))
//
// store.dispatch({
//     type: 'DISEASE'
// });

export default Home;
