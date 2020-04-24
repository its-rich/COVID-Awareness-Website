import React, { Component } from 'react';
import GoogleMapReact, {  } from 'google-map-react';
import InfectionSimulation from './Simulation/InfectionSimulation.js';
import InfectedArea from './Simulation/InfectedArea.js';
import { parseTwoDigitYear } from 'moment';

class SimMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infectionSim: new InfectionSimulation(),
            dateOffset: props.dateOffset,
        }
    }

    update = () => {
        this.state.infectionSim.setFrame(this.state.dateOffset);
    }

    Map = () =>(
        <div style={{height: '85vh'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCjSUC-_0E6FBLFZzt0QdznZqy3ItrWeik" }}
                defaultZoom={5}
                defaultCenter={{lat: -25.2744, lng: 133.7751}}

                // The circles
                onGoogleApiLoaded={({map, maps}) => {
                    this.state.infectionSim.init(map);
                    this.state.infectionSim.getCurrentFrame().forEach((item) => item.draw());
                }}

                // This shouldn't have to be here
                onClick={this.update}
                
            />
        </div>
    );

    static defaultProps = {
        center: {
            lat: -25.2744,
            lng: 133.7751,
        },
        zoom: 4.5
    };

    render() {
        return (
            <div style={{ width: '100%' }}>
                <this.Map />
            </div>
        );
    }
}

export default SimMap;