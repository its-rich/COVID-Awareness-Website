import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// Change the map
let windowHeight = window.innerHeight - 70 + 'px';
const mapStyles = {
    width: '100%',
    height: windowHeight,
    position: 'absolute',
};

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

    render() {
        return (
            <div className="MapContainer">
                <Map
                    google={this.props.google}
                    zoom={4}
                    style={mapStyles}
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