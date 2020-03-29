import React from 'react';
import { Map, GoogleApiWrapper, Marker, geocode } from 'google-maps-react';

// Change the map
let windowHeight = window.innerHeight - 70 + 'px';
const mapStyles = {
    width: '100%',
    height: windowHeight,
    position: 'absolute',
};

const mapOptions = [
    {
        stylers: [
            { hue: "#000000" },
            { saturation: 0 }
        ]
    },
    {
        featureType: "landscape",
        stylers: [
            { hue: "#000000" },
            { saturation: 100 }
        ]
    },{
        featureType: "road",
        stylers: [
            { visibility: "off" }
        ]
    },{
        featureType: "administrative.land_parcel",
        stylers: [
            { visibility: "off" }
        ]
    },{
        featureType: "administrative.locality",
        stylers: [
            { visibility: "off" }
        ]
    },{
        featureType: "administrative.neighborhood",
        stylers: [
            { visibility: "off" }
        ]
    },{
        featureType: "administrative.province",
        stylers: [
            { visibility: "off" }
        ]
    },{
        featureType: "landscape.man_made",
        stylers: [
            { visibility: "off" }
        ]
    },{
        featureType: "landscape.natural",
        stylers: [
            { visibility: "off" }
        ]
    },{
        featureType: "poi",
        stylers: [
            { visibility: "off" }
        ]
    },{
        featureType: "transit",
        stylers: [
            { visibility: "off" }
        ]
    }
];

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [{lat: 30.5928, lng: 114.3055}],
        }
    }

    setMarkers(markers) {
        this.state.markers = markers;
    }

    coordsToCountry = (e) => {
        let lat = e.lat;
        let lng = e.lng;
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=8d8c26c6b4bc4916a36e0e7646021d0e`)
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            }
        })
        .then((data) => {
            console.log(data.results[0].components.country);
        })
    }

    render() {
        return (
            <div className="MapContainer">
                <Map
                    google={this.props.google}
                    zoom={4}
                    style={mapStyles}
                    styles={mapOptions}
                    fullscreenControl={false}
                    disableDefaultUI={true}
                    initialCenter={{lat: 30.5928, lng: 114.3055}}
                >
                    {this.state.markers.map((marker, i) => {
                        return(
                            <Marker
                            lat={marker.lat}
                            lng={marker.lng}
                            icon="https://img.icons8.com/metro/26/000000/document.png"
                            onClick={this.coordsToCountry}
                            />
                        )
                    })}
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCjSUC-_0E6FBLFZzt0QdznZqy3ItrWeik'
})(MapContainer);