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
            city: -1,
            infectedCallback: props.infectedCallback,
            infectionCount: props.infectionCount,
            message: 0
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
            if (this.state.infectionSim[i].getInfectionCount() !== -1) {
                total += this.state.infectionSim[i].getInfectionCount();
            }
        }

        if (this.props.lockdown && this.props.infectionCount === total) {
            this.setState({message: this.state.message + 1})
        } else if (this.props.lockdown && this.props.infectionCount !== total) {
            this.setState({message: 0})
        }
        this.state.infectedCallback(total);
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.message == 6) {
            alert('No new cases have emerged after 6 days! Lockdown Successful!');
            this.state.message += 1;
        }

        if (this.props.reset) {
            this.state.infectionSim.map((item) => {
                while (item.getCurrentFrame() > 0) {
                    item.previousFrame();
                    item.safetyDelete();
                }
            })
            this.state.infectionSim = [];
            this.state.lat = '';
            this.state.long= '';
            this.state.map= '';
            this.state.city= -1;
            this.state.message = 0;
            this.props.setReset();
        } else if (prevProps.currentDateOffset < this.props.currentDateOffset) {
            // this.state.infectionSim.nextFrame();
            if (this.state.city !== -1) {
                if (Math.random() > 0.9) {
                    this.state.infectionSim.push(new InfectionSimulation());
                    if (this.state.city ===  0) {
                        this.state.infectionSim[this.state.infectionSim.length - 1].newmarker(-33.8688, 151.2093, 0.9, this.state.map);
                    } else if (this.state.city ===  1) {
                        this.state.infectionSim[this.state.infectionSim.length - 1].newmarker(-37.8136, 144.9631, 0.9, this.state.map);
                    } else if (this.state.city ===  2) {
                        this.state.infectionSim[this.state.infectionSim.length - 1].newmarker(-31.9505, 115.8605, 0.9, this.state.map);
                    } else if (this.state.city ===  3) {
                        this.state.infectionSim[this.state.infectionSim.length - 1].newmarker(-27.4698, 153.0251, 0.9, this.state.map);
                    } else if (this.state.city ===  4) {
                        this.state.infectionSim[this.state.infectionSim.length - 1].newmarker(-34.9285, 138.6007, 0.9, this.state.map);
                    } else if (this.state.city ===  5) {
                        this.state.infectionSim[this.state.infectionSim.length - 1].newmarker(-16.9186, 145.7781, 0.9, this.state.map);
                    } else if (this.state.city ===  6) {
                        this.state.infectionSim[this.state.infectionSim.length - 1].newmarker(-12.4634, 130.8456, 0.9, this.state.map);
                    } else if (this.state.city ===  7) {
                        this.state.infectionSim[this.state.infectionSim.length - 1].newmarker(-35.2809, 149.1300, 0.9, this.state.map);
                    }
                    this.state.city = -1;
                    this.props.setLocations(this.state.infectionSim.length);
                }
            }

            this.state.infectionSim.map((item, i) => {
                if (this.props.lockdown) {
                    item.nextFrame('LOCK');
                    this.state.city= -1;
                } else if (this.props.cure) {
                    item.previousFrame();
                    // item.cureFrame();
                    this.state.city= -1;
                    if (item.getCurrentFrame() <= 0) {
                        item.safetyDelete();
                        this.state.infectionSim.splice(i, 1);
                        if (this.state.infectionSim.length > 0) {
                            this.props.setLocations(this.state.infectionSim.length - 1);
                        } else {
                            this.props.setLocations(0);
                        }
                    }
                } else {
                    item.nextFrame();
                }
            })
            this.passNumberInfected();
        } else if (prevProps.currentDateOffset > this.props.currentDateOffset && this.props.currentDateOffset >= 0) {
            // console.log(this.props.currentDateOffset);
            this.state.infectionSim.map((item) => {
                if (item.getCurrentFrame() > 0) {
                    item.previousFrame();
                    this.passNumberInfected();
                }
                if (item.getCurrentFrame() === 0) {
                    item.safetyDelete();
                }
            })
            if (this.props.currentDateOffset == 0) {
                this.state.infectionSim.map((item) => {
                    if (item.getCurrentFrame() !== 0) {
                        item.safetyDelete();
                        this.state.infectedCallback(0);
                    }
                })
                this.setState({infectionSim: []});
                this.props.setLocations(0);
            }
        } else if (prevState.long !== this.state.long) {
            let lat = this.state.lat
            let long = this.state.long
            let chance = 0
            let city = []

            // Sydney
            let SYDdist = distance(lat, long, -33.8688, 151.2093, "K");
            SYDdist = Math.floor(SYDdist);
            city.push(SYDdist);

            // Melbourne
            let MELdist = distance(lat, long, -37.8136, 144.9631, "K");
            MELdist = Math.floor(MELdist);
            city.push(MELdist);

            // Perth
            let PERdist = distance(lat, long, -31.9505, 115.8605, "K");
            PERdist = Math.floor(PERdist);
            city.push(PERdist);

            // Brisbane
            let BRIdist = distance(lat, long, -27.4698, 153.0251, "K");
            BRIdist = Math.floor(BRIdist);
            city.push(BRIdist);

            // Adelaide
            let ADEdist = distance(lat, long, -34.9285, 138.6007, "K");
            ADEdist = Math.floor(ADEdist);
            city.push(ADEdist);

            // Cairns
            let CAIdist = distance(lat, long, -16.9186, 145.7781, "K");
            CAIdist = Math.floor(CAIdist);
            city.push(CAIdist);

            // Darwin
            let DARdist = distance(lat, long, -12.4634, 130.8456, "K");
            DARdist = Math.floor(DARdist);
            city.push(DARdist);

            // Canberra
            let CANdist = distance(lat, long, -35.2809, 149.1300, "K");
            CANdist = Math.floor(CANdist);
            city.push(CANdist);

            let NOwhere = distance(lat, long, -23.844833, 133.162842, "K");
            NOwhere = Math.floor(NOwhere);
            city.push(NOwhere);

            chance = Math.min(SYDdist,MELdist,PERdist,BRIdist,ADEdist,CAIdist,DARdist,CANdist, NOwhere);
            this.state.city = city.indexOf(chance);

            // Change chance according to distance from city
            chance = 1 - chance / 1400;

            if (this.state.city == 8 ) {
                chance = 0.0001;
                this.state.city = -1;
            }

            let map = this.state.map;
            this.state.infectionSim[this.state.infectionSim.length - 1].newmarker(this.state.lat, this.state.long, chance, map);
            this.props.setLocations(this.state.infectionSim.length);
        }
    }

    render() {
        return (
            <div style={{ width: '100%'}}>
            <div style={{height: '91vh'}}>
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
                            // this.setState({map: map});
                            // this.setState({lat: lat});
                            this.state.map = map;
                            this.state.lat = lat;
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
