import React, { Component } from 'react';
import GoogleMapReact, {  } from 'google-map-react';
import InfectionSimulation from './Simulation/InfectionSimulation.js';
import InfectedArea from './Simulation/InfectedArea.js';
import { parseTwoDigitYear } from 'moment';

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}

class SimMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infectionSim: [],
            lat: '',
            long: '',
            map: '',
            infectedCallback: props.infectedCallback,
            infectionCount: props.infectionCount,
        }
    }

    static defaultProps = {
        center: {
            lat: -25.2744,
            lng: 133.7751,
        },
        zoom: 4.5
    };

    passNumberInfected() {
        let total = 0
        for (let i = 0; i < this.state.infectionSim.length; i++) {
            total += this.state.infectionSim[i].getInfectionCount();
        }
        console.log(total);
        this.state.infectedCallback(total);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentDateOffset < this.props.currentDateOffset) {
            // this.state.infectionSim.nextFrame();
            this.state.infectionSim.map((item) => {
                item.nextFrame();
            })
        } else if (prevProps.currentDateOffset > this.props.currentDateOffset && this.props.currentDateOffset >= 0) {
            // console.log(this.props.currentDateOffset);
            this.state.infectionSim.map((item) => {
                if (item.getCurrentFrame() > 0) {
                    item.previousFrame();
                }
                if (item.getCurrentFrame() == 0) {
                    item.safetyDelete();
                }
            })
            if (this.props.currentDateOffset == 0) {
                this.state.infectionSim.map((item) => {
                    if (item.getCurrentFrame() !== 0) {
                        item.safetyDelete();
                    }
                })
                this.setState({infectionSim: []});
            }
        } else if (prevState.long !== this.state.long) {
            let lat = this.state.lat
            let long = this.state.long
            let chance = 0

            // Sydney
            let SYDdist = distance(lat, long, -33.8688, long = 151.2093, "K");
            SYDdist = Math.floor(SYDdist);

            // Melbourne
            let MELdist = distance(lat, long, -37.8136, long = 144.9631, "K");
            MELdist = Math.floor(MELdist);

            // Perth
            let PERdist = distance(lat, long, -31.9505, long = 115.8605, "K");
            PERdist = Math.floor(PERdist);

            // Brisbane
            let BRIdist = distance(lat, long, -27.4698, long = 153.0251, "K");
            BRIdist = Math.floor(BRIdist);

            // Adelaide
            let ADEdist = distance(lat, long, -34.9285, long = 138.6007, "K");
            ADEdist = Math.floor(ADEdist);

            // Cairns
            let CAIdist = distance(lat, long, -16.9186, long = 145.7781, "K");
            CAIdist = Math.floor(CAIdist);

            // Darwin
            let DARdist = distance(lat, long, -12.4634, long = 130.8456, "K");
            DARdist = Math.floor(DARdist);

            // Canberra
            let CANdist = distance(lat, long, -35.2809, long = 149.1300, "K");
            CANdist = Math.floor(CANdist);

            chance = Math.min(SYDdist,MELdist,PERdist,BRIdist,ADEdist,CAIdist,DARdist,CANdist);
            // Change chance according to distance from city
            chance = 1 - chance / 1400;
            console.log(chance);

            let map = this.state.map;
            this.state.infectionSim[this.state.infectionSim.length - 1].newmarker(this.state.lat, this.state.long, chance, map);
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
                            lat = Number(lat);
                            let long = mapsMouseEvent.latLng.toString().split(',')[1].replace(')', '').replace(' ', '');
                            long = Number(long);
                            this.setState({map: map});
                            this.setState({lat: lat});
                            this.state.infectionSim.push(new InfectionSimulation());
                            this.setState({long: long});
                            this.passNumberInfected();
                        });
                    }}
                />
            </div>
            </div>
        );
    }
}


export default SimMap;
