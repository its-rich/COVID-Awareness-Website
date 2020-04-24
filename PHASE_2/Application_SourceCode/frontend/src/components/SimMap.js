import React, { Component } from 'react';
import GoogleMapReact, {  } from 'google-map-react';
import InfectionSimulation from './Simulation/InfectionSimulation.js';
import InfectedArea from './Simulation/InfectedArea.js';
import { parseTwoDigitYear } from 'moment';

class SimMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infectionSim: new InfectionSimulation()
        }
    }

    static defaultProps = {
        center: {
            lat: -25.2744,
            lng: 133.7751,
        },
        zoom: 4.5
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentDateOffset < this.props.currentDateOffset) {
            this.state.infectionSim.nextFrame();
        } else if (prevProps.currentDateOffset > this.props.currentDateOffset && prevProps.currentDateOffset > 0) {
            console.log('a');
            this.state.infectionSim.previousFrame();
        }
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
            <div style={{height: '85vh'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCjSUC-_0E6FBLFZzt0QdznZqy3ItrWeik" }}
                    defaultZoom={5}
                    defaultCenter={{lat: -25.2744, lng: 133.7751}}
                    yesIWantToUseGoogleMapApiInternals
                    // The circles
                    onGoogleApiLoaded={({map, maps}) => {

                        map.addListener('click', (mapsMouseEvent) => {
                            let lat = mapsMouseEvent.latLng.toString().split(',')[0].replace('(', '');
                            lat = parseInt(lat);
                            let long = mapsMouseEvent.latLng.toString().split(',')[1].replace(')', '').replace(' ', '');
                            long = parseInt(long);
                            this.state.infectionSim.newmarker(lat, long, 0.5, map)
                        });
                    }}

                    // This shouldn't have to be here
                    // onClick={this.update}

                />
            </div>
            </div>
        );
    }
}

export default SimMap;
