import React from 'react';
import '../App.css';
import MapContainer from '../components/MapContainer';
import SearchBar from '../components/SearchBar';


class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            disease: "",
            dateRange: 201900
        };
    }

    updateSlider = (date) => {
        this.setState({dateRange: date});
    }

    updateDisease = (disease) => {
        this.setState({disease: disease});
    }

    render(){

        return (
        <div id='worldroot'>
            <SearchBar disease={this.state.disease} dateRange={this.state.dateRange} updateDisease={this.updateDisease.bind(this)} updateSlider={this.updateSlider.bind(this)}/>
            <MapContainer dateRange={this.state.dateRange} disease={this.state.disease} />
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
